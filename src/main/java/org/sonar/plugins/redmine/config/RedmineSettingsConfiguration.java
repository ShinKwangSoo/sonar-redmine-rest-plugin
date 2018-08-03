package org.sonar.plugins.redmine.config;

import org.sonar.api.CoreProperties;
import org.sonar.api.batch.InstantiationStrategy;
import org.sonar.api.batch.ScannerSide;
import org.sonar.api.config.Configuration;
import org.sonar.api.utils.System2;
import org.sonar.plugins.redmine.model.SeverityStatus;

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

    public boolean Bug() {
        return configuration.getBoolean(RedmineSettings.BUG).orElse(true);
    }

    public boolean Code_Smell() {
        return configuration.getBoolean(RedmineSettings.CODE_SMELL).orElse(false);
    }

    public boolean VULNERABILITY() {
        return configuration.getBoolean(RedmineSettings.VULNERABILITY).orElse(false);
    }

    public String AUTO_SEVERITY(){
        return SeverityStatus.of(configuration.get(RedmineSettings.AUTO_SEVERITY).orElse(SeverityStatus.BLOCKER.getSeverityLabel()));
    }
    public int AUTO_SEVERITY_LEVEL(String SeverityLabel){
        return SeverityStatus.to(SeverityLabel);
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
