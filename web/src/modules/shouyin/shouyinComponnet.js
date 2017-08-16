import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Table,Input } from 'element-react';
import '../../static/styles/shouyin.scss';
import * as ShouyinActions from './shouyinAction';
import $ from './jquery3.1.1.js'

class ShouyinComponent extends React.Component{
	constructor(props) {
		  super(props);
		  this.state = {
		    columns: [
		      {
		        label: "条码",
		        prop: "barCode",
		        width: 200
		      },
		      {
		        label: "品名",
		        prop: "name",
		        width: 300
		      },
		      {
		        label: "规格",
		        prop: "standard"
		      },
		      {
		        label: "进货价",
		        prop: "purchasingCode"
		      },
		      {
		        label: "销售价",
		        prop: "salesPrice"
		      },
		      {
		        label: "分类",
		        prop: "classify"
		      },
		      {
		        label: "单位",
		        prop: "unit"
		      },
		      {
		        label: "数量",
		        prop: "qty"
		      }
		    ],
		    data: [{
			      barCode: '',
			      name: '',
			      standard: '',
			      purchasingCode: '',
			      salesPrice: '',
			      classify: '',
			      unit: '',
			      qty:''
			}]
		}
	}
	collect(){
		var barCode = document.getElementById('barCode').value;
		this.props.cashier(barCode).then(function(res){
			var tr = $('.el-table__body').children().find('tr');
			console.log(tr);
			if(this.state.data[0].barCode==''){
				var aa = this.props.data.splice(this.state.data[0])
			}else{
				contrast(tr,this.state.data,this.props.data);
			}
			console.log(aa);
			this.setState({
				data:Object.assign(this.state.data, aa)
			})
			
		}.bind(this));
	}
	settle_accounts(){
		/*console.log(this.state.data[0].salesPrice);*/
		var tr = $('.el-table__body').children().find('tr');
		/*console.log(tr.length);*/
	}
	balance(){
		var target = $('.el-table__body').children().find('td');
		var content = target[1].innerText;
		var price = target[4].innerText;
		console.log(content,price);
		this.props.pointer(content,price).then(function(res){
			console.log(res);
		})
	}
	render(){
		return(
			   <div className="bigbox">
			   		<div className="head">
			   			<span>老晨晨</span>
			   		</div>
			   		<div className="body">
			   			<div className="fChild">
			   				<div className="screen">
			   					<span>商品编号/条码:</span>
			   					<input type="text" id="barCode" onBlur={this.collect.bind(this)} onChange={this.settle_accounts.bind(this)}/>
			   					<span>小票流水号:00000000000</span>
			   				</div>
			   				<Table style={{width: '100%'}}
						      columns={this.state.columns}
						      data={this.state.data}
						      border={true}
						    />
			   			</div>
			   			<div className="sChild">
			   				<button>会员 F8</button>
			   				<laber>卡号:<input type="text"/></laber>
			   				<laber>姓名:<input disabled type="text"/></laber>
			   				<laber>积分:<input disabled type="text"/></laber>
			   				<laber>类型:<input disabled type="text"/></laber>
			   				<laber>折扣:<input disabled type="text"/></laber>
			   				<laber>余额:<input disabled type="text"/></laber>
			   				<laber>电话:<input disabled type="text"/></laber>
			   			</div>
			   			<div className="tChild">
			   				<div className="left">
				   				<div className="one">
				   					<span>数量:</span>
				   					<span>0</span>
				   				</div>
				   				<div className="two">
					   				<div className="stwo">
					   					<span>应收:¥</span>
					   					<span>{this.state.data[0].salesPrice}</span>
					   				</div>
					   				<div className="sthree">
					   					<span>实收:</span>
					   					<span>0.00</span>
					   					<button>打折</button>
					   				</div>
					   			</div>
			   				</div>
			   				<div className="right">
				   				<div>
				   					<laber>交来:<input type="text"/></laber>
				   					<laber>卡付:<input disabled type="text"/></laber>
				   					<laber>其他:<input disabled type="text"/></laber>
				   					<laber>找零:<input disabled type="text"/></laber>
				   				</div>
				   				<button onClick={this.balance.bind(this)}>结算打印</button>
			   				</div>
			   			</div>
			   			<div className="inline-input">
			   				<div>
				   				<span>08</span><span>月</span><span>08</span><span>日</span>
				   				<span>08</span><span>：</span><span>08</span>
			   				</div>
			   				<div>
			   					<span>收银员:</span><span>陈胖胖</span>
			   				</div>
			   				<div>
			   					<button>帮助F1</button>
			   					<button>设置</button>
			   					<button>查询</button>
			   					<button>统计</button>
			   					<button>退货</button>
			   					<button>钱箱</button>
			   					<button>交班</button>
			   					<button>打印上一单</button>
			   				</div>
					    </div>
			   		</div>
			   </div>
		)
	}
}
const mapStateToProps = state => ({
    loading: state.cashier.loading,
    data:state.cashier.data
})
export default connect(mapStateToProps, ShouyinActions)(ShouyinComponent)

function contrast(tr,state,props){
	for(var i = 0;i<tr.length-1;i++){
		if(state[i].barCode == props[0].barCode){
			state[i].qty++;
		}else{
			var aa = state.push(contrast(tr,state[i],props))
		}
	}
	return aa;
}