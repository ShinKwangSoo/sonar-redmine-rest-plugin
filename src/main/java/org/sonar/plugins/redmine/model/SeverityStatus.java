package org.sonar.plugins.redmine.model;

import org.sonar.api.rule.Severity;

public enum SeverityStatus{
    BLOCKER(1, Severity.BLOCKER),CRITICAL(2,Severity.CRITICAL),MIJOR(3,Severity.MAJOR),MINOR(4,Severity.MINOR),INFO(5,Severity.INFO);

    private final int SeverityLevel;
    private final String SeverityLabel;

    SeverityStatus(int SeverityLevel, String SeverityLabel) {
        this.SeverityLevel=SeverityLevel;
        this.SeverityLabel=SeverityLabel;
    }

    public static String of(String SeverityLabel) {
        for (SeverityStatus s : values()) {
            if (s.SeverityLabel.equals(SeverityLabel)) {
                return s.SeverityLabel;
            }
        }
        return null;
    }

    public static int to(String SeverityLabel) {
        for (SeverityStatus s : values()) {
            if (s.SeverityLabel.equals(SeverityLabel)) {
                return s.SeverityLevel;
            }
        }
        return BLOCKER.SeverityLevel;
    }
     public String getSeverityLabel(){
        return SeverityLabel;
    }
}