package databasemanager;

import javax.sql.DataSource;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.output.MigrateResult;
import org.flywaydb.core.api.output.ValidateResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SchemaManager {

  private static final Logger logger = LoggerFactory.getLogger(SchemaManager.class);
  private static final String SCHEMA = "recipe_db";
  private static final String MIGRATION_LOCATION = "classpath/migrations";

  public static void migrateDatabase(DataSource dataSource) {
    logger.info("Starting migration for schema: {}", SCHEMA);

    Flyway flyway =
        Flyway.configure()
            .dataSource(dataSource)
            .defaultSchema(SCHEMA)
            .locations(MIGRATION_LOCATION)
            .group(true)
            .outOfOrder(false)
            .sqlMigrationPrefix("V_")
            .loggers("slf4j")
            .load();

    try {
      ValidateResult result = flyway.validateWithResult();
      if (!result.validationSuccessful) {
        logger.warn("Migration validation failed:");
        result.invalidMigrations.forEach(
            migrateDatabase -> {
              logger.warn(" - version: {}", migrateDatabase.version);
              logger.warn(" - path: {}", migrateDatabase.filepath);
              logger.warn(" - description: {}", migrateDatabase.description);
              logger.warn(" - error message: {}", migrateDatabase.errorDetails.errorMessage);
            });
      }
    } catch (Exception e) {
      logger.warn(
          "Migration validation threw an exception (ignored in test context): {}", e.getMessage());
    }

    MigrateResult migration = flyway.migrate();
    logger.info("Migration completed. {} migrations applied.", migration.migrationsExecuted);
  }
}
