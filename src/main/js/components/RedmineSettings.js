import React from "react";
import Select from 'react-select';


export default class RedmineSettings extends React.Component {
    constructor(props) {
        super(props);
        this.RedmineProjectList = this.RedmineProjectList.bind(this);
    }

    RedmineProjectList() {
        let redmineprojectName = [];
        for(let i=0, redmineprojectNumber=0; i<this.props.container[0].length; i++){
            let result={
                value:this.props.container[0][i].name,
                label:this.props.container[0][i].name,
                id:this.props.container[0][i].id
            }
            redmineprojectName[redmineprojectNumber]= result
            redmineprojectNumber++;
        }
        return redmineprojectName;
    }


    render() {
        return (
            <table>
                <tr>
                    <th>
                        {console.log(this.RedmineProjectList())}
                        <div className="code-components-cell"><span><h3>Redmine Projects : </h3></span></div>
                    </th>
                    <th>
                        <span className="selection">
                            <Select id="project-select" name="selected-state" options={this.RedmineProjectList()}
                                    searchable={true} simpleValue/>
                        </span>
                    </th>
                </tr>
                <tr>
                    <th>
                        <div className="code-components-cell"><span><h3>Redmine Trackers : </h3></span></div>
                    </th>
                    <th>
                        <div className="selection">
                            <Select id="trackers-select" name="selected-state" options={this.props.container[1].all}
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
                            <Select id="users-select" name="selected-state" options={this.props.container[2].all}
                                    searchable={true}
                                    simpleValue/>
                        </div>
                    </th>
                </tr>
            </table>
        );
    }
}
