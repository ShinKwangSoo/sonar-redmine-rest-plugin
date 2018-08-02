package org.sonar.plugins.redmine.computerEngine;


import org.sonar.api.batch.postjob.PostJob;
import org.sonar.api.batch.postjob.PostJobContext;
import org.sonar.api.batch.postjob.PostJobDescriptor;
import org.sonar.api.batch.postjob.issue.PostJobIssue;
import org.sonar.api.rules.RuleType;
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
                if (redmineSettingsConfiguration.Auto_Type() == ) {
                    if (issue.severity().toString().equals(redmineSettingsConfiguration.Auto_Severity())) {
                        String key = issue.key();
                        String ruleKey = issue.ruleKey().toString();
                        String component = issue.componentKey();
                        Integer line = issue.line();
                        String message = issue.message();
                        String severity = issue.severity().toString();
                    }
                }
            }
        }
    }
}
