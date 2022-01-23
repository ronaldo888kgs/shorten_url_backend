import React, {useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../css/app.css';
import DataTable from '../components/DataTable';
import { Button } from 'react-bootstrap';
import {getLinks, shortenLink, editOriginLink, deleteLink} from '../service/LinkService';

import Modal from 'react-bootstrap/Modal';

function Dashboard(props) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
    const [userInfo, setUserInfo] = useState(undefined);
    const [links, setLinks] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditUrlModal, setShowEditUrlModal] = useState(false);
    const [showDeleteUrlModal, setDeleteUrlModal] = useState(false);
    const [selectedRowID, setSelectedRowID] = useState(false);
    const [originUrl, setOriginUrl] = useState('');
    const inputOriginUrlEdit = useRef(null);

    function goUrl()
    {

    }
    function deleteUrl()
    {
        deleteLink(selectedRowID).then(res => {
            if(res.status == "success"){
                getLinksFromService();
            }else{
                alert(res.error);
            }
            setShowEditUrlModal(false);
        });
    }

    function doEditOriginUrl()
    {
        let editedUrl = inputOriginUrlEdit.current.value;

        editOriginLink(selectedRowID, editedUrl).then(res => {
            if(res.status == "success"){
                getLinksFromService();
            }else{
                alert(res.error);
            }
            setShowEditUrlModal(false);
        })
    }
    function clickedRow(rowID){
        console.log('Dashboard', 'clickedRow', rowID);
        setShowDetailModal(true);
        setSelectedRowID(rowID);
    }
    function clikedEdit(rowID){
        console.log('Dashboard', 'clikedEdit', rowID);
        setShowEditUrlModal(true);
        setSelectedRowID(rowID);
    }
    
    function urlDelete(rowID){
        console.log('Dashboard', 'urlDelete', rowID);
        setDeleteUrlModal(true);
        setSelectedRowID(rowID);
    }
    
    function createUrl()
    {
        if(originUrl == '')   
        {
            return;
        }
        shortenLink(originUrl).then(res => {
            if(res.status == "success")
            {
                getLinksFromService();
            }
        });
    }
    async function getUser()
    {
        let tmpUserInfo = {};
        await axios.get('http://127.0.0.1:8000/api/user').then(res => {tmpUserInfo = res.data;});
        setUserInfo(tmpUserInfo);

        
    }

    async function getLinksFromService()
    {
        await getLinks().then(res => {
            console.log('getLinksFromService', res.links);
            setLinks(res.links);
        });
        
    }
    function doLogout()
    {
        axios.post('http://127.0.0.1:8000/api/logout').then(res => console.log('Dashboard', res.data));
        props.removeToken();
    }
    useEffect(() => {
        if(!userInfo)
        {   
            getUser();
            getLinksFromService();
        }
    });

    return (
        <div className="container">
            <div className="banner d-flex">
                <h3>Dashboard</h3>
            </div>
            <div className="middle-buttons d-flex justify-content-end" style={{ 'marginTop':'20px' }}>
                <span style={{ 'marginRight':'10px' }}>{!userInfo ? '': userInfo.email}</span>
                <a className="text-button" onClick={doLogout}>logout</a>
            </div>
            
            <div className="d-flex" style={{ 'marginTop':'20px' }}>
                <input type="text" className="form-control" value={originUrl} onChange={(e) => setOriginUrl(e.target.value)}></input>
                <Button variant="success" style={{ 'marginLeft':'20px'}}  onClick={createUrl}>Shorten</Button>
            </div>
            <div style={{ 'marginTop':'20px' }}>
                <DataTable 
                    links={links} 
                    clickedRow={clickedRow} 
                    clikedEdit={clikedEdit} 
                    urlDelete={urlDelete}
                    goUrl={goUrl} />
            </div>

            <Modal
                size="lg"
                show={showDetailModal}
                onHide={() => setShowDetailModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Detail Urls
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        links.map((item, id) => {
                            if(item.id == selectedRowID)
                            {
                                return (
                                    <div key={id}>
                                        <div>
                                            S.NO : 
                                            <input className="form-control" value={item.id} readOnly></input>
                                        </div>
                                        <div>
                                            Origin Url : 
                                            <input className="form-control" value={item.origin_url} readOnly></input>
                                        </div>
                                        <div>
                                            Short Url : 
                                            <input className="form-control" value={item.short_url} readOnly></input>
                                        </div>
                                        <div>
                                            Linked Count : 
                                            <input className="form-control" value={item.click_count} readOnly></input>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                </Modal.Body>
            </Modal>

            <Modal
                size="lg"
                show={showEditUrlModal}
                onHide={() => setShowEditUrlModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Edit URL
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        links.map((item, id) => {
                            if(item.id == selectedRowID)
                            {
                                return (
                                    <div key={id}>
                                        <div className="margin_top_30">
                                            Short Url : 
                                            <input className="form-control" value={item.short_url} readOnly></input>
                                        </div>
                                        <div className="margin_top_30">
                                            Origin Url : 
                                            <input className="form-control" defaultValue={item.origin_url} ref={inputOriginUrlEdit}></input>
                                        </div>
                                        <div className="margin_top_30">
                                            <Button variant="success" className="form-control" onClick={doEditOriginUrl}>Edit</Button>
                                        </div>
                                        
                                    </div>
                                );
                            }
                        })
                    }
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={showDeleteUrlModal}
                onHide={() => setDeleteUrlModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Delete Url
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                        links.map((item, id) => {
                            if(item.id == selectedRowID)
                            {
                                return (
                                    <div key={id}>
                                        <div  className="margin_top_30">
                                            S.NO : 
                                            <input className="form-control" value={item.id} readOnly></input>
                                        </div>
                                        <div  className="margin_top_30">
                                            Short Url : 
                                            <input className="form-control" value={item.short_url} readOnly></input>
                                        </div>
                                        <div  className="margin_top_30">
                                            <Button variant="outline-danger" onClick={deleteUrl}>Delete</Button>
                                        </div>
                                        
                                    </div>
                                );
                            }
                        })
                    }
                </Modal.Body>
            </Modal>
            
        </div>
    );
}

export default Dashboard;