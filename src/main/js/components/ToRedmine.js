import React from 'react';

export class ToRedmine extends React{
    constructor(props){
        super(props);
        this.ToRedmine=this.ToRedmine.bind(this);
    }
    ToRedmine=()=>{
        console.log('test',this);
    }
}
