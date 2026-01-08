# BotForge: A No-Code AI Chatbot Builder

BotForge is an innovative no-code platform designed to empower users to create powerful, RAG-powered AI chatbots trained on their own documents in under five minutes. This project simplifies the process of deploying intelligent conversational agents, allowing for extensive customization and seamless integration into any website with a single line of code.

## Features

BotForge offers a comprehensive suite of features tailored for efficient chatbot development and deployment:

*   **No-Code Chatbot Creation**: Intuitive interface for building chatbots without writing any code.
*   **Retrieval-Augmented Generation (RAG)**: Leverages RAG to provide accurate, context-aware responses by drawing information directly from provided documents.
*   **Document Training**: Ability to train chatbots on various document types, including PDFs and text files, ensuring specialized knowledge.
*   **Customizable Appearance and Personality**: Full control over the chatbot's visual design, tone, and conversational style to match brand identity.
*   **One-Click Embedding**: Easy integration into any website using a simple embed code.
*   **Modern Web Technologies**: Built with a robust and performant stack for a smooth user experience.

## Technologies Used

The project is built using a modern web development stack, ensuring scalability, performance, and a rich user experience:

*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript (primary), JavaScript
*   **Styling**: Tailwind CSS
*   **Database**: Prisma ORM (PostgreSQL)
*   **Authentication**: NextAuth.js
*   **Vector Database**: Pinecone
*   **AI/RAG**: Langchain (core, OpenAI, Pinecone integrations)
*   **File Uploads**: Uploadthing
*   **PDF Processing**: `pdf-parse`, `pdf2json`
*   **UI Components**: Radix UI
*   **Animations**: Framer Motion

## Project Structure

The `consumer_chat` repository is organized into several key directories, each serving a specific purpose:

```
consumer_chat/
├── app/                  # Next.js App Router pages and layouts (API routes, chat, bot creation, dashboard, embedding)
├── components/           # Reusable React components
├── db/                   # Database utilities
├── hooks/                # Custom React hooks
├── lib/                  # Core utility functions and helpers (AI models, Pinecone integration, document processing)
├── prisma/               # Prisma schema and database migrations
├── public/               # Static assets (images, icons, etc.)
├── .gitignore            # Specifies intentionally untracked files to ignore
├── components.json       # Configuration for UI components (likely shadcn/ui)
├── middleware.ts         # Next.js middleware for custom protection and authentication
├── next.config.ts        # Next.js configuration file
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration for Tailwind CSS
├── prisma.ts             # Prisma client initialization
├── tsconfig.json         # TypeScript configuration
└── README.md             # This README file
```

## Setup Instructions

To set up and run BotForge locally, follow these steps:

### Prerequisites

*   Node.js (v18 or higher)
*   npm or Yarn
*   PostgreSQL database
*   Pinecone API key and environment
*   OpenAI API key
*   AWS S3 bucket for file storage (implied by `uploadthing` and `aws-sdk/client-s3`)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Rayyan-Alam71/consumer_chat.git
    cd consumer_chat
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory of the project and add the following:

    ```env
    DATABASE_URL="YOUR_POSTGRESQL_DATABASE_URL"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    NEXTAUTH_URL="http://localhost:3000"
    PINECONE_API_KEY="YOUR_PINECONE_API_KEY"
    PINECONE_ENVIRONMENT="YOUR_PINECONE_ENVIRONMENT"
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
    UPLOADTHING_SECRET="YOUR_UPLOADTHING_SECRET"
    UPLOADTHING_APP_ID="YOUR_UPLOADTHING_APP_ID"
    AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
    AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
    AWS_REGION="YOUR_AWS_REGION"
    ```

    *Replace the placeholder values with your actual credentials.*

4.  **Initialize Prisma and migrate the database:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Live Demo

A live demo of BotForge can be accessed at [https://bot-forge1.vercel.app](https://bot-forge1.vercel.app).

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request for any improvements or bug fixes.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
