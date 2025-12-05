#!/bin/bash

set +x

if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] \
   || [ -z "$POSTGRES_DB" ] || [ -z "$POSTGRES_USER_TEST" ] \
   || [ -z "$POSTGRES_TEST_DB" ]; then
  echo "ERROR: One or more environment variables are not set."
  echo "Please set POSTGRES_USER, POSTGRES_PASSWORD, MY_DB, MY_TEST_USER, MY_TEST_PASSWORD, and MY_TEST_DB."
  exit 1
fi

set -x

if [ ! -f "/var/lib/postgresql/data/.db_ready" ]; then
  echo "Initializing PostgreSQL databases..."

  docker-entrypoint.sh postgres &

  until pg_isready -h localhost -U $POSTGRES_USER -d postgres; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 2
  done

  # Connect to the default 'postgres' database to create roles and other databases
  psql -U $POSTGRES_USER -d postgres -c "CREATE DATABASE $POSTGRES_DB;"
  psql -U $POSTGRES_USER -d postgres -c "CREATE ROLE $POSTGRES_USER_TEST WITH LOGIN PASSWORD '$POSTGRES_PASSWORD';"
  psql -U $POSTGRES_USER -d postgres -c "CREATE DATABASE $POSTGRES_TEST_DB OWNER $POSTGRES_USER_TEST;"

  touch /var/lib/postgresql/data/.db_ready
  chown postgres:postgres /var/lib/postgresql/data/.db_ready
  chmod 644 /var/lib/postgresql/data/.db_ready

  echo "PostgreSQL init successful."

  su postgres -c "pg_ctl -D /var/lib/postgresql/data stop"
else
  echo "Database already initialized."
fi

exec docker-entrypoint.sh postgres