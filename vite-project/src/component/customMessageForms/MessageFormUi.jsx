import { useState } from "react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

const MessageFormUi = ({
  setAttachment,
  handleChange,
  handleSubmit,
  message,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState("");
  return (
    <div>
      <div className="message-form-container">
        {preview && (
          <div className="message-form-preview">
            <img
              src={preview}
              alt=""
              className="message-form-preview-image"
              onLoad={() => URL.revokeObjectURL(preview)}
            />
            <XMarkIcon
              className="message-form-icon-x"
              onClick={() => {
                setPreview(" ");
                setAttachment(" ");
              }}
            />
          </div>
        )}
        <div className="message-form">
          <div className="message-form-input-container">
            <input
              className="message-form-input"
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="send a message ....."
              onKeyDown={handleKeyDown}
            />
            {appendText && (
              <input
                className="message-form-assist"
                type="text"
                value={`${message} ${appendText}`}
                disabled="disabled"
              />
            )}
          </div>
          <div className="message-form-icons">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              noClick={true}
              onDrop={(acceptFiles) => {
                setAttachment(acceptFiles[0]);
                setPreview(URL.createObjectURL(acceptFiles[0]));
              }}
            >
              {({ getRootProps, getInputProps, open }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <PaperClipIcon
                    className="message-form-icon-clip"
                    onClick={open}
                  />
                </div>
              )}
            </Dropzone>
            <hr className="vertical-line" />
            <PaperAirplaneIcon
              className="message-form-icon-airplane"
              onClick={() => {
                setPreview("");
                handleSubmit();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageFormUi;
