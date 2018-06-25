package org.sonar.plugins.redmine.ui;

import org.sonar.api.web.page.Context;
import org.sonar.api.web.page.Page;
import org.sonar.api.web.page.PageDefinition;

public class SonarToRedmine implements PageDefinition {

    @Override
    public void define(Context context) {
        context.addPage(Page.builder("redmine/Sonar-Issue-List")
                .setName("Sonar Issue List")
                .setScope(Page.Scope.COMPONENT).build());
    }
}
