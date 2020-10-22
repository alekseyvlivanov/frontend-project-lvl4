import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';

import Channel from './Channel';
import getModal from './modals/index.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const ChannelsList = () => {
  const { channels, currentChannelId } = useSelector(
    (state) => state.channelsInfo,
  );

  const [modalInfo, setModalInfo] = useState({ type: null, data: null });
  const hideModal = () => setModalInfo({ type: null, data: null });
  const showModal = (type, data) => setModalInfo({ type, data });

  return (
    <>
      <Col
        xs="3"
        className="d-flex flex-column h-100 border-right overflow-auto"
      >
        <div className="d-flex pt-2 pb-1 px-1">
          <span className="h6 m-0">Channels</span>
          <Button
            variant
            size="sm"
            className="ml-auto my-0 p-0"
            onClick={() => showModal('adding', channels)}
          >
            <span className="h6 m-0 p-0">+</span>
          </Button>
        </div>
        <Nav variant="pills" className="mt-1 mb-3 d-flex flex-column">
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              channel={channel}
              currentChannelId={currentChannelId}
              handleShowRemove={() => showModal('removing', channel)}
              handleShowRename={() =>
                showModal('renaming', { channels, channel })
              }
            />
          ))}
        </Nav>
      </Col>
      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default ChannelsList;
