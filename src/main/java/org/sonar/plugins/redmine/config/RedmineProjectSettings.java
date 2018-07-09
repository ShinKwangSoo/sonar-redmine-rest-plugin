package org.sonar.plugins.redmine.config;

import org.sonar.api.config.Configuration;
import org.sonar.api.config.PropertyDefinition;

import java.util.List;

import static java.util.Arrays.asList;

public class RedmineProjectSettings {
    public static final String PROJECT_KEY = "sonar.redmine.project-key";
    public static final String TRACKER_ID = "sonar.redmine.tracker-id";
    public static final String USER_ID = "sonar.redmine.user-id";
    private final Configuration settings;

    public RedmineProjectSettings(Configuration settings) {
        this.settings = settings;
    }

    public static List<PropertyDefinition> getProperties() {
        return asList(
                (PropertyDefinition.builder(PROJECT_KEY)
                        .defaultValue("")
                        .hidden()
                        .build()),
                (PropertyDefinition.builder(TRACKER_ID)
                        .defaultValue("")
                        .hidden()
                        .build()),
                (PropertyDefinition.builder(USER_ID)
                        .defaultValue("")
                        .hidden()
                        .build()));
    }
}
