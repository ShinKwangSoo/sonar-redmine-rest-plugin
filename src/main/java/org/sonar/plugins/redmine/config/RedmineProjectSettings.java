package org.sonar.plugins.redmine.config;

import org.sonar.api.config.PropertyDefinition;

import java.util.List;

import static java.util.Arrays.asList;
import static org.sonar.api.resources.Qualifiers.PROJECT;

public class RedmineProjectSettings {
    public static final String PROJECT_KEY = "sonar.redmine.project-key";
    public static final String TRACKER_ID = "sonar.redmine.tracker-id";
    public static final String USER_ID = "sonar.redmine.user-id";

    public RedmineProjectSettings() {

    }

    public static List<PropertyDefinition> getProperties() {
        return asList(
                (PropertyDefinition.builder(PROJECT_KEY)
                        .name("Project_KEY")
                        .defaultValue("")
                        .category(RedmineSettings.CATEGORY)
                        .onQualifiers(PROJECT)
                        .build()),
                (PropertyDefinition.builder(TRACKER_ID)
                        .name("Tracker ID")
                        .defaultValue("")
                        .category(RedmineSettings.CATEGORY)
                        .onQualifiers(PROJECT)
                        .build()),
                (PropertyDefinition.builder(USER_ID)
                        .name("UserID")
                        .defaultValue("")
                        .category(RedmineSettings.CATEGORY)
                        .onQualifiers(PROJECT)
                        .build()));
    }
}
