 //控制层 
app.controller('loginController' ,function($scope,loginService){	
	
	$scope.showLoginName=function(){
		loginService.loginName().success(
			function(response){
				$scope.loginName = response.loginName;
			}
		)
		
	}
	
});