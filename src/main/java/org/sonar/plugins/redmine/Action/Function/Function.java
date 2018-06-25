package org.sonar.plugins.redmine.Action.Function;

import org.sonar.api.config.Configuration;
import org.sonar.api.issue.Issue;

import javax.annotation.Nullable;

public interface Function {
    void execute(Context context);

    interface Context {
        Issue issue();

        Configuration projectSettings();

        Context setAttribute(String key, @Nullable String value);

        Context addComment(@Nullable String text);
    }
}
