import React, {Component} from "react";
import {Table, Button, Modal,message} from 'antd';
import "./history.css";
import axios from "../../axios/server";

class History extends Component {
    state = {
        visible: false,
        taList: [],
        canvImg: "",//图片
        times: "",//识别时间
        objNum: "",//识别点位
        carType: [],//车辆名称
    };

    componentDidMount() {
        axios.ajax({
            method: "get",
            url: window.g.stateUrl + "/api/file/getlist",
        }).then((res) => {
            if (res.success) {
                let historyList = [];
                if (res.data.length !== 0) {
                    res.data.map((v) => {
                        historyList.push(JSON.parse(v));
                    });
                }
                this.setState({
                    taList: historyList
                })
            }
        })
    }

    hanleDetail = (value) => {
        axios.ajax({
            method: "get",
            url: window.g.stateUrl + "/api/file/getone",
            data: {token: value}
        }).then((res) => {
            if (res.success) {
                let type = [];
                let tags = [];
                if(res.data){
                    res.data.info.map(item => {
                        if (!(tags.indexOf(item.tag) > -1)) {
                            tags.push(item.tag)
                        }
                    });
                    tags.map((item) => {
                        if (item == 0) {
                            type.push('泵车');
                        }
                        if (item == 1) {
                            type.push('挖掘机');
                        }
                        if (item == 2) {
                            type.push('卡车');
                        }
                        if (item == 3) {
                            type.push('推土机');
                        }
                        if (item == 4) {
                            type.push('吊车');
                        }
                    });
                    this.setState({
                        visible: true,
                        canvImg: res.data.savepic,
                        times: res.data.ymd && res.data.hms ? res.data.ymd + " " + res.data.hms : "",
                        objNum: res.data.obj_num,
                        carType: type.length !== 0 ? type.join("，") : "无",
                        filed: res.data.info
                    });
                    this.draw(res.data.info, res.data.width, res.data.height);
                }else{
                    message.info("暂未识别");
                }
            }
        })
    };
    draw = (info, width, hieght) => {
        let carName = [];
        let carCon = "";
        let xi = (604 / width).toFixed(2),
            yi = (476 / hieght).toFixed(2);
        let his = document.getElementById("canHistory");
        let con = his.getContext("2d");
        con.clearRect(0, 0, 604, 476); //清除之前的绘图
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
    handleCancel = () => {
        this.setState({
            visible: false,
            carName: []
        })
    };

    render() {
        const columns = [
            {
                title: '图片编号',
                dataIndex: 'token',
                key: 'token',
                align: "center"
            },
            {
                title: '结果图片',
                dataIndex: 'savepic',
                key: 'savepic',
                align: "center",
                width: "14%",
                render: (text) => {
                    return (
                        <img src={text?text:"未识别"} alt=""
                             style={{width: "140px", height: "60px"}}/>
                    )
                }
            },
            {
                title: '车类型',
                dataIndex: 'info',
                key: 'info',
                align: "center",
                render: (text) => {
                    let type = [];
                    let tags = [];
                    text.map(item => {
                        if (!(tags.indexOf(item.tag) > -1)) {
                            tags.push(item.tag)
                        }
                    });
                    tags.map((item) => {
                        if (item == 0) {
                            type.push('泵车');
                        }
                        if (item == 1) {
                            type.push('挖掘机');
                        }
                        if (item == 2) {
                            type.push('卡车');
                        }
                        if (item == 3) {
                            type.push('推土机');
                        }
                        if (item == 4) {
                            type.push('吊车');
                        }
                    });
                    return type.join('，');
                }
            },
            {
                title: '结果数量',
                dataIndex: 'obj_num',
                key: 'obj_num',
                align: "center"
            }, {
                title: '识别时间',
                dataIndex: 'ymd',
                key: 'ymd',
                align: "center",
                render: (text, record) => {
                    return (record.ymd + " " + record.hms)
                }
            }, {
                title: "操作",
                dataIndex: 'oper',
                key: 'oper',
                align: "center",
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary" onClick={() => this.hanleDetail(record.token)}>详情</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="history">
                <div className="histTab">
                    <Table columns={columns} dataSource={this.state.taList} bordered size="small"/>
                </div>
                <Modal
                    title="详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={700}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <div className="histCon">
                        <canvas width="604px" height="476px"
                                id="canHistory"
                                style={{
                                    backgroundImage: "url(" + `${this.state.canvImg}` + ") ",
                                    backgroundSize: "100% 100%",
                                    backgroundRepeat: "no-repeat"
                                }}
                        />
                        <div className="historyModel">
                            <span>识别点位:{this.state.objNum}</span>
                            <span>车辆名称:{this.state.carType}</span>
                            <span>识别时间:{this.state.times}</span>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default History;