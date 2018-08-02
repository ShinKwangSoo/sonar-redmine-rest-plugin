package org.sonar.plugins.redmine.config;

import org.sonar.api.CoreProperties;
import org.sonar.api.batch.InstantiationStrategy;
import org.sonar.api.batch.ScannerSide;
import org.sonar.api.config.Configuration;
import org.sonar.api.rule.Severity;
import org.sonar.api.rules.RuleType;
import org.sonar.api.utils.System2;

import javax.annotation.CheckForNull;

@InstantiationStrategy(InstantiationStrategy.PER_BATCH)
@ScannerSide
public class RedmineSettingsConfiguration {
    private final Configuration configuration;
    private final System2 system2;
    private final String baseUrl;

    public RedmineSettingsConfiguration(Configuration configuration, System2 system2, String baseUrl) {
        super();
        this.configuration = configuration;
        this.system2 = system2;

        String tempBaseUrl = configuration.hasKey(CoreProperties.SERVER_BASE_URL) ? configuration.get(CoreProperties.SERVER_BASE_URL).orElse(null) : configuration.get("sonar.host.url").orElse(null);
        if (tempBaseUrl == null) {
            tempBaseUrl = "http://localhost:9000";
        }
        if (!tempBaseUrl.endsWith("/")) {
            tempBaseUrl += "/";
        }
        this.baseUrl = tempBaseUrl;
    }

    @CheckForNull
    public String APIKey() {
        return configuration.get(RedmineSettings.API_KEY).orElse(null);
    }

    @CheckForNull
    public String RedmineURL() {
        return configuration.get(RedmineSettings.REDMINE_URL).orElse(null);
    }

    public boolean Auto_regist() {
        return configuration.getBoolean(RedmineSettings.AUTO_REGIST).orElse(false);
    }

    public String Auto_Type() {
        return configuration.get(RedmineSettings.AUTO_TYPE).orElse(String.valueOf(RuleType.BUG));
    }

    public String Auto_Severity() {
        return configuration.get(RedmineSettings.AUTO_SEVERITY).orElse(Severity.BLOCKER);
    }

    @CheckForNull
    public String ProjectKey() {
        return configuration.get(RedmineSettings.PROJECT_KEY).orElse(null);
    }

    @CheckForNull
    public String TrackerId() {
        return configuration.get(RedmineSettings.TRACKER_ID).orElse(null);
    }

    @CheckForNull
    public String UserId() {
        return configuration.get(RedmineSettings.USER_ID).orElse(null);
    }

    public String baseUrl() {
        return baseUrl;
    }
}
