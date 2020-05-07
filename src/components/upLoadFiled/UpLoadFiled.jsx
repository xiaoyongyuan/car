import React,{Component} from "react";
import { Upload, message,Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import "./upload.css";
import axios from "../../axios/server";
const { Dragger } = Upload;
class UpLoadFiled extends Component{
    state={
        checkload:"",
        filename:"",
        token:"",
        testing:"",//检测后图片地址
    };
    //开始检测
    handleTesting=()=>{
        if(this.state.checkload && this.state.filename && this.state.token){
              axios.ajax({
                 method:"get",
                 url:window.g.stateUrl+"/api/file/check",
                 data:{
                     checkload:this.state.checkload,
                     filename:this.state.filename,
                     token:this.state.token
                 }
             }).then((res)=>{
                 if(res.success){
                     if(res.msg){
                         this.hanleGetOne();
                     }
                 }
              })
        }else{
            message.info("请先上传文件！");
        }
    };
    hanleGetOne=()=>{
        if(this.state.token){
            axios.ajax({
                method:"get",
                url:window.g.stateUrl+"/api/file/getone",
                data:{token:this.state.token}
            }).then((res)=>{
                if(res.success){
                    if(res.data){
                        this.setState({
                            testing:res.data.savepic
                        });
                        if(res.data.width && res.data.height){
                            this.draw(res.data.info,res.data.width,res.data.height);
                        }else{
                            message.info("暂无图片宽高无法绘制！");
                        }
                    }else{
                        this.testingTimes=setTimeout(()=>this.hanleGetOne(),2000);
                    }
                }
            })
        }
    };
    draw = (info, width, hieght) => {
        let carName = [];
        let carCon = "";
        let xi = (604 / width).toFixed(2),
            yi = (476 / hieght).toFixed(2);
        let his = document.getElementById("canTesting");
        let con = his.getContext("2d");
        his.width=his.width;
        con.fillStyle = "#f03a31";
        con.lineWidth = 2;
        con.strokeStyle = "#0000FF";
        con.font = 'normal bold 18px sans-serif';
        info.map((item) => {
            carName.push({"tag": item.tag, "x": item.x, "y": item.y});
            con.rect(parseInt(item.x*xi),parseInt(item.y*yi),parseInt(item.w*xi),parseInt(item.h*yi));
        });
        carName.map((item) => {
            if (item.tag == 0) {
                carCon = '泵车';
            } else if (item.tag == 1) {
                carCon = '挖掘机';
            } else if (item.tag == 2) {
                carCon = '卡车';
            } else if (item.tag == 3) {
                carCon = '推土机';
            } else if (item.tag == 4) {
                carCon = '吊车';
            }
            con.fillText(carCon, item.x * xi, item.y * yi);
        });
        con.stroke();
    };
    componentWillUnmount() {
        clearInterval(this.testingTimes);
    }

    render() {
        const _this=this;
        const props = {
            name: 'file',
            method:"post",
            multiple: false,
            accept:".png,.jpg",
            showUploadList:false,
            action: window.g.stateUrl+"/api/file/upload",
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    _this.setState({
                        checkload:info.file.response.data.checkmode,
                        filename:info.file.response.data.filename,
                        token:info.file.response.data.token
                    });
                }
                if (status === 'done') {
                    message.success(`${info.file.name}上传成功.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} 上传失败.`);
                }
            },
        };
        const graph=this.state.filename;
        return(
            <div className="upload">
                <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">单击或拖动图片到此区域上传图片</p>
                    <p className="ant-upload-hint">图片格式仅限PNG、JPG</p>
                </Dragger>
                <div className="histBtn">
                    <Button type="primary" onClick={this.handleTesting}>开始检测</Button>
                </div>
                <div className="canvFiled" >
                    <div className="cavText">
                        <div className="cavTitle">原图</div>
                        <canvas width="604px" height="476px"
                                style={{
                                    backgroundImage: "url(" + `${graph}` + ")",
                                    backgroundSize: "100% 100%",
                                    display:this.state.filename?"flex":"none"
                                }}
                        />
                    </div>
                    <div  className="cavText">
                        <div className="cavTitle">检测后图</div>
                        <canvas width="604px" height="476px"
                                id="canTesting"
                                style={{
                                    backgroundImage: "url(" + `${this.state.testing}` + ")",
                                    backgroundSize: "100% 100%",
                                    display:this.state.testing?"flex":"none"
                                }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default UpLoadFiled;