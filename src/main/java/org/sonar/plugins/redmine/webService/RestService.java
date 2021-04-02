package org.sonar.plugins.redmine.webService;

import com.google.gson.JsonArray;
import com.sun.jersey.spi.inject.Inject;

import javax.json.*;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("getredmineuser")
public class RestService {

    @Inject
    getUserService getUserService;

    @GET
    public JsonArray getUser(){
        return getUserService.getUser().stream().map(c -> Json.createObjectBuilder().add());
    }

}
