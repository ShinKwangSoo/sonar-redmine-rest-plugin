package org.sonar.Action.Function;

import org.sonar.api.config.Settings;
import org.sonar.api.issue.Issue;

import javax.annotation.Nullable;

public interface Function {
    void execute(Context context);

    interface Context {
        Issue issue();

        Settings projectSettings();

        Context setAttribute(String key, @Nullable String value);

        Context addComment(@Nullable String text);
    }
}
