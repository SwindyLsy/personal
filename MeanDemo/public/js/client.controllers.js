var studentCtrls=angular.module("studentCtrls",[])

var studentUrl="/MeanDemo/student"
var studentNameUrl="/MeanDemo/studentName"
var studentInfoUrl="/MeanDemo/studentInfo"
studentCtrls.controller('studentCtrl',function($scope,$http,$rootScope){
	$scope.newStudent={}
	$scope.confirmPassword=''
	$scope.register=function(student,confirmPassword){
		$scope.validateName(student.name)
		$scope.validatePsd(student.password)
		$scope.comparePsd(student.password,confirmPassword)
		$scope.validateRemark(student.remark)
		if ($scope.nameflag&&$scope.psdflag&&$scope.comPsdflag&&$scope.remarkflag) {
			$http.post(studentUrl,student).success(function(response){
				console.log("success")
				window.location.href = '#/login'
			})
		}else{
			alert("sorry，填写的信息有误...")
		}
		
	}

	$scope.nameflag=true;
	$scope.validateName=function(name){
		if(name==''){
			$scope.nameflag=false;
			$scope.userNameError='账号不能为空'
		}else{
			var url=studentNameUrl+"/"+name
			$http.get(url).success(function(response){
				console.log(response)
				if(response){
					$scope.userNameError="sorry，该账号已存在"
					$scope.nameflag=false;
				}else{
					$scope.userNameError=""//恭喜你，该账号可以使用
					$scope.nameflag=true;
				}
			})
		}
	}

	$scope.psdflag=true;
	$scope.validatePsd=function(password){
		if(password==''){
			$scope.psdflag=false;
			$scope.psdError='sorry，密码不能为空'
		}else{
			$scope.psdError=''
			$scope.psdflag=true;
		}
	}

	$scope.comPsdflag=true;
	$scope.comparePsd=function(password,comfirmPsd){
		if(password=='' || comfirmPsd==''){
			$scope.confirmPsgErrorTip='sorry，密码不能为空'
			$scope.comPsdflag=false;
		}else if(password!=comfirmPsd){
			$scope.confirmPsgErrorTip='sorry，两次密码应保持一致'
			$scope.comPsdflag=false;
		}else{
			$scope.confirmPsgErrorTip='';
			$scope.comPsdflag=true;
		}
	}

	$scope.remarkflag=true;
	$scope.validateRemark=function(remark){
		console.log(remark)
		if(remark==''||remark==='undefined'){
			$scope.remarkflag=false;
			$scope.remarkTip='sorry,简介不能为空'
		}else{
			$scope.remarkTip=''
			$scope.remarkflag=true;
		}
	}


	$scope.login=function(student){
		$http.post(studentInfoUrl,student).success(function(response){
			console.log(response)
			if (response!=null) {
				$scope.student=response;
				sessionStorage.setItem("student", JSON.stringify(response));
				// $rootScope.currentStudent=response;
				window.location.href = '#/success'
				$scope.loginFailTip=''
			}else{
				$scope.loginFailTip='sorry，用户名或密码错误，请重新输入'
			}
			
		})
	}

	// $scope.currentStudent=$stateParams.student;
	 // $rootScope.currentStudent = JSON.parse(sessionStorage.getItem("student"));
	 initStudent()
	 function initStudent(){
	 	if (sessionStorage.getItem("student")) {
	 		$rootScope.currentStudent = JSON.parse(sessionStorage.getItem("student"));
	 	}
	 }
})