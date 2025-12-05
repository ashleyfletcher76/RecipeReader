plugins {
    id("java")
}

group = "com"
version = "unspecified"

val hikariCp = "5.1.0"
val flywayVersion = "10.14.0"
val flywayDatabasePostgresql = "10.14.0"

dependencies {
    implementation("com.zaxxer:HikariCP:$hikariCp")
    implementation("org.flywaydb:flyway-core:${flywayVersion}")
    implementation("org.flywaydb:flyway-database-postgresql:${flywayDatabasePostgresql}")


    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
}