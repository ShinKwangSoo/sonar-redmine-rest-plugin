package org.sonar.plugins.redmine.computerEngine;


import com.taskadapter.redmineapi.IssueManager;
import com.taskadapter.redmineapi.RedmineException;
import com.taskadapter.redmineapi.RedmineManager;
import com.taskadapter.redmineapi.RedmineManagerFactory;
import com.taskadapter.redmineapi.bean.*;
import org.sonar.api.batch.postjob.PostJob;
import org.sonar.api.batch.postjob.PostJobContext;
import org.sonar.api.batch.postjob.PostJobDescriptor;
import org.sonar.api.batch.postjob.issue.PostJobIssue;
import org.sonar.api.config.Configuration;
import org.sonar.api.utils.log.Logger;
import org.sonar.api.utils.log.Loggers;
import org.sonar.plugins.redmine.config.RedmineSettingsConfiguration;

import java.util.Objects;

public class SonarqubeIssueInScannerPostJob implements PostJob {

    private static final Logger LOGGER = Loggers.get(SonarqubeIssueInScannerPostJob.class);
    private RedmineSettingsConfiguration redmineSettingsConfiguration;

    public SonarqubeIssueInScannerPostJob(Configuration configuration) {
        RedmineSettingsConfiguration redmineSettingsConfiguration = new RedmineSettingsConfiguration(configuration);
        this.redmineSettingsConfiguration = redmineSettingsConfiguration;
    }

    @Override
    public void describe(PostJobDescriptor descriptor) {
        descriptor.name("Send Redmine");
    }

    private RedmineManager mgr = null;

    @Override
    public void execute(PostJobContext context) {
        if(context.analysisMode().isIssues()){

        }
        if (redmineSettingsConfiguration.Auto_regist()) {
            for (PostJobIssue issue : context.issues()) {
                    connectRedmineIssue(issue);
            }
        }
    }

    private void connectRedmineIssue(PostJobIssue issue) {
        LOGGER.debug("AUTO_SEVERITY_LABLE {} {}", redmineSettingsConfiguration.AUTO_SEVERITY(), redmineSettingsConfiguration.AUTO_SEVERITY_LEVEL(redmineSettingsConfiguration.AUTO_SEVERITY()));
        for (int i = 0; i < redmineSettingsConfiguration.AUTO_SEVERITY_LEVEL(redmineSettingsConfiguration.AUTO_SEVERITY());i++) {
            if (issue.severity().toString().equals(redmineSettingsConfiguration.LevelToLabel(i+1))) {

                String key = issue.key();
                String ruleKey = issue.ruleKey().toString();
                String component = issue.componentKey();
                Integer line = issue.line();
                String message = issue.message();
                String severity = issue.severity().toString();
         /*       LOGGER.debug("OPEN {} {}", key, issue.ruleKey().repository());
                LOGGER.debug("OPEN {} : {}({}), Full: {}", ruleKey, issue.componentKey(), line, issue);*/
                if (redmineSettingsConfiguration.RedmineURL() != null && redmineSettingsConfiguration.APIKey() != null && redmineSettingsConfiguration.ProjectKey() != null && redmineSettingsConfiguration.TrackerId() != null && redmineSettingsConfiguration.UserId() != null) {
                    mgr = RedmineManagerFactory.createWithApiKey(Objects.requireNonNull(redmineSettingsConfiguration.RedmineURL()), redmineSettingsConfiguration.APIKey());
                    IssueManager issueMgr = mgr.getIssueManager();
                    Issue redmineIssue = IssueFactory.create(null);
                    try {
                        setProjectInfo(redmineIssue, redmineSettingsConfiguration.ProjectKey());
                        setTrackerInfo(redmineIssue, redmineSettingsConfiguration.TrackerId());
                        setUserInfo(redmineIssue, redmineSettingsConfiguration.UserId());
                        redmineIssue.setSubject(ruleKey);
                        redmineIssue.setDescription(ruleKey + '\n' + message + "\n\n" + "\n\n Source Code location:\n" + component + " Line : " + line + "\n\n" + "check the sonarqube \n<" + redmineSettingsConfiguration.baseUrl() + "/project/issues?id=" + issue.componentKey() + "&open=" + key + "&severities=" + severity + ">");
                        Issue newIssue = issueMgr.createIssue(redmineIssue);
                        issueMgr.update(newIssue);
                    } catch (RedmineException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }


    private void setProjectInfo(Issue issue, String projectKey) throws RedmineException {
        int intProjectKey = mgr.getProjectManager().getProjectByKey(projectKey).getId();
        Project project = ProjectFactory.create(intProjectKey);
        issue.setProject(project);
    }

    private void setTrackerInfo(Issue issue, String trackerId) {
        Tracker tracker = TrackerFactory.create(Integer.parseInt(trackerId));
        issue.setTracker(tracker);
    }

    private void setUserInfo(Issue issue, String UserId) {
        User user = UserFactory.create(Integer.valueOf(UserId));
        issue.setAssignee(user);
    }
}
