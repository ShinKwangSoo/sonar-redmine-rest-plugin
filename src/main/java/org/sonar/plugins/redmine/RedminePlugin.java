/*
 * SonarQube Redmine Plugin
 * Copyright (C) 2013 Patroklos PAPAPETROU and Christian Schulz
 * dev@sonar.codehaus.org
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02
 */
package org.sonar.plugins.redmine;

import org.sonar.api.Plugin;
import org.sonar.plugins.redmine.client.RedmineAdapter;
import org.sonar.plugins.redmine.config.RedmineSettings;
import org.sonar.plugins.redmine.exceptions.*;
import org.sonar.plugins.redmine.reviews.RedmineIssueFactory;
import org.sonar.plugins.redmine.ui.SonarToRedmine;


public class RedminePlugin implements Plugin {

    @Override
    public void define(Context context) {

        // Definitions
        context.addExtension(RedmineMetrics.class);
        // Batch
        context.addExtensions(RedmineSensor.class, RedmineAdapter.class);
        // Server
        context.addExtension(RedmineIssueFactory.class);
        context.addExtension(CountDistributionBuilder.class);
        // tutorial on settings
        context.addExtensions(RedmineSettings.getProperties())
                .addExtension(RedmineAdapter.class);
        // UI
        context.addExtension(SonarToRedmine.class);
        //RedmineWidget.class, RedmineDevelopersWidget.class, RedmineSettingsPage.class,
        // Reviews
        //RedmineLinkFunction.class, RedmineWorkflowBuilder.class,
        // Exceptions
        /*context.addExtension(RedmineProjectSetting.class);*/
        context.addExtensions(RedmineGeneralException.class, RedmineAuthenticationException.class, RedmineTransportException.class, RedmineNotFoundException.class, RedmineNotAuthorizedException.class);

    }
}
