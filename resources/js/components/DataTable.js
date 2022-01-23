import React from 'react';
//import { useTable } from 'react-table';

//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import '../../css/app.css';
import RowItem from './RowItem';


export default function DataTable(props){
    function clickedGoUrl(rowID){
        props.goUrl();
    }
    function clickedRow(rowID){
        props.clickedRow(rowID);
    }
    function clikedEdit(rowID){
        props.clikedEdit(rowID);
    }
    function urlDelete(rowID){
        props.urlDelete(rowID);
    }
    return (
        <div>
            <table className="table-url_list">
                <thead>
                    <tr>
                        <th className="th-url_list no">No</th>
                        <th className="th-url_list">Origin URL</th>
                        <th className="th-url_list">Changed URL</th>
                        <th className="th-url_list">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.links && props.links.map((link, i) => {
                        return (
                          <RowItem 
                            data={link} 
                            index={i}
                            key={i} 
                            clickedGoUrl = {clickedGoUrl}
                            clickedRow ={clickedRow} 
                            clickedEdit={clikedEdit} 
                            clickedDelete ={urlDelete} ></RowItem>  
                        );
                    })
                    }
                </tbody>
            </table>
        </div>
        
    );
}
