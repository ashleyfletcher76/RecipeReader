package databasemanager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class HikariConfigFactory {
  public static HikariDataSource create(String jdbcUrl, String user, String password) {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl(jdbcUrl);
    config.setUsername(user);
    config.setPassword(password);
    config.setDriverClassName("org.postgresql.Driver");
    config.setMaximumPoolSize(2);
    config.setAutoCommit(true);
    return new HikariDataSource(config);
  }
}
