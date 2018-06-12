package org.sonar.plugins.redmine;

import org.sonar.api.PropertyType;
import org.sonar.api.config.PropertyDefinition;

import java.util.List;

import static java.util.Arrays.asList;

public class RedmineConnectProperties {

    public static final String API_KEY = "sonar.redmine.api-access-key";
    public static final String REDMINE_URL = "sonar.redmine.api-access-key";
    public static final String CATEGORY = "sonar-redmine-plugin";


    private RedmineConnectProperties(){

    }
    public static List<PropertyDefinition> getProperties() {
        return asList(
                (PropertyDefinition.builder(API_KEY)
                        .name("API_ACCESS_KEY")
                        .description("You can find your API key on your account page ( /my/account ) when logged in, on the right-hand pane of the default layout.")
                        .category(CATEGORY)
                        .defaultValue("")
                        .type(PropertyType.PASSWORD)
                        .build()),
                (PropertyDefinition.builder(REDMINE_URL)
                        .name("Redmine URL")
                        .description("Example: http://demo.redmine.org/")
                        .category(CATEGORY)
                        .defaultValue("")
                        .build())
        );
    }

}
