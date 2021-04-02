package org.sonar.plugins.redmine.webService;

import java.util.ArrayList;
import java.util.List;

public class getUserService {
    public List<RedmineGetUsers> RedmineGetUsers=new ArrayList<>();
    public List<RedmineGetUsers> getUser(){
        return RedmineGetUsers;
    }
    public void createUser(RedmineGetUsers redminegetusers){
        redminegetusers.add(redminegetusers);
    }
}
