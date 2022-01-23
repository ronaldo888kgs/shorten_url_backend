import React from 'react';
import '../../css/app.css';
import { Button } from 'react-bootstrap';

export default function RowItem(props){
    function rowClicked(){
        props.clickedRow(props.data.id);
    }
    function urlEdit(){
        props.clickedEdit(props.data.id);
    }
    function urlGo(){
        props.clickedGoUrl(props.data.id);
        window.open(props.data.short_url, "_blank");
       
    }
    function urlDelete(){
        props.clickedDelete(props.data.id);
    }
    return (
        <tr >
            <td className="td-url_list" onClick={rowClicked}>{props.index + 1}</td>
            <td className="td-url_list" onClick={rowClicked}>{props.data.origin_url}</td>
            <td className="td-url_list" onClick={rowClicked}>{props.data.short_url}</td>
            <td className="td-url_list" style={{ 'width':'fit-content' }}>
                <Button variant="outline-success" onClick={urlEdit}>Edit</Button>{' '}
                <Button variant="outline-warning" onClick={urlGo}>Go</Button>{' '}
                <Button variant="outline-danger" onClick={urlDelete}>Delete</Button>
            </td>
        </tr>
    );
}