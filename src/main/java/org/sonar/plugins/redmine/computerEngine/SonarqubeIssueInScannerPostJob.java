package org.sonar.plugins.redmine.computerEngine;


import org.sonar.api.batch.postjob.PostJob;
import org.sonar.api.batch.postjob.PostJobContext;
import org.sonar.api.batch.postjob.PostJobDescriptor;
import org.sonar.api.batch.postjob.issue.PostJobIssue;
import org.sonar.plugins.redmine.config.RedmineSettingsConfiguration;

public class SonarqubeIssueInScannerPostJob implements PostJob {

    private final RedmineSettingsConfiguration redmineSettingsConfiguration;

    public SonarqubeIssueInScannerPostJob(RedmineSettingsConfiguration redmineSettingsConfiguration) {
        this.redmineSettingsConfiguration = redmineSettingsConfiguration;
    }

    public void describe(PostJobDescriptor descriptor) {
        descriptor.name("Send Redmine");
    }

    @Override
    public void execute(PostJobContext context) {
        if (context.analysisMode().isIssues()) {
            for (PostJobIssue issue : context.issues()) {
                if (redmineSettingsConfiguration.Bug() == true) {
                    for (int i = 0; i < redmineSettingsConfiguration.AUTO_SEVERITY_LEVEL(redmineSettingsConfiguration.AUTO_SEVERITY()); i++) {
                        String key = issue.key();
                        String ruleKey = issue.ruleKey().toString();
                        String component = issue.componentKey();
                        Integer line = issue.line();
                        String message = issue.message();
                        if (issue.severity().toString() == redmineSettingsConfiguration.AUTO_SEVERITY()) {
                            String severity = issue.severity().toString();
                        }
                        if(redmineSettingsConfiguration.RedmineURL()!=null && redmineSettingsConfiguration.APIKey()!=null && redmineSettingsConfiguration.ProjectKey()!=null && redmineSettingsConfiguration.TrackerId()!=null && redmineSettingsConfiguration.UserId()!=null) {

                        }
                    }
                }
            }
        }
    }
}
