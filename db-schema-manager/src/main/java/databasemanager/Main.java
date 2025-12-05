package databasemanager;

import com.zaxxer.hikari.HikariDataSource;

public class Main {
  public static void main(String[] args) {
    String jdbcUrl = "jdbc:postgresql://localhost:4321";
    String user = "user";
    String password = "secret123";

    try (HikariDataSource ds = HikariConfigFactory.create(jdbcUrl, user, password)) {
      SchemaManager.migrateDatabase(ds);
    } catch (Exception e) {
      System.err.println("Migration failed: " + e.getMessage());
      e.printStackTrace();
      System.exit(1);
    }
  }
}
