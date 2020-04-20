import React from 'react';
import './App.css';
import Spinner from './components/spinner/spinner';

class App extends React.Component {

   state = {
        resp: "",
        msg: "",
        isLoading: false
   }

   render() {

        const { isLoading } = this.state;

        return (
        <React.Fragment>
            <div className="upload-container">
                <div className="upload-header">
                    <h2>Json Parser Example</h2>
                </div>
                <div className="upload-content">
                    <div className="single-upload">
                        <h3>Upload Single File</h3>
                        <div id="singleUploadForm" name="singleUploadForm">
                            <input id="singleFileUploadInput" type="file" name="file" className="file-input" required />
                            <button type="submit" className="primary submit-btn" onClick={this.submitFile}>Submit</button>
                        </div>
                        {isLoading && <Spinner />}
                        <div className="upload-response">
                            <div id="singleFileUploadMsg">{this.state.msg}</div>
                            <p id="resposta">{this.state.resp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }

    submitFile = () => {

        var files = document.querySelector('#singleFileUploadInput').files;
        if(files.length !== 0) {
           this.uploadSingleFile(files[0]);
        }else{
            this.setState({resp:"",msg: "Favor selecionar um arquivo!"});
        }

    }

    uploadSingleFile(file) {

        this.setState({ isLoading: true ,msg: ""});

        var formData = new FormData();
        formData.append("file", file);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:8080/parseFile");

        //depois da chamada
        xhr.onload = function() {
            this.setState({ isLoading: true });
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if(xhr.status === 200) {
                this.setState({resp:xhr.responseText,msg: "Arquivo lido corretamente",isLoading: false});
            } else {
                this.setState({resp:"",msg:(response && response.message) || "Ocorreu algum erro",isLoading: false});
            }
        }.bind(this);

        xhr.onerror = function () {
           this.setState({ resp:"",msg:"Problema na chamada para api" ,isLoading: false});
        }.bind(this);

        xhr.send(formData);
    }
}

export default App;
