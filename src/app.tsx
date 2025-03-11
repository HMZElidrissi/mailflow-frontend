import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeProvider } from '@/components/theme/theme-provider';
import MainLayout from '@/layouts/main-layout';
import HomePage from '@/pages/home-page';
import LoginPage from '@/pages/auth/login-page';
import PostsPage from '@/pages/posts/posts-page';
import CreatePostPage from '@/pages/posts/create-post-page';

function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Router>
        <Routes>
          <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={token ? <PostsPage /> : <Navigate to="/login" />} />
            <Route
              path="/posts/create"
              element={token ? <CreatePostPage /> : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;