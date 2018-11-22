import React from "react";
import "../common/SonarRedmine.css"

export default class SonarIssueList extends React.PureComponent {
    constructor(props) {
        super(props);
        /* this._tableRef=React.createRef();*/
        this.SonarSource = this.SonarSource.bind(this);
    }
/*
    componentDidMount(){
        if (this.props.sourceData[this.props.sourceData.length - 1].number + 1 === this.props.sourceDataMore) {
            this.setState({
                SourceMoreButton: true
            });
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.SourceMoreButton===true) {
                if (this.props.sourceData[this.props.sourceData.length - 1].number + 1 === this.props.sourceDataMore) {
                    this.setState({
                        SourceMoreButton: false
                    })
                }
            }
        }
    }*/

    /* scrollToLocation(){
         this._tableRef.scrollIntoView({behavior:'smooth'})
     }

     componentDidMount() {
         console.log("componentDidMount Scroll location");
         if (this.props.sourceData.find((ruleNumber) => {ruleNumber.number=this.props.issue.line})) {
             console.log("ComponentDidMount Rule Line in Source");
             this.scrollToLocation();
         }
     }

     componentDidUpdate() {
         console.log("componentDidupdate Scroll location");
         if (this.props.sourceData.find((ruleNumber) => {ruleNumber.number=this.props.issue.line})) {
             console.log("componentDidUpdate Rule Line in Source");
             this.scrollToLocation();
         }
     }*/

    SonarSource() {
        let table = [];
        for (let i = 0; i < this.props.sourceData.length; i++) {
            let _codeLine = 'nowrap sonarSourceViewCodeNumber';
            let _codeLocation = 'nowrap text-left sonarSourceViewCode';
            let _codeSCM = 'sonarSourceViewCode sonarSourceViewCodeSCM';
            let codeLinkRule = false;
            if (this.props.sourceData[i].number === this.props.issue.line) {
                _codeLine = 'sonarSourceViewCodeIssueLine';
                _codeLocation = 'nowrap text-left sonarSourceViewCodeIssueLine';
                _codeSCM = 'text-center sonarSourceViewCodeSCM sonarSourceViewCode sonarSourceViewCodeIssueLine';
                codeLinkRule = true;
            }
            table.push(
                /*ref={_tableRef =>{this._tableRef=_tableRef}}*/
                <tr id={this.props.sourceData[i].number}>
                    <td className={_codeLine}>
                        <div className="text-right">{this.props.sourceData[i].number}</div>
                    </td>
                    <td className={_codeSCM}>
                        <div className="text-center">{this.props.sourceData[i].committer}</div>
                    </td>
                    {codeLinkRule ? (
                        <td className={_codeLocation}>
                            <div className="source-line-code-inner markdown" onClick={event => {
                                event.preventDefault();
                                this.props.handleOpenModalMessage(this.props.issue.rule, event)
                            }}
                                 dangerouslySetInnerHTML={{__html: this.props.sourceData[i].htmlDesc || ''}}>
                            </div>
                        </td>
                    ) : (
                        <td className={_codeLocation}>
                            <div className="source-line-code-inner markdown"
                                 dangerouslySetInnerHTML={{__html: this.props.sourceData[i].htmlDesc || ''}}>
                            </div>
                        </td>
                    )}
                </tr>
            );
        }

        return table
    }

    LoadMoreData(){
        let button;
        if (this.props.sourceData[this.props.sourceData.length-1].source_more) {
            button = (<footer className="spacer-top note text-center">
                <button onClick={(e) => this.props.LoadMoreCode(e)}>Load</button>
                <button onClick={(e) => this.props.handleCloseModalComponent(e)}>Close</button>
            </footer>)
        } else {
            button = (<footer className="spacer-top note text-center">
                <button onClick={(e) => this.props.handleCloseModalComponent(e)}>Close</button>
            </footer>)
        }
        return button
    }
    render() {

        return (
            <div>
                <table className="data zebra">
                    <thead>
                    <th className="nowrap text-left " colSpan={3}>
                        <div className="workspace-viewer-header">
                            {this.props.issue.component}</div>
                    </th>
                    </thead>
                    <tbody>
                    {this.SonarSource()}
                    </tbody>
                </table>
                <div>
                    {this.LoadMoreData()}
                </div>
            </div>
        )
    }
}