 //控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService,typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			
			$scope.entity.parentId = $scope.parentId;
			
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
					$scope.findByParentId($scope.parentId);
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){	
		if($scope.estimateDele($scope.selectIds)){
			alert($scope.estimateDele($scope.selectIds));
			//获取选中的复选框			
			itemCatService.dele( $scope.selectIds ).success(
				function(response){
					if(response.success){
						//重新查询 
						$scope.findByParentId($scope.parentId);
						$scope.selectIds=[];
						alert("删除成功");
					}						
				}		
			);	
		}else{
			alert("你选择的项,包含子项,无法删除");
		}
					
	}
	
	//判断所选文件是否包含子类
	$scope.estimateDele= function(list){
		for(var i = 0 ; i<list.length;i++){
			
			itemCatService.findByParentId(list[i]).success(
				function(response){
					if(response.length>0){//说明地下有值
						return false;
					}
				}
			);
		}
		return true;
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	$scope.parentId = 0;
    
	//根据上级ID查询
	$scope.findByParentId=function(parentId){
		$scope.parentId = parentId;
		
		itemCatService.findByParentId(parentId).success(
			function(response){
				$scope.list=response;			
			}
		);				
	}
	//定义变量 表示级别
	$scope.grade = 1;
	
	//调用方法设置级别
	$scope.setGrade = function(value){
		$scope.grade = value;
	}
	
	//读取列表
	$scope.selectList = function(p_entity){
		
		if($scope.grade == 1){
			$scope.entity_1 = null;
			$scope.entity_2 = null;
		}

		if($scope.grade == 2){
			$scope.entity_1 = p_entity;
			$scope.entity_2 = null;
		}

		if($scope.grade == 3){
			$scope.entity_2 = p_entity;
		}
		
		$scope.findByParentId(p_entity.id);
	}
	
	
	$scope.selectTemplateList = function(){
		typeTemplateService.selectTemplateList().success(
			function(response){
				$scope.typeTemplateList = {data:response};
			}
		)
	}
	
	
	
	
	
	
	
	
});	
