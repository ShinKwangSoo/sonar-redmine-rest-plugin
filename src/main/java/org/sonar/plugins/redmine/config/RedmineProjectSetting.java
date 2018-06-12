package org.sonar.plugins.redmine.config;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.PageDefinition;

public class RedmineProjectSetting implements PageDefinition {

    public static final String PROJECT_KEY = "sonar.redmine.project-key";
    public static final String PRIORITY_ID = "sonar.redmine.priority-id";
    public static final String TRACKER_ID = "sonar.redmine.tracker-id";
    public static final String PROJECT_CATEGORY = "sonar.redmine.project.setting";

    @Override
    public void define(Context context) {
        context
                .addPage(Page.builder("plugin/redmine_project_issue")
                        .setName("Redmine Project Issue")
                        .setScope(Page.Scope.COMPONENT).build());
    }
}
