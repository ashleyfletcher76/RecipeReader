DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yaml

# default
up:
	$(DOCKER_COMPOSE) up -d

# normal build
build-up:
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d

# build the service without using cache
new:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d

# rebuild the service but not remove all
re: down up

re-new: fclean new

re-soft:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d

# full clean of all the volumes etc
fclean:
	@read -p "Are you sure you want to clean everything? (y/n): " confirm && if [ "$$confirm" = "y" ]; then \
		$(DOCKER_COMPOSE) down -v --rmi all; \
		docker system prune -f --volumes; \
	else \
		echo "Aborted fclean."; \
	fi

logs:
	$(DOCKER_COMPOSE) logs -f

logs-%:
	$(DOCKER_COMPOSE) logs -f $*

# stop the running services but leave volumes intact
down:
	$(DOCKER_COMPOSE) down

# remove only the volumes
clean-volumes:
	@docker volume prune -f

# remove dangling images
clean-images:
	@docker image prune -f

# remove dangling images, volumes, containers, networks
clean-all:
	@docker system prune --volumes -f

rebuild-%:
	$(DOCKER_COMPOSE) build --no-cache $*
	$(DOCKER_COMPOSE) up -d $*

.PHONY: up re fclean logs down clean-volumes clean-images clean-all rebuild