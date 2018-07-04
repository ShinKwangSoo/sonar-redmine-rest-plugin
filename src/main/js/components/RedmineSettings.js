import React from "react";
import Select from 'react-select';
import {RedmineSettingsAPI} from "../api";


export default class RedmineSettings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            project: [],
            tracker: [],
            user: [],
            settings: []
        }
    }
    componentDidMount() {
        RedmineSettingsAPI().then(
            (settingData) => {
                this.setState({
                       settings: settingData
                });
            }
        );
    }
    render() {
        return (
            <table>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Projects : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            {console.log(this.state.settings)}
                            <Select id="project-select" name="selected-state" value={this.state.settings}
                                    searchable={true} simpleValue/>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Trackers : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="trackers-select" name="selected-state" value={this.state.tracker.name}
                                    searchable={true} simpleValue/>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Users : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="users-select" name="selected-state" value={this.state.user.lastname}
                                    searchable={true}
                                    simpleValue/>
                        </div>
                    </th>
                </tr>
            </table>
        );
    }
}
