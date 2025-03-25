import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { ApiError, UserDTO } from '@/types';

interface AuthState {
  user: UserDTO | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);

      const userResponse = await api.get('/users/current');

      return {
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
        user: userResponse.data,
      };
    } catch (error: unknown) {
      return rejectWithValue(
        (error as ApiError).response?.data?.message || 'Authentication failed'
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const currentRefreshToken = state.auth.refreshToken;

    if (!currentRefreshToken) {
      return rejectWithValue('No refresh token available');
    }

    try {
      const response = await api.post('/auth/refresh', { refreshToken: currentRefreshToken });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);

      return {
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
      };
    } catch (error: unknown) {
      // If refresh fails, logout the user
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      return rejectWithValue((error as ApiError).response?.data?.message || 'Token refresh failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };

    if (!state.auth.token) {
      return rejectWithValue('No authentication token');
    }

    try {
      const response = await api.get('/users/current');
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as ApiError).response?.data?.message || 'Failed to fetch user profile'
      );
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  const state = getState() as { auth: AuthState };
  const refreshToken = state.auth.refreshToken;
  const userId = state.auth.user?.id;

  if (refreshToken) {
    try {
      await api.post(`/auth/logout`, { userId, refreshToken });
    } catch (error) {
      console.error('Server logout failed', error);
    }
  }

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = 'Authentication expired. Please login again.';
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'No authentication token') {
          state.user = null;
          state.token = null;
          state.refreshToken = null;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
