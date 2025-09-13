# Makefile for Zaulimi24 development

# Variables
PROJECT_NAME = zaulimi24
COMPOSE_FILE = docker-compose.yml

# Default target
.PHONY: help
help: ## Show this help
	@echo "$(PROJECT_NAME) Makefile commands:"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: init
init: ## Initialize the project
	./scripts/init-project.sh

.PHONY: install
install: ## Install all dependencies
	cd client && npm install
	cd server && npm install

.PHONY: dev
dev: ## Start development environment
	docker-compose up

.PHONY: dev-detached
dev-detached: ## Start development environment in detached mode
	docker-compose up -d

.PHONY: stop
stop: ## Stop development environment
	docker-compose down

.PHONY: logs
logs: ## View logs from all services
	docker-compose logs -f

.PHONY: test
test: ## Run all tests
	docker-compose exec backend npm test
	docker-compose exec frontend npm test

.PHONY: lint
lint: ## Run linters
	docker-compose exec backend npm run lint
	docker-compose exec frontend npm run lint

.PHONY: build
build: ## Build the application
	docker-compose build

.PHONY: clean
clean: ## Clean up build artifacts
	docker-compose down -v
	rm -rf client/node_modules
	rm -rf server/node_modules
	rm -rf client/.next
	rm -rf server/dist

.PHONY: db-migrate
db-migrate: ## Run database migrations
	docker-compose exec db psql -U postgres -d $(PROJECT_NAME) -f /docker-entrypoint-initdb.d/init.sql

.PHONY: shell-backend
shell-backend: ## Open shell in backend container
	docker-compose exec backend sh

.PHONY: shell-frontend
shell-frontend: ## Open shell in frontend container
	docker-compose exec frontend sh

.PHONY: shell-db
shell-db: ## Open shell in database container
	docker-compose exec db psql -U postgres -d $(PROJECT_NAME)