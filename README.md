# Zaulimi24 E-commerce Platform

An e-commerce platform for fresh farm produce connecting local sellers with consumers.

## Project Overview

This is the implementation of the Zaulimi24 e-commerce platform as specified in the Software Requirements Specification (SRS) and System Design Document (SDD).

Zaulimi24 aims to create a marketplace where local farmers and producers can sell their fresh produce directly to consumers, eliminating intermediaries and ensuring fair prices for both parties.

## Technology Stack

- Frontend: Next.js with TypeScript
- Backend: Node.js with Express.js
- Database: PostgreSQL with Redis for caching
- Authentication: JWT
- Payment Processing: Stripe
- Infrastructure: Docker, Docker Compose

## Project Structure

```
zaulimi24/
├── client/          # Next.js frontend
├── server/          # Node.js backend
├── docs/            # Documentation
├── scripts/         # Utility scripts
├── .github/         # GitHub configurations
├── docker-compose.yml # Development environment setup
├── .env.example     # Environment variables template
├── .gitignore       # Git ignored files
└── README.md        # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd zaulimi24
   ```

2. Run the initialization script:
   ```bash
   chmod +x scripts/init-project.sh
   ./scripts/init-project.sh
   ```

3. Copy and configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development environment:
   ```bash
   docker-compose up
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database Admin: http://localhost:8080

## Documentation

- [Software Requirements Specification](docs/SRS_Zaulimi24_Farm_Produce_Ecommerce_Platform.md)
- [System Design Document](docs/System_Design_Document.md)
- [Technical Architecture](docs/Technical_Architecture.md)
- [Database Schema](docs/Database_Schema.md)
- [API Specification](docs/API_Specification.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/your-org/zaulimi24](https://github.com/your-org/zaulimi24)