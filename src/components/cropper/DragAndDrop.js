/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description DragAndDrop.js
 * @createdOn 11/07/21 11:45 am
 */




import React, { Component } from 'react';

class DragAndDrop extends Component {
    state = {
        drag: false,
    };
    dropRef = React.createRef();
    fileRef = React.createRef();
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: true });
    };
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: false });
    };
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: false });
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files && files.length > 0) {
            this.props.handleDrop(files);
            e.dataTransfer.clearData();
        }
    };
    onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.props.handleDrop(files);
        };
        reader.readAsDataURL(files[0]);
    };
    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }
    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }
    render() {
        return (
            <div
                onClick={() => this.fileRef.current.click()}
                ref={this.dropRef}
                style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}
            >
                <div
                    style={{
                        border: this.state.drag ? 'dashed black 4px' : 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '35%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: this.state.drag ? 'black' : 'grey',
                            fontSize: 28,
                        }}
                    >
                        <input
                            accept="image/png, image/jpeg"
                            onChange={this.onChange}
                            ref={this.fileRef}
                            style={{ display: 'none' }}
                            type="file"
                        />
                        <div>{'Click to Choose File'}</div>
                        <div>{'or'}</div>
                        <div>{'Drag & Drop File here'}</div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
export default DragAndDrop;