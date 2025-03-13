export const markdownContent = `
## Application flow

1. User creates contacts with specific tags
2. User creates campaigns with:
    - A trigger tag
    - An email template
3. EmailService continuously:
    - Monitors contacts for matching tags
    - When a contact's tags match a campaign's trigger tag
    - Renders the email template with contact data
    - Sends the email to the contact
`;

export const flowDiagram = `
graph TB
    subgraph "API Layer"
        API[API Gateway]
        Auth[Auth Service]
    end

    subgraph "Core Services"
        Contact[Contact Service]
        Campaign[Campaign Service]
        Template[Template Service]
        Email[Email Service]
        Analytics[Analytics Service]
    end

    subgraph "Event Bus"
        Kafka[Apache Kafka]
    end

    API --> Auth
    Campaign -->|OpenFeign| Contact
    Campaign -->|OpenFeign| Template
    Email -->|OpenFeign| Template
    Email -->|OpenFeign| Contact
    
    Contact --> Kafka
    Campaign --> Kafka
    Email --> Kafka
    Analytics --> Kafka

    Kafka -->|ContactEvents| Campaign
    Kafka -->|CampaignEvents| Email
    Kafka -->|EmailEvents| Analytics

    classDef service fill:#1f2937,stroke:#374151,stroke-width:2px
    classDef kafka fill:#1e3a8a,stroke:#374151,stroke-width:2px
    class Auth,Contact,Campaign,Template,Email,Analytics service
    class Kafka kafka
`;

export const classDiagram = `
classDiagram
    class User {
        -Long id
        -String email
        -String password
        +createContact()
        +createCampaign()
    }

    class Contact {
        -Long id
        -String email
        -String firstName
        -String lastName
        -Set~String~ tags
        +addTag(tag)
        +removeTag(tag)
    }

    class Campaign {
        -Long id
        -String name
        -String triggerTag
        -EmailTemplate template
        -Boolean isActive
        +activate()
        +deactivate()
    }

    class EmailTemplate {
        -Long id
        -String name
        -String subject
        -String content
        -Map~String,String~ variables
        +render(Contact)
    }

    class EmailService {
        +sendEmail(Contact, EmailTemplate)
        +processTaggedContacts()
        +handleEmailEvents()
    }

    User "1" --> "*" Contact : manages
    User "1" --> "*" Campaign : creates
    Campaign "1" --> "1" EmailTemplate : uses
    Campaign "*" --> "1" EmailService : triggers
    Contact "*" --> "*" Campaign : matched by tags
`;