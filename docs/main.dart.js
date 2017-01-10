(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isd)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="k"){processStatics(init.statics[b1]=b2.k,b3)
delete b2.k}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bb"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bb"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bb(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.q=function(){}
var dart=[["","",,H,{"^":"",fr:{"^":"b;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
aI:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aF:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bf==null){H.eC()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.c3("Return interceptor for "+H.a(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$aR()]
if(v!=null)return v
v=H.eM(a)
if(v!=null)return v
if(typeof a=="function")return C.v
y=Object.getPrototypeOf(a)
if(y==null)return C.j
if(y===Object.prototype)return C.j
if(typeof w=="function"){Object.defineProperty(w,$.$get$aR(),{value:C.d,enumerable:false,writable:true,configurable:true})
return C.d}return C.d},
d:{"^":"b;",
m:function(a,b){return a===b},
gp:function(a){return H.G(a)},
i:["b7",function(a){return H.aq(a)}],
"%":"AnimationEffectReadOnly|Blob|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|DOMError|File|FileError|KeyframeEffect|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString"},
cZ:{"^":"d;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$iser:1},
d0:{"^":"d;",
m:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
aS:{"^":"d;",
gp:function(a){return 0},
i:["b8",function(a){return String(a)}],
$isd1:1},
dd:{"^":"aS;"},
ax:{"^":"aS;"},
ac:{"^":"aS;",
i:function(a){var z=a[$.$get$bn()]
return z==null?this.b8(a):J.K(z)},
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aa:{"^":"d;$ti",
aK:function(a,b){if(!!a.immutable$list)throw H.c(new P.H(b))},
bw:function(a,b){if(!!a.fixed$length)throw H.c(new P.H(b))},
aj:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.c(new P.N(a))}},
T:function(a,b){return new H.aW(a,b,[null,null])},
C:function(a,b){if(b<0||b>=a.length)return H.h(a,b)
return a[b]},
gbF:function(a){if(a.length>0)return a[0]
throw H.c(H.by())},
aq:function(a,b,c,d,e){var z,y,x
this.aK(a,"set range")
P.bM(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.c(H.cX())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.h(d,x)
a[b+y]=d[x]}},
i:function(a){return P.an(a,"[","]")},
gt:function(a){return new J.cz(a,a.length,0,null)},
gp:function(a){return H.G(a)},
gj:function(a){return a.length},
sj:function(a,b){this.bw(a,"set length")
if(b<0)throw H.c(P.ar(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.n(a,b))
if(b>=a.length||b<0)throw H.c(H.n(a,b))
return a[b]},
q:function(a,b,c){this.aK(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.n(a,b))
if(b>=a.length||b<0)throw H.c(H.n(a,b))
a[b]=c},
$isz:1,
$asz:I.q,
$isj:1,
$asj:null,
$isf:1,
$asf:null},
fq:{"^":"aa;$ti"},
cz:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.eU(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ab:{"^":"d;",
am:function(a,b){return a%b},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
K:function(a,b){if(typeof b!=="number")throw H.c(H.V(b))
return a+b},
N:function(a,b){return(a|0)===a?a/b|0:this.bq(a,b)},
bq:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.H("Result of truncating division is "+H.a(z)+": "+H.a(a)+" ~/ "+b))},
aG:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a4:function(a,b){if(typeof b!=="number")throw H.c(H.V(b))
return a<b},
$isa4:1},
bz:{"^":"ab;",$isa4:1,$isi:1},
d_:{"^":"ab;",$isa4:1},
ao:{"^":"d;",
K:function(a,b){if(typeof b!=="string")throw H.c(P.bh(b,null,null))
return a+b},
ar:function(a,b,c){if(c==null)c=a.length
H.es(c)
if(b<0)throw H.c(P.as(b,null,null))
if(typeof c!=="number")return H.v(c)
if(b>c)throw H.c(P.as(b,null,null))
if(c>a.length)throw H.c(P.as(c,null,null))
return a.substring(b,c)},
b6:function(a,b){return this.ar(a,b,null)},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.n(a,b))
if(b>=a.length||b<0)throw H.c(H.n(a,b))
return a[b]},
$isz:1,
$asz:I.q,
$isP:1}}],["","",,H,{"^":"",
by:function(){return new P.av("No element")},
cX:function(){return new P.av("Too few elements")},
f:{"^":"y;$ti",$asf:null},
ad:{"^":"f;$ti",
gt:function(a){return new H.bA(this,this.gj(this),0,null)},
T:function(a,b){return new H.aW(this,b,[H.I(this,"ad",0),null])},
ap:function(a,b){var z,y,x
z=H.C([],[H.I(this,"ad",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y){x=this.C(0,y)
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
aU:function(a){return this.ap(a,!0)}},
bA:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.t(z)
x=y.gj(z)
if(this.b!==x)throw H.c(new P.N(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.C(z,w);++this.c
return!0}},
bC:{"^":"y;a,b,$ti",
gt:function(a){return new H.d9(null,J.aL(this.a),this.b,this.$ti)},
gj:function(a){return J.a7(this.a)},
$asy:function(a,b){return[b]},
k:{
ap:function(a,b,c,d){if(!!J.m(a).$isf)return new H.bp(a,b,[c,d])
return new H.bC(a,b,[c,d])}}},
bp:{"^":"bC;a,b,$ti",$isf:1,
$asf:function(a,b){return[b]}},
d9:{"^":"cY;a,b,c,$ti",
l:function(){var z=this.b
if(z.l()){this.a=this.c.$1(z.gn())
return!0}this.a=null
return!1},
gn:function(){return this.a}},
aW:{"^":"ad;a,b,$ti",
gj:function(a){return J.a7(this.a)},
C:function(a,b){return this.b.$1(J.cx(this.a,b))},
$asad:function(a,b){return[b]},
$asf:function(a,b){return[b]},
$asy:function(a,b){return[b]}},
bv:{"^":"b;$ti"}}],["","",,H,{"^":"",
ag:function(a,b){var z=a.P(b)
if(!init.globalState.d.cy)init.globalState.f.V()
return z},
cq:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.m(y).$isj)throw H.c(P.aM("Arguments to main must be a List: "+H.a(y)))
init.globalState=new H.e1(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$bw()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.dH(P.aU(null,H.af),0)
x=P.i
y.z=new H.O(0,null,null,null,null,null,0,[x,H.b6])
y.ch=new H.O(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.e0()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.cQ,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.e2)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.O(0,null,null,null,null,null,0,[x,H.at])
x=P.Y(null,null,null,x)
v=new H.at(0,null,!1)
u=new H.b6(y,w,x,init.createNewIsolate(),v,new H.M(H.aK()),new H.M(H.aK()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
x.a1(0,0)
u.au(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.aD()
if(H.a3(y,[y]).G(a))u.P(new H.eS(z,a))
else if(H.a3(y,[y,y]).G(a))u.P(new H.eT(z,a))
else u.P(a)
init.globalState.f.V()},
cU:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.cV()
return},
cV:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.H("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.H('Cannot extract URI from "'+H.a(z)+'"'))},
cQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.ay(!0,[]).B(b.data)
y=J.t(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.ay(!0,[]).B(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.ay(!0,[]).B(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.i
p=new H.O(0,null,null,null,null,null,0,[q,H.at])
q=P.Y(null,null,null,q)
o=new H.at(0,null,!1)
n=new H.b6(y,p,q,init.createNewIsolate(),o,new H.M(H.aK()),new H.M(H.aK()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
q.a1(0,0)
n.au(0,o)
init.globalState.f.a.w(new H.af(n,new H.cR(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.V()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").A(y.h(z,"msg"))
init.globalState.f.V()
break
case"close":init.globalState.ch.U(0,$.$get$bx().h(0,a))
a.terminate()
init.globalState.f.V()
break
case"log":H.cP(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.X(["command","print","msg",z])
q=new H.R(!0,P.a_(null,P.i)).u(q)
y.toString
self.postMessage(q)}else P.aJ(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
cP:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.X(["command","log","msg",a])
x=new H.R(!0,P.a_(null,P.i)).u(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.B(w)
z=H.u(w)
throw H.c(P.am(z))}},
cS:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.bJ=$.bJ+("_"+y)
$.bK=$.bK+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.A(["spawned",new H.az(y,x),w,z.r])
x=new H.cT(a,b,c,d,z)
if(e===!0){z.aJ(w,w)
init.globalState.f.a.w(new H.af(z,x,"start isolate"))}else x.$0()},
ed:function(a){return new H.ay(!0,[]).B(new H.R(!1,P.a_(null,P.i)).u(a))},
eS:{"^":"e:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
eT:{"^":"e:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
e1:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",k:{
e2:function(a){var z=P.X(["command","print","msg",a])
return new H.R(!0,P.a_(null,P.i)).u(z)}}},
b6:{"^":"b;a,b,c,bR:d<,bz:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
aJ:function(a,b){if(!this.f.m(0,a))return
if(this.Q.a1(0,b)&&!this.y)this.y=!0
this.ag()},
bX:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.U(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.h(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.h(v,w)
v[w]=x
if(w===y.c)y.aB();++y.d}this.y=!1}this.ag()},
bs:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.h(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
bW:function(a){var z,y,x
if(this.ch==null)return
for(z=J.m(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.o(new P.H("removeRange"))
P.bM(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
b4:function(a,b){if(!this.r.m(0,a))return
this.db=b},
bJ:function(a,b,c){var z=J.m(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){a.A(c)
return}z=this.cx
if(z==null){z=P.aU(null,null)
this.cx=z}z.w(new H.dW(a,c))},
bI:function(a,b){var z
if(!this.r.m(0,a))return
z=J.m(b)
if(!z.m(b,0))z=z.m(b,1)&&!this.cy
else z=!0
if(z){this.ak()
return}z=this.cx
if(z==null){z=P.aU(null,null)
this.cx=z}z.w(this.gbS())},
bK:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aJ(a)
if(b!=null)P.aJ(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.K(a)
y[1]=b==null?null:J.K(b)
for(x=new P.c7(z,z.r,null,null),x.c=z.e;x.l();)x.d.A(y)},
P:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.B(u)
w=t
v=H.u(u)
this.bK(w,v)
if(this.db===!0){this.ak()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gbR()
if(this.cx!=null)for(;t=this.cx,!t.ga3(t);)this.cx.aR().$0()}return y},
aQ:function(a){return this.b.h(0,a)},
au:function(a,b){var z=this.b
if(z.aL(a))throw H.c(P.am("Registry: ports must be registered only once."))
z.q(0,a,b)},
ag:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.ak()},
ak:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.H(0)
for(z=this.b,y=z.gaW(z),y=y.gt(y);y.l();)y.gn().bd()
z.H(0)
this.c.H(0)
init.globalState.z.U(0,this.a)
this.dx.H(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.h(z,v)
w.A(z[v])}this.ch=null}},"$0","gbS",0,0,1]},
dW:{"^":"e:1;a,b",
$0:function(){this.a.A(this.b)}},
dH:{"^":"b;a,b",
bA:function(){var z=this.a
if(z.b===z.c)return
return z.aR()},
aT:function(){var z,y,x
z=this.bA()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aL(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga3(y)}else y=!1
else y=!1
else y=!1
if(y)H.o(P.am("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga3(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.X(["command","close"])
x=new H.R(!0,new P.c8(0,null,null,null,null,null,0,[null,P.i])).u(x)
y.toString
self.postMessage(x)}return!1}z.bV()
return!0},
aF:function(){if(self.window!=null)new H.dI(this).$0()
else for(;this.aT(););},
V:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.aF()
else try{this.aF()}catch(x){w=H.B(x)
z=w
y=H.u(x)
w=init.globalState.Q
v=P.X(["command","error","msg",H.a(z)+"\n"+H.a(y)])
v=new H.R(!0,P.a_(null,P.i)).u(v)
w.toString
self.postMessage(v)}}},
dI:{"^":"e:1;a",
$0:function(){if(!this.a.aT())return
P.dw(C.e,this)}},
af:{"^":"b;a,b,c",
bV:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.P(this.b)}},
e0:{"^":"b;"},
cR:{"^":"e:0;a,b,c,d,e,f",
$0:function(){H.cS(this.a,this.b,this.c,this.d,this.e,this.f)}},
cT:{"^":"e:1;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.aD()
if(H.a3(x,[x,x]).G(y))y.$2(this.b,this.c)
else if(H.a3(x,[x]).G(y))y.$1(this.b)
else y.$0()}z.ag()}},
c5:{"^":"b;"},
az:{"^":"c5;b,a",
A:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gaC())return
x=H.ed(a)
if(z.gbz()===y){y=J.t(x)
switch(y.h(x,0)){case"pause":z.aJ(y.h(x,1),y.h(x,2))
break
case"resume":z.bX(y.h(x,1))
break
case"add-ondone":z.bs(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.bW(y.h(x,1))
break
case"set-errors-fatal":z.b4(y.h(x,1),y.h(x,2))
break
case"ping":z.bJ(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.bI(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a1(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.U(0,y)
break}return}init.globalState.f.a.w(new H.af(z,new H.e3(this,x),"receive"))},
m:function(a,b){if(b==null)return!1
return b instanceof H.az&&J.J(this.b,b.b)},
gp:function(a){return this.b.ga8()}},
e3:{"^":"e:0;a,b",
$0:function(){var z=this.a.b
if(!z.gaC())z.bc(this.b)}},
b8:{"^":"c5;b,c,a",
A:function(a){var z,y,x
z=P.X(["command","message","port",this,"msg",a])
y=new H.R(!0,P.a_(null,P.i)).u(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
m:function(a,b){if(b==null)return!1
return b instanceof H.b8&&J.J(this.b,b.b)&&J.J(this.a,b.a)&&J.J(this.c,b.c)},
gp:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.b5()
y=this.a
if(typeof y!=="number")return y.b5()
x=this.c
if(typeof x!=="number")return H.v(x)
return(z<<16^y<<8^x)>>>0}},
at:{"^":"b;a8:a<,b,aC:c<",
bd:function(){this.c=!0
this.b=null},
bc:function(a){if(this.c)return
this.b.$1(a)},
$isdf:1},
ds:{"^":"b;a,b,c",
bb:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.w(new H.af(y,new H.du(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ah(new H.dv(this,b),0),a)}else throw H.c(new P.H("Timer greater than 0."))},
k:{
dt:function(a,b){var z=new H.ds(!0,!1,null)
z.bb(a,b)
return z}}},
du:{"^":"e:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
dv:{"^":"e:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
M:{"^":"b;a8:a<",
gp:function(a){var z=this.a
if(typeof z!=="number")return z.c2()
z=C.f.aG(z,0)^C.f.N(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
m:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.M){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
R:{"^":"b;a,b",
u:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gj(z))
z=J.m(a)
if(!!z.$isbD)return["buffer",a]
if(!!z.$isaZ)return["typed",a]
if(!!z.$isz)return this.b0(a)
if(!!z.$iscO){x=this.gaY()
w=a.gaP()
w=H.ap(w,x,H.I(w,"y",0),null)
w=P.aV(w,!0,H.I(w,"y",0))
z=z.gaW(a)
z=H.ap(z,x,H.I(z,"y",0),null)
return["map",w,P.aV(z,!0,H.I(z,"y",0))]}if(!!z.$isd1)return this.b1(a)
if(!!z.$isd)this.aV(a)
if(!!z.$isdf)this.W(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaz)return this.b2(a)
if(!!z.$isb8)return this.b3(a)
if(!!z.$ise){v=a.$static_name
if(v==null)this.W(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isM)return["capability",a.a]
if(!(a instanceof P.b))this.aV(a)
return["dart",init.classIdExtractor(a),this.b_(init.classFieldsExtractor(a))]},"$1","gaY",2,0,2],
W:function(a,b){throw H.c(new P.H(H.a(b==null?"Can't transmit:":b)+" "+H.a(a)))},
aV:function(a){return this.W(a,null)},
b0:function(a){var z=this.aZ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.W(a,"Can't serialize indexable: ")},
aZ:function(a){var z,y,x
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.u(a[y])
if(y>=z.length)return H.h(z,y)
z[y]=x}return z},
b_:function(a){var z
for(z=0;z<a.length;++z)C.c.q(a,z,this.u(a[z]))
return a},
b1:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.W(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.u(a[z[x]])
if(x>=y.length)return H.h(y,x)
y[x]=w}return["js-object",z,y]},
b3:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
b2:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.ga8()]
return["raw sendport",a]}},
ay:{"^":"b;a,b",
B:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.aM("Bad serialized message: "+H.a(a)))
switch(C.c.gbF(a)){case"ref":if(1>=a.length)return H.h(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.h(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.C(this.O(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return H.C(this.O(x),[null])
case"mutable":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return this.O(x)
case"const":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
y=H.C(this.O(x),[null])
y.fixed$length=Array
return y
case"map":return this.bD(a)
case"sendport":return this.bE(a)
case"raw sendport":if(1>=a.length)return H.h(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.bC(a)
case"function":if(1>=a.length)return H.h(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.h(a,1)
return new H.M(a[1])
case"dart":y=a.length
if(1>=y)return H.h(a,1)
w=a[1]
if(2>=y)return H.h(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.O(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.c("couldn't deserialize: "+H.a(a))}},"$1","gbB",2,0,2],
O:function(a){var z,y,x
z=J.t(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.v(x)
if(!(y<x))break
z.q(a,y,this.B(z.h(a,y)));++y}return a},
bD:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w=P.d7()
this.b.push(w)
y=J.cy(y,this.gbB()).aU(0)
for(z=J.t(y),v=J.t(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.h(y,u)
w.q(0,y[u],this.B(v.h(x,u)))}return w},
bE:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
if(3>=z)return H.h(a,3)
w=a[3]
if(J.J(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.aQ(w)
if(u==null)return
t=new H.az(u,x)}else t=new H.b8(y,w,x)
this.b.push(t)
return t},
bC:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.h(a,1)
y=a[1]
if(2>=z)return H.h(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.t(y)
v=J.t(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.v(t)
if(!(u<t))break
w[z.h(y,u)]=this.B(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
ex:function(a){return init.types[a]},
eL:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isE},
a:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.K(a)
if(typeof z!=="string")throw H.c(H.V(a))
return z},
G:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
b1:function(a){var z,y,x,w,v,u,t,s,r
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.m||!!J.m(a).$isax){v=C.i(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.n.b6(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cl(H.bd(a),0,null),init.mangledGlobalNames)},
aq:function(a){return"Instance of '"+H.b1(a)+"'"},
b0:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.V(a))
return a[b]},
bL:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.V(a))
a[b]=c},
v:function(a){throw H.c(H.V(a))},
h:function(a,b){if(a==null)J.a7(a)
throw H.c(H.n(a,b))},
n:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.L(!0,b,"index",null)
z=J.a7(a)
if(!(b<0)){if(typeof z!=="number")return H.v(z)
y=b>=z}else y=!0
if(y)return P.aQ(b,a,"index",null,z)
return P.as(b,"index",null)},
V:function(a){return new P.L(!0,a,null,null)},
es:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(H.V(a))
return a},
c:function(a){var z
if(a==null)a=new P.b_()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.cs})
z.name=""}else z.toString=H.cs
return z},
cs:function(){return J.K(this.dartException)},
o:function(a){throw H.c(a)},
eU:function(a){throw H.c(new P.N(a))},
B:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.eW(a)
if(a==null)return
if(a instanceof H.aP)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aG(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aT(H.a(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.a(y)+" (Error "+w+")"
return z.$1(new H.bI(v,null))}}if(a instanceof TypeError){u=$.$get$bT()
t=$.$get$bU()
s=$.$get$bV()
r=$.$get$bW()
q=$.$get$c_()
p=$.$get$c0()
o=$.$get$bY()
$.$get$bX()
n=$.$get$c2()
m=$.$get$c1()
l=u.v(y)
if(l!=null)return z.$1(H.aT(y,l))
else{l=t.v(y)
if(l!=null){l.method="call"
return z.$1(H.aT(y,l))}else{l=s.v(y)
if(l==null){l=r.v(y)
if(l==null){l=q.v(y)
if(l==null){l=p.v(y)
if(l==null){l=o.v(y)
if(l==null){l=r.v(y)
if(l==null){l=n.v(y)
if(l==null){l=m.v(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.bI(y,l==null?null:l.method))}}return z.$1(new H.dy(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.bP()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.L(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.bP()
return a},
u:function(a){var z
if(a instanceof H.aP)return a.b
if(a==null)return new H.c9(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.c9(a,null)},
eO:function(a){if(a==null||typeof a!='object')return J.ai(a)
else return H.G(a)},
et:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
eF:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ag(b,new H.eG(a))
case 1:return H.ag(b,new H.eH(a,d))
case 2:return H.ag(b,new H.eI(a,d,e))
case 3:return H.ag(b,new H.eJ(a,d,e,f))
case 4:return H.ag(b,new H.eK(a,d,e,f,g))}throw H.c(P.am("Unsupported number of arguments for wrapped closure"))},
ah:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.eF)
a.$identity=z
return z},
cG:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(c).$isj){z.$reflectionInfo=c
x=H.dh(z).r}else x=c
w=d?Object.create(new H.dq().constructor.prototype):Object.create(new H.aN(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.w
$.w=J.a5(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.bl(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.ex,x)
else if(u&&typeof x=="function"){q=t?H.bj:H.aO
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bl(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
cD:function(a,b,c,d){var z=H.aO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bl:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.cF(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.cD(y,!w,z,b)
if(y===0){w=$.w
$.w=J.a5(w,1)
u="self"+H.a(w)
w="return function(){var "+u+" = this."
v=$.W
if(v==null){v=H.ak("self")
$.W=v}return new Function(w+H.a(v)+";return "+u+"."+H.a(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.w
$.w=J.a5(w,1)
t+=H.a(w)
w="return function("+t+"){return this."
v=$.W
if(v==null){v=H.ak("self")
$.W=v}return new Function(w+H.a(v)+"."+H.a(z)+"("+t+");}")()},
cE:function(a,b,c,d){var z,y
z=H.aO
y=H.bj
switch(b?-1:a){case 0:throw H.c(new H.di("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
cF:function(a,b){var z,y,x,w,v,u,t,s
z=H.cA()
y=$.bi
if(y==null){y=H.ak("receiver")
$.bi=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.cE(w,!u,x,b)
if(w===1){y="return function(){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+");"
u=$.w
$.w=J.a5(u,1)
return new Function(y+H.a(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.a(z)+"."+H.a(x)+"(this."+H.a(y)+", "+s+");"
u=$.w
$.w=J.a5(u,1)
return new Function(y+H.a(u)+"}")()},
bb:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.m(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.cG(a,b,z,!!d,e,f)},
eQ:function(a,b){var z=J.t(b)
throw H.c(H.cC(H.b1(a),z.ar(b,3,z.gj(b))))},
eE:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.eQ(a,b)},
eV:function(a){throw H.c(new P.cH("Cyclic initialization for static "+H.a(a)))},
a3:function(a,b,c){return new H.dj(a,b,c,null)},
aD:function(){return C.k},
aK:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
cj:function(a){return init.getIsolateTag(a)},
C:function(a,b){a.$ti=b
return a},
bd:function(a){if(a==null)return
return a.$ti},
ew:function(a,b){return H.cr(a["$as"+H.a(b)],H.bd(a))},
I:function(a,b,c){var z=H.ew(a,b)
return z==null?null:z[c]},
aG:function(a,b){var z=H.bd(a)
return z==null?null:z[b]},
cp:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cl(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.b.i(a)
else return},
cl:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.b3("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.a(H.cp(u,c))}return w?"":"<"+z.i(0)+">"},
cr:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
en:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.r(a[y],b[y]))return!1
return!0},
r:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.ck(a,b)
if('func' in a)return b.builtin$cls==="fm"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.cp(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+H.a(v)]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.en(H.cr(u,z),x)},
cg:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.r(z,v)||H.r(v,z)))return!1}return!0},
em:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.r(v,u)||H.r(u,v)))return!1}return!0},
ck:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.r(z,y)||H.r(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cg(x,w,!1))return!1
if(!H.cg(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.r(o,n)||H.r(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.r(o,n)||H.r(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.r(o,n)||H.r(n,o)))return!1}}return H.em(a.named,b.named)},
h4:function(a){var z=$.be
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
h2:function(a){return H.G(a)},
h1:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
eM:function(a){var z,y,x,w,v,u
z=$.be.$1(a)
y=$.aC[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aH[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cf.$2(a,z)
if(z!=null){y=$.aC[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aH[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bg(x)
$.aC[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aH[z]=x
return x}if(v==="-"){u=H.bg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.cn(a,x)
if(v==="*")throw H.c(new P.c3(z))
if(init.leafTags[z]===true){u=H.bg(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.cn(a,x)},
cn:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aI(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bg:function(a){return J.aI(a,!1,null,!!a.$isE)},
eN:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.aI(z,!1,null,!!z.$isE)
else return J.aI(z,c,null,null)},
eC:function(){if(!0===$.bf)return
$.bf=!0
H.eD()},
eD:function(){var z,y,x,w,v,u,t,s
$.aC=Object.create(null)
$.aH=Object.create(null)
H.ey()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.co.$1(v)
if(u!=null){t=H.eN(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ey:function(){var z,y,x,w,v,u,t
z=C.r()
z=H.U(C.o,H.U(C.u,H.U(C.h,H.U(C.h,H.U(C.t,H.U(C.p,H.U(C.q(C.i),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.be=new H.ez(v)
$.cf=new H.eA(u)
$.co=new H.eB(t)},
U:function(a,b){return a(b)||b},
dg:{"^":"b;a,b,c,d,e,f,r,x",k:{
dh:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.dg(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
dx:{"^":"b;a,b,c,d,e,f",
v:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
k:{
A:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.dx(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aw:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
bZ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
bI:{"^":"p;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.a(this.a)
return"NullError: method not found: '"+H.a(z)+"' on null"}},
d3:{"^":"p;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.a(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.a(z)+"' ("+H.a(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.a(z)+"' on '"+H.a(y)+"' ("+H.a(this.a)+")"},
k:{
aT:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.d3(a,y,z?null:b.receiver)}}},
dy:{"^":"p;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
aP:{"^":"b;a,E:b<"},
eW:{"^":"e:2;a",
$1:function(a){if(!!J.m(a).$isp)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
c9:{"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
eG:{"^":"e:0;a",
$0:function(){return this.a.$0()}},
eH:{"^":"e:0;a,b",
$0:function(){return this.a.$1(this.b)}},
eI:{"^":"e:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
eJ:{"^":"e:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
eK:{"^":"e:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
e:{"^":"b;",
i:function(a){return"Closure '"+H.b1(this)+"'"},
gaX:function(){return this},
gaX:function(){return this}},
bS:{"^":"e;"},
dq:{"^":"bS;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
aN:{"^":"bS;a,b,c,d",
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.aN))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.G(this.a)
else y=typeof z!=="object"?J.ai(z):H.G(z)
z=H.G(this.b)
if(typeof y!=="number")return y.c3()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.a(this.d)+"' of "+H.aq(z)},
k:{
aO:function(a){return a.a},
bj:function(a){return a.c},
cA:function(){var z=$.W
if(z==null){z=H.ak("self")
$.W=z}return z},
ak:function(a){var z,y,x,w,v
z=new H.aN("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
cB:{"^":"p;a",
i:function(a){return this.a},
k:{
cC:function(a,b){return new H.cB("CastError: Casting value of type "+H.a(a)+" to incompatible type "+H.a(b))}}},
di:{"^":"p;a",
i:function(a){return"RuntimeError: "+H.a(this.a)}},
bO:{"^":"b;"},
dj:{"^":"bO;a,b,c,d",
G:function(a){var z=this.bj(a)
return z==null?!1:H.ck(z,this.J())},
bj:function(a){var z=J.m(a)
return"$signature" in z?z.$signature():null},
J:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.m(y)
if(!!x.$isfQ)z.v=true
else if(!x.$isbo)z.ret=y.J()
y=this.b
if(y!=null&&y.length!==0)z.args=H.bN(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.bN(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.ci(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].J()}z.named=w}return z},
i:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.a(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.ci(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.a(z[s].J())+" "+s}x+="}"}}return x+(") -> "+H.a(this.a))},
k:{
bN:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].J())
return z}}},
bo:{"^":"bO;",
i:function(a){return"dynamic"},
J:function(){return}},
O:{"^":"b;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
ga3:function(a){return this.a===0},
gaP:function(){return new H.d5(this,[H.aG(this,0)])},
gaW:function(a){return H.ap(this.gaP(),new H.d2(this),H.aG(this,0),H.aG(this,1))},
aL:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.bg(z,a)}else return this.bO(a)},
bO:function(a){var z=this.d
if(z==null)return!1
return this.S(this.a_(z,this.R(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.M(z,b)
return y==null?null:y.gD()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.M(x,b)
return y==null?null:y.gD()}else return this.bP(b)},
bP:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a_(z,this.R(a))
x=this.S(y,a)
if(x<0)return
return y[x].gD()},
q:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.aa()
this.b=z}this.as(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aa()
this.c=y}this.as(y,b,c)}else{x=this.d
if(x==null){x=this.aa()
this.d=x}w=this.R(b)
v=this.a_(x,w)
if(v==null)this.ae(x,w,[this.ab(b,c)])
else{u=this.S(v,b)
if(u>=0)v[u].sD(c)
else v.push(this.ab(b,c))}}},
U:function(a,b){if(typeof b==="string")return this.aE(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aE(this.c,b)
else return this.bQ(b)},
bQ:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a_(z,this.R(a))
x=this.S(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.aI(w)
return w.gD()},
H:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aj:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.N(this))
z=z.c}},
as:function(a,b,c){var z=this.M(a,b)
if(z==null)this.ae(a,b,this.ab(b,c))
else z.sD(c)},
aE:function(a,b){var z
if(a==null)return
z=this.M(a,b)
if(z==null)return
this.aI(z)
this.az(a,b)
return z.gD()},
ab:function(a,b){var z,y
z=new H.d4(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aI:function(a){var z,y
z=a.gbm()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
R:function(a){return J.ai(a)&0x3ffffff},
S:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.J(a[y].gaO(),b))return y
return-1},
i:function(a){return P.da(this)},
M:function(a,b){return a[b]},
a_:function(a,b){return a[b]},
ae:function(a,b,c){a[b]=c},
az:function(a,b){delete a[b]},
bg:function(a,b){return this.M(a,b)!=null},
aa:function(){var z=Object.create(null)
this.ae(z,"<non-identifier-key>",z)
this.az(z,"<non-identifier-key>")
return z},
$iscO:1},
d2:{"^":"e:2;a",
$1:function(a){return this.a.h(0,a)}},
d4:{"^":"b;aO:a<,D:b@,c,bm:d<"},
d5:{"^":"f;a,$ti",
gj:function(a){return this.a.a},
gt:function(a){var z,y
z=this.a
y=new H.d6(z,z.r,null,null)
y.c=z.e
return y}},
d6:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ez:{"^":"e:2;a",
$1:function(a){return this.a(a)}},
eA:{"^":"e:5;a",
$2:function(a,b){return this.a(a,b)}},
eB:{"^":"e:6;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
ci:function(a){var z=H.C(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
eP:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",bD:{"^":"d;",$isbD:1,"%":"ArrayBuffer"},aZ:{"^":"d;",$isaZ:1,"%":"DataView;ArrayBufferView;aX|bE|bG|aY|bF|bH|F"},aX:{"^":"aZ;",
gj:function(a){return a.length},
$isE:1,
$asE:I.q,
$isz:1,
$asz:I.q},aY:{"^":"bG;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
a[b]=c}},bE:{"^":"aX+bB;",$asE:I.q,$asz:I.q,
$asj:function(){return[P.D]},
$asf:function(){return[P.D]},
$isj:1,
$isf:1},bG:{"^":"bE+bv;",$asE:I.q,$asz:I.q,
$asj:function(){return[P.D]},
$asf:function(){return[P.D]}},F:{"^":"bH;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]}},bF:{"^":"aX+bB;",$asE:I.q,$asz:I.q,
$asj:function(){return[P.i]},
$asf:function(){return[P.i]},
$isj:1,
$isf:1},bH:{"^":"bF+bv;",$asE:I.q,$asz:I.q,
$asj:function(){return[P.i]},
$asf:function(){return[P.i]}},fv:{"^":"aY;",$isj:1,
$asj:function(){return[P.D]},
$isf:1,
$asf:function(){return[P.D]},
"%":"Float32Array"},fw:{"^":"aY;",$isj:1,
$asj:function(){return[P.D]},
$isf:1,
$asf:function(){return[P.D]},
"%":"Float64Array"},fx:{"^":"F;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Int16Array"},fy:{"^":"F;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Int32Array"},fz:{"^":"F;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Int8Array"},fA:{"^":"F;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Uint16Array"},fB:{"^":"F;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"Uint32Array"},fC:{"^":"F;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":"CanvasPixelArray|Uint8ClampedArray"},fD:{"^":"F;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.o(H.n(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.i]},
$isf:1,
$asf:function(){return[P.i]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
dB:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.eo()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ah(new P.dD(z),1)).observe(y,{childList:true})
return new P.dC(z,y,x)}else if(self.setImmediate!=null)return P.ep()
return P.eq()},
fR:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ah(new P.dE(a),0))},"$1","eo",2,0,3],
fS:[function(a){++init.globalState.f.b
self.setImmediate(H.ah(new P.dF(a),0))},"$1","ep",2,0,3],
fT:[function(a){P.b4(C.e,a)},"$1","eq",2,0,3],
S:function(a,b,c){if(b===0){J.cw(c,a)
return}else if(b===1){c.bx(H.B(a),H.u(a))
return}P.ea(a,b)
return c.gbG()},
ea:function(a,b){var z,y,x,w
z=new P.eb(b)
y=new P.ec(b)
x=J.m(a)
if(!!x.$isQ)a.af(z,y)
else if(!!x.$isa8)a.ao(z,y)
else{w=new P.Q(0,$.l,null,[null])
w.a=4
w.c=a
w.af(z,null)}},
ce:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.l.toString
return new P.ek(z)},
eg:function(a,b){var z=H.aD()
if(H.a3(z,[z,z]).G(a)){b.toString
return a}else{b.toString
return a}},
bm:function(a){return new P.ca(new P.Q(0,$.l,null,[a]),[a])},
ef:function(){var z,y
for(;z=$.T,z!=null;){$.a1=null
y=z.b
$.T=y
if(y==null)$.a0=null
z.a.$0()}},
h0:[function(){$.b9=!0
try{P.ef()}finally{$.a1=null
$.b9=!1
if($.T!=null)$.$get$b5().$1(P.ch())}},"$0","ch",0,0,1],
cd:function(a){var z=new P.c4(a,null)
if($.T==null){$.a0=z
$.T=z
if(!$.b9)$.$get$b5().$1(P.ch())}else{$.a0.b=z
$.a0=z}},
ej:function(a){var z,y,x
z=$.T
if(z==null){P.cd(a)
$.a1=$.a0
return}y=new P.c4(a,null)
x=$.a1
if(x==null){y.b=z
$.a1=y
$.T=y}else{y.b=x.b
x.b=y
$.a1=y
if(y.b==null)$.a0=y}},
eR:function(a){var z=$.l
if(C.a===z){P.aB(null,null,C.a,a)
return}z.toString
P.aB(null,null,z,z.ah(a,!0))},
fK:function(a,b){return new P.e8(null,a,!1,[b])},
dw:function(a,b){var z=$.l
if(z===C.a){z.toString
return P.b4(a,b)}return P.b4(a,z.ah(b,!0))},
b4:function(a,b){var z=C.b.N(a.a,1000)
return H.dt(z<0?0:z,b)},
aA:function(a,b,c,d,e){var z={}
z.a=d
P.ej(new P.eh(z,e))},
cb:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
cc:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
ei:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
aB:function(a,b,c,d){var z=C.a!==c
if(z)d=c.ah(d,!(!z||!1))
P.cd(d)},
dD:{"^":"e:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
dC:{"^":"e:7;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
dE:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
dF:{"^":"e:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
eb:{"^":"e:2;a",
$1:function(a){return this.a.$2(0,a)}},
ec:{"^":"e:8;a",
$2:function(a,b){this.a.$2(1,new H.aP(a,b))}},
ek:{"^":"e:9;a",
$2:function(a,b){this.a(a,b)}},
a8:{"^":"b;$ti"},
dG:{"^":"b;bG:a<,$ti",
bx:function(a,b){a=a!=null?a:new P.b_()
if(this.a.a!==0)throw H.c(new P.av("Future already completed"))
$.l.toString
this.L(a,b)}},
ca:{"^":"dG;a,$ti",
ai:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.av("Future already completed"))
z.ay(b)},
L:function(a,b){this.a.L(a,b)}},
dK:{"^":"b;ac:a<,b,c,d,e",
gbr:function(){return this.b.b},
gaN:function(){return(this.c&1)!==0},
gbN:function(){return(this.c&2)!==0},
gaM:function(){return this.c===8},
bL:function(a){return this.b.b.an(this.d,a)},
bT:function(a){if(this.c!==6)return!0
return this.b.b.an(this.d,J.a6(a))},
bH:function(a){var z,y,x,w
z=this.e
y=H.aD()
x=J.aE(a)
w=this.b.b
if(H.a3(y,[y,y]).G(z))return w.bY(z,x.gI(a),a.gE())
else return w.an(z,x.gI(a))},
bM:function(){return this.b.b.aS(this.d)}},
Q:{"^":"b;aH:a<,b,bp:c<,$ti",
gbk:function(){return this.a===2},
ga9:function(){return this.a>=4},
ao:function(a,b){var z=$.l
if(z!==C.a){z.toString
if(b!=null)b=P.eg(b,z)}return this.af(a,b)},
c0:function(a){return this.ao(a,null)},
af:function(a,b){var z=new P.Q(0,$.l,null,[null])
this.at(new P.dK(null,z,b==null?1:3,a,b))
return z},
at:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.ga9()){y.at(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aB(null,null,z,new P.dL(this,a))}},
aD:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gac()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.ga9()){v.aD(a)
return}this.a=v.a
this.c=v.c}z.a=this.a0(a)
y=this.b
y.toString
P.aB(null,null,y,new P.dQ(z,this))}},
ad:function(){var z=this.c
this.c=null
return this.a0(z)},
a0:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gac()
z.a=y}return y},
ay:function(a){var z
if(!!J.m(a).$isa8)P.c6(a,this)
else{z=this.ad()
this.a=4
this.c=a
P.Z(this,z)}},
L:function(a,b){var z=this.ad()
this.a=8
this.c=new P.aj(a,b)
P.Z(this,z)},
$isa8:1,
k:{
dM:function(a,b){var z,y,x,w
b.a=1
try{a.ao(new P.dN(b),new P.dO(b))}catch(x){w=H.B(x)
z=w
y=H.u(x)
P.eR(new P.dP(b,z,y))}},
c6:function(a,b){var z,y,x
for(;a.gbk();)a=a.c
z=a.ga9()
y=b.c
if(z){b.c=null
x=b.a0(y)
b.a=a.a
b.c=a.c
P.Z(b,x)}else{b.a=2
b.c=a
a.aD(y)}},
Z:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.a6(v)
x=v.gE()
z.toString
P.aA(null,null,z,y,x)}return}for(;b.gac()!=null;b=u){u=b.a
b.a=null
P.Z(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gaN()||b.gaM()){s=b.gbr()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.a6(v)
r=v.gE()
y.toString
P.aA(null,null,y,x,r)
return}q=$.l
if(q==null?s!=null:q!==s)$.l=s
else q=null
if(b.gaM())new P.dT(z,x,w,b).$0()
else if(y){if(b.gaN())new P.dS(x,b,t).$0()}else if(b.gbN())new P.dR(z,x,b).$0()
if(q!=null)$.l=q
y=x.b
r=J.m(y)
if(!!r.$isa8){p=b.b
if(!!r.$isQ)if(y.a>=4){o=p.c
p.c=null
b=p.a0(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.c6(y,p)
else P.dM(y,p)
return}}p=b.b
b=p.ad()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
dL:{"^":"e:0;a,b",
$0:function(){P.Z(this.a,this.b)}},
dQ:{"^":"e:0;a,b",
$0:function(){P.Z(this.b,this.a.a)}},
dN:{"^":"e:2;a",
$1:function(a){var z=this.a
z.a=0
z.ay(a)}},
dO:{"^":"e:10;a",
$2:function(a,b){this.a.L(a,b)},
$1:function(a){return this.$2(a,null)}},
dP:{"^":"e:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
dT:{"^":"e:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.bM()}catch(w){v=H.B(w)
y=v
x=H.u(w)
if(this.c){v=J.a6(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.aj(y,x)
u.a=!0
return}if(!!J.m(z).$isa8){if(z instanceof P.Q&&z.gaH()>=4){if(z.gaH()===8){v=this.b
v.b=z.gbp()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.c0(new P.dU(t))
v.a=!1}}},
dU:{"^":"e:2;a",
$1:function(a){return this.a}},
dS:{"^":"e:1;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.bL(this.c)}catch(x){w=H.B(x)
z=w
y=H.u(x)
w=this.a
w.b=new P.aj(z,y)
w.a=!0}}},
dR:{"^":"e:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.bT(z)===!0&&w.e!=null){v=this.b
v.b=w.bH(z)
v.a=!1}}catch(u){w=H.B(u)
y=w
x=H.u(u)
w=this.a
v=J.a6(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.aj(y,x)
s.a=!0}}},
c4:{"^":"b;a,b"},
fV:{"^":"b;"},
fU:{"^":"b;"},
e8:{"^":"b;a,b,c,$ti"},
aj:{"^":"b;I:a>,E:b<",
i:function(a){return H.a(this.a)},
$isp:1},
e9:{"^":"b;"},
eh:{"^":"e:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.b_()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=J.K(y)
throw x}},
e4:{"^":"e9;",
bZ:function(a){var z,y,x,w
try{if(C.a===$.l){x=a.$0()
return x}x=P.cb(null,null,this,a)
return x}catch(w){x=H.B(w)
z=x
y=H.u(w)
return P.aA(null,null,this,z,y)}},
c_:function(a,b){var z,y,x,w
try{if(C.a===$.l){x=a.$1(b)
return x}x=P.cc(null,null,this,a,b)
return x}catch(w){x=H.B(w)
z=x
y=H.u(w)
return P.aA(null,null,this,z,y)}},
ah:function(a,b){if(b)return new P.e5(this,a)
else return new P.e6(this,a)},
bv:function(a,b){return new P.e7(this,a)},
h:function(a,b){return},
aS:function(a){if($.l===C.a)return a.$0()
return P.cb(null,null,this,a)},
an:function(a,b){if($.l===C.a)return a.$1(b)
return P.cc(null,null,this,a,b)},
bY:function(a,b,c){if($.l===C.a)return a.$2(b,c)
return P.ei(null,null,this,a,b,c)}},
e5:{"^":"e:0;a,b",
$0:function(){return this.a.bZ(this.b)}},
e6:{"^":"e:0;a,b",
$0:function(){return this.a.aS(this.b)}},
e7:{"^":"e:2;a,b",
$1:function(a){return this.a.c_(this.b,a)}}}],["","",,P,{"^":"",
d7:function(){return new H.O(0,null,null,null,null,null,0,[null,null])},
X:function(a){return H.et(a,new H.O(0,null,null,null,null,null,0,[null,null]))},
cW:function(a,b,c){var z,y
if(P.ba(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$a2()
y.push(a)
try{P.ee(a,z)}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=P.bR(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
an:function(a,b,c){var z,y,x
if(P.ba(a))return b+"..."+c
z=new P.b3(b)
y=$.$get$a2()
y.push(a)
try{x=z
x.a=P.bR(x.gF(),a,", ")}finally{if(0>=y.length)return H.h(y,-1)
y.pop()}y=z
y.a=y.gF()+c
y=z.gF()
return y.charCodeAt(0)==0?y:y},
ba:function(a){var z,y
for(z=0;y=$.$get$a2(),z<y.length;++z)if(a===y[z])return!0
return!1},
ee:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gt(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.a(z.gn())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
if(0>=b.length)return H.h(b,-1)
v=b.pop()
if(0>=b.length)return H.h(b,-1)
u=b.pop()}else{t=z.gn();++x
if(!z.l()){if(x<=4){b.push(H.a(t))
return}v=H.a(t)
if(0>=b.length)return H.h(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gn();++x
for(;z.l();t=s,s=r){r=z.gn();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.a(t)
v=H.a(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.h(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
Y:function(a,b,c,d){return new P.dY(0,null,null,null,null,null,0,[d])},
da:function(a){var z,y,x
z={}
if(P.ba(a))return"{...}"
y=new P.b3("")
try{$.$get$a2().push(a)
x=y
x.a=x.gF()+"{"
z.a=!0
a.aj(0,new P.db(z,y))
z=y
z.a=z.gF()+"}"}finally{z=$.$get$a2()
if(0>=z.length)return H.h(z,-1)
z.pop()}z=y.gF()
return z.charCodeAt(0)==0?z:z},
c8:{"^":"O;a,b,c,d,e,f,r,$ti",
R:function(a){return H.eO(a)&0x3ffffff},
S:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gaO()
if(x==null?b==null:x===b)return y}return-1},
k:{
a_:function(a,b){return new P.c8(0,null,null,null,null,null,0,[a,b])}}},
dY:{"^":"dV;a,b,c,d,e,f,r,$ti",
gt:function(a){var z=new P.c7(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
by:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.bf(b)},
bf:function(a){var z=this.d
if(z==null)return!1
return this.Z(z[this.Y(a)],a)>=0},
aQ:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.by(0,a)?a:null
else return this.bl(a)},
bl:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.Y(a)]
x=this.Z(y,a)
if(x<0)return
return J.cu(y,x).gaA()},
a1:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.b7()
this.b=z}return this.av(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.b7()
this.c=y}return this.av(y,b)}else return this.w(b)},
w:function(a){var z,y,x
z=this.d
if(z==null){z=P.b7()
this.d=z}y=this.Y(a)
x=z[y]
if(x==null)z[y]=[this.a5(a)]
else{if(this.Z(x,a)>=0)return!1
x.push(this.a5(a))}return!0},
U:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aw(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aw(this.c,b)
else return this.bn(b)},
bn:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.Y(a)]
x=this.Z(y,a)
if(x<0)return!1
this.ax(y.splice(x,1)[0])
return!0},
H:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
av:function(a,b){if(a[b]!=null)return!1
a[b]=this.a5(b)
return!0},
aw:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ax(z)
delete a[b]
return!0},
a5:function(a){var z,y
z=new P.dZ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ax:function(a){var z,y
z=a.gbe()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
Y:function(a){return J.ai(a)&0x3ffffff},
Z:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.J(a[y].gaA(),b))return y
return-1},
$isf:1,
$asf:null,
k:{
b7:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
dZ:{"^":"b;aA:a<,b,be:c<"},
c7:{"^":"b;a,b,c,d",
gn:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
dV:{"^":"dk;$ti"},
bB:{"^":"b;$ti",
gt:function(a){return new H.bA(a,this.gj(a),0,null)},
C:function(a,b){return this.h(a,b)},
T:function(a,b){return new H.aW(a,b,[null,null])},
i:function(a){return P.an(a,"[","]")},
$isj:1,
$asj:null,
$isf:1,
$asf:null},
db:{"^":"e:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.a(a)
z.a=y+": "
z.a+=H.a(b)}},
d8:{"^":"ad;a,b,c,d,$ti",
gt:function(a){return new P.e_(this,this.c,this.d,this.b,null)},
ga3:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
C:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.o(P.aQ(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.h(y,w)
return y[w]},
H:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.h(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.an(this,"{","}")},
aR:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.c(H.by());++this.d
y=this.a
x=y.length
if(z>=x)return H.h(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
w:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.h(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.aB();++this.d},
aB:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.C(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.aq(y,0,w,z,x)
C.c.aq(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
b9:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.C(z,[b])},
$asf:null,
k:{
aU:function(a,b){var z=new P.d8(null,0,0,0,[b])
z.b9(a,b)
return z}}},
e_:{"^":"b;a,b,c,d,e",
gn:function(){return this.e},
l:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.o(new P.N(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.h(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
dl:{"^":"b;$ti",
T:function(a,b){return new H.bp(this,b,[H.aG(this,0),null])},
i:function(a){return P.an(this,"{","}")},
$isf:1,
$asf:null},
dk:{"^":"dl;$ti"}}],["","",,P,{"^":"",
br:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.K(a)
if(typeof a==="string")return JSON.stringify(a)
return P.cL(a)},
cL:function(a){var z=J.m(a)
if(!!z.$ise)return z.i(a)
return H.aq(a)},
am:function(a){return new P.dJ(a)},
aV:function(a,b,c){var z,y
z=H.C([],[c])
for(y=J.aL(a);y.l();)z.push(y.gn())
return z},
aJ:function(a){var z=H.a(a)
H.eP(z)},
er:{"^":"b;"},
"+bool":0,
f1:{"^":"b;"},
D:{"^":"a4;"},
"+double":0,
al:{"^":"b;a",
K:function(a,b){return new P.al(C.b.K(this.a,b.gbh()))},
a4:function(a,b){return C.b.a4(this.a,b.gbh())},
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.al))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.cJ()
y=this.a
if(y<0)return"-"+new P.al(-y).i(0)
x=z.$1(C.b.am(C.b.N(y,6e7),60))
w=z.$1(C.b.am(C.b.N(y,1e6),60))
v=new P.cI().$1(C.b.am(y,1e6))
return""+C.b.N(y,36e8)+":"+H.a(x)+":"+H.a(w)+"."+H.a(v)}},
cI:{"^":"e:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
cJ:{"^":"e:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
p:{"^":"b;",
gE:function(){return H.u(this.$thrownJsError)}},
b_:{"^":"p;",
i:function(a){return"Throw of null."}},
L:{"^":"p;a,b,c,d",
ga7:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ga6:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.a(z)+")":""
z=this.d
x=z==null?"":": "+H.a(z)
w=this.ga7()+y+x
if(!this.a)return w
v=this.ga6()
u=P.br(this.b)
return w+v+": "+H.a(u)},
k:{
aM:function(a){return new P.L(!1,null,null,a)},
bh:function(a,b,c){return new P.L(!0,a,b,c)}}},
b2:{"^":"L;e,f,a,b,c,d",
ga7:function(){return"RangeError"},
ga6:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.a(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.a(z)
else{if(typeof x!=="number")return x.c1()
if(typeof z!=="number")return H.v(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
k:{
de:function(a){return new P.b2(null,null,!1,null,null,a)},
as:function(a,b,c){return new P.b2(null,null,!0,a,b,"Value not in range")},
ar:function(a,b,c,d,e){return new P.b2(b,c,!0,a,d,"Invalid value")},
bM:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.ar(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.ar(b,a,c,"end",f))
return b}}},
cN:{"^":"L;e,j:f>,a,b,c,d",
ga7:function(){return"RangeError"},
ga6:function(){if(J.ct(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.a(z)},
k:{
aQ:function(a,b,c,d,e){var z=e!=null?e:J.a7(b)
return new P.cN(b,z,!0,a,c,"Index out of range")}}},
H:{"^":"p;a",
i:function(a){return"Unsupported operation: "+this.a}},
c3:{"^":"p;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.a(z):"UnimplementedError"}},
av:{"^":"p;a",
i:function(a){return"Bad state: "+this.a}},
N:{"^":"p;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.a(P.br(z))+"."}},
bP:{"^":"b;",
i:function(a){return"Stack Overflow"},
gE:function(){return},
$isp:1},
cH:{"^":"p;a",
i:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
dJ:{"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.a(z)}},
cM:{"^":"b;a,b",
i:function(a){return"Expando:"+H.a(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.o(P.bh(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.b0(b,"expando$values")
return y==null?null:H.b0(y,z)},
q:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.b0(b,"expando$values")
if(y==null){y=new P.b()
H.bL(b,"expando$values",y)}H.bL(y,z,c)}}},
i:{"^":"a4;"},
"+int":0,
y:{"^":"b;$ti",
T:function(a,b){return H.ap(this,b,H.I(this,"y",0),null)},
ap:function(a,b){return P.aV(this,!0,H.I(this,"y",0))},
aU:function(a){return this.ap(a,!0)},
gj:function(a){var z,y
z=this.gt(this)
for(y=0;z.l();)++y
return y},
C:function(a,b){var z,y,x
if(b<0)H.o(P.ar(b,0,null,"index",null))
for(z=this.gt(this),y=0;z.l();){x=z.gn()
if(b===y)return x;++y}throw H.c(P.aQ(b,this,"index",null,y))},
i:function(a){return P.cW(this,"(",")")}},
cY:{"^":"b;"},
j:{"^":"b;$ti",$asj:null,$isf:1,$asf:null},
"+List":0,
fF:{"^":"b;",
i:function(a){return"null"}},
"+Null":0,
a4:{"^":"b;"},
"+num":0,
b:{"^":";",
m:function(a,b){return this===b},
gp:function(a){return H.G(this)},
i:function(a){return H.aq(this)},
toString:function(){return this.i(this)}},
bQ:{"^":"b;"},
P:{"^":"b;"},
"+String":0,
b3:{"^":"b;F:a<",
gj:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
k:{
bR:function(a,b,c){var z=J.aL(b)
if(!z.l())return a
if(c.length===0){do a+=H.a(z.gn())
while(z.l())}else{a+=H.a(z.gn())
for(;z.l();)a=a+c+H.a(z.gn())}return a}}}}],["","",,W,{"^":"",
el:function(a){var z=$.l
if(z===C.a)return a
return z.bv(a,!0)},
x:{"^":"bq;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
eY:{"^":"x;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAnchorElement"},
f_:{"^":"x;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAreaElement"},
f0:{"^":"x;",$isd:1,"%":"HTMLBodyElement"},
bk:{"^":"x;",$isbk:1,"%":"HTMLCanvasElement"},
f2:{"^":"d;",
i:function(a){return String(a)},
"%":"DOMException"},
bq:{"^":"dc;",
bt:function(a,b,c){throw H.c(P.aM("The frames parameter should be a List of Maps with frame information"))},
a2:function(a,b){return this.bt(a,b,null)},
i:function(a){return a.localName},
$isd:1,
"%":";Element"},
f3:{"^":"bs;I:error=","%":"ErrorEvent"},
bs:{"^":"d;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CompositionEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ExtendableEvent|FetchEvent|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PointerEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
bt:{"^":"d;","%":"Animation|MediaStream;EventTarget"},
fl:{"^":"x;j:length=","%":"HTMLFormElement"},
fn:{"^":"x;",
ai:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
fp:{"^":"x;",$isd:1,"%":"HTMLInputElement"},
fu:{"^":"x;I:error=","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
fE:{"^":"d;",$isd:1,"%":"Navigator"},
dc:{"^":"bt;",
i:function(a){var z=a.nodeValue
return z==null?this.b7(a):z},
"%":"Document|HTMLDocument;Node"},
fI:{"^":"x;j:length=","%":"HTMLSelectElement"},
fJ:{"^":"bs;I:error=","%":"SpeechRecognitionError"},
dz:{"^":"bt;",
gbu:function(a){var z,y
z=P.a4
y=new P.Q(0,$.l,null,[z])
this.bi(a)
this.bo(a,W.el(new W.dA(new P.ca(y,[z]))))
return y},
bo:function(a,b){return a.requestAnimationFrame(H.ah(b,1))},
bi:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isd:1,
"%":"DOMWindow|Window"},
dA:{"^":"e:2;a",
$1:function(a){this.a.ai(0,a)}},
fX:{"^":"x;",$isd:1,"%":"HTMLFrameSetElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",dX:{"^":"b;",
bU:function(a){if(a<=0||a>4294967296)throw H.c(P.de("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
al:function(){return Math.random()}}}],["","",,P,{"^":"",eX:{"^":"a9;",$isd:1,"%":"SVGAElement"},eZ:{"^":"k;",$isd:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},f4:{"^":"k;",$isd:1,"%":"SVGFEBlendElement"},f5:{"^":"k;",$isd:1,"%":"SVGFEColorMatrixElement"},f6:{"^":"k;",$isd:1,"%":"SVGFEComponentTransferElement"},f7:{"^":"k;",$isd:1,"%":"SVGFECompositeElement"},f8:{"^":"k;",$isd:1,"%":"SVGFEConvolveMatrixElement"},f9:{"^":"k;",$isd:1,"%":"SVGFEDiffuseLightingElement"},fa:{"^":"k;",$isd:1,"%":"SVGFEDisplacementMapElement"},fb:{"^":"k;",$isd:1,"%":"SVGFEFloodElement"},fc:{"^":"k;",$isd:1,"%":"SVGFEGaussianBlurElement"},fd:{"^":"k;",$isd:1,"%":"SVGFEImageElement"},fe:{"^":"k;",$isd:1,"%":"SVGFEMergeElement"},ff:{"^":"k;",$isd:1,"%":"SVGFEMorphologyElement"},fg:{"^":"k;",$isd:1,"%":"SVGFEOffsetElement"},fh:{"^":"k;",$isd:1,"%":"SVGFESpecularLightingElement"},fi:{"^":"k;",$isd:1,"%":"SVGFETileElement"},fj:{"^":"k;",$isd:1,"%":"SVGFETurbulenceElement"},fk:{"^":"k;",$isd:1,"%":"SVGFilterElement"},a9:{"^":"k;",$isd:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},fo:{"^":"a9;",$isd:1,"%":"SVGImageElement"},fs:{"^":"k;",$isd:1,"%":"SVGMarkerElement"},ft:{"^":"k;",$isd:1,"%":"SVGMaskElement"},fG:{"^":"k;",$isd:1,"%":"SVGPatternElement"},fH:{"^":"k;",$isd:1,"%":"SVGScriptElement"},k:{"^":"bq;",$isd:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},fL:{"^":"a9;",$isd:1,"%":"SVGSVGElement"},fM:{"^":"k;",$isd:1,"%":"SVGSymbolElement"},dr:{"^":"a9;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},fN:{"^":"dr;",$isd:1,"%":"SVGTextPathElement"},fO:{"^":"a9;",$isd:1,"%":"SVGUseElement"},fP:{"^":"k;",$isd:1,"%":"SVGViewElement"},fW:{"^":"k;",$isd:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},fY:{"^":"k;",$isd:1,"%":"SVGCursorElement"},fZ:{"^":"k;",$isd:1,"%":"SVGFEDropShadowElement"},h_:{"^":"k;",$isd:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,F,{"^":"",
h3:[function(){F.dn("snowstorm",new F.cK(!0,0.5),100).X(0)
P.aJ("Animation started!")},"$0","cm",0,0,1],
cK:{"^":"b;a,b"},
au:{"^":"b;a,b,c,d",
a2:function(a,b){var z=0,y=new P.bm(),x,w=2,v,u=this,t,s,r,q,p
var $async$a2=P.ce(function(c,d){if(c===1){v=d
z=w}while(true)switch(z){case 0:b.toString
t=b.getContext("2d")
t.beginPath()
s=u.d
t.arc(u.a,u.b,s,0,6.283185307179586,!1)
t.fillStyle="rgba(255, 255, 255, 0.4)"
t.fill("nonzero")
r=u.a
q=u.c
p=s*q.b
if(typeof r!=="number"){x=r.K()
z=1
break}r+=p
u.a=r
u.b=u.b+s/2
q.a
s=r+(1-$.$get$ae().al()+0.5)
u.a=s
r=b.width
if(typeof r!=="number"){x=H.v(r)
z=1
break}if(s>r&&p>0){u.a=0
s=0}if(s<0&&p<0)u.a=b.width
s=u.b
r=b.height
if(typeof r!=="number"){x=H.v(r)
z=1
break}if(s>r)u.b=0
case 1:return P.S(x,0,y)
case 2:return P.S(v,1,y)}})
return P.S(null,$async$a2,y)}},
dm:{"^":"b;a,b,c,d,e",
X:function(a){var z=0,y=new P.bm(),x=1,w,v=this,u,t
var $async$X=P.ce(function(b,c){if(b===1){w=c
z=x}while(true)switch(z){case 0:case 2:if(!!0){z=3
break}u=v.c
u.toString
u=u.getContext("2d")
t=v.c
u.clearRect(0,0,t.width,t.height)
t=v.d;(t&&C.c).aj(t,new F.dp(v))
z=4
return P.S(C.w.gbu(window),$async$X,y)
case 4:z=2
break
case 3:return P.S(null,0,y)
case 1:return P.S(w,1,y)}})
return P.S(null,$async$X,y)},
ba:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.eE(document.getElementById(a),"$isbk")
this.c=z
z.toString
z=z.getContext("2d")
z.fillStyle="transparent"
z.fillStyle="rgba(0, 0, 0, 1)"
y=this.c
z.fillRect(0,0,y.width,y.height)
this.d=H.C([],[F.au])
z=this.b
if(typeof z!=="number")return H.v(z)
y=this.a
x=0
for(;x<z;++x){w=$.$get$ae().al()
v=this.c.width
if(typeof v!=="number")return H.v(v)
u=$.$get$ae().al()
t=this.c.height
if(typeof t!=="number")return H.v(t)
s=$.$get$ae().bU(6)
this.d.push(new F.au(w*v,u*t,y,s+1))}},
k:{
dn:function(a,b,c){var z=new F.dm(b,c,null,null,!0)
z.ba(a,b,c)
return z}}},
dp:{"^":"e:12;a",
$1:function(a){return J.cv(a,this.a.c)}}},1]]
setupProgram(dart,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bz.prototype
return J.d_.prototype}if(typeof a=="string")return J.ao.prototype
if(a==null)return J.d0.prototype
if(typeof a=="boolean")return J.cZ.prototype
if(a.constructor==Array)return J.aa.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.b)return a
return J.aF(a)}
J.t=function(a){if(typeof a=="string")return J.ao.prototype
if(a==null)return a
if(a.constructor==Array)return J.aa.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.b)return a
return J.aF(a)}
J.bc=function(a){if(a==null)return a
if(a.constructor==Array)return J.aa.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.b)return a
return J.aF(a)}
J.eu=function(a){if(typeof a=="number")return J.ab.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.ax.prototype
return a}
J.ev=function(a){if(typeof a=="number")return J.ab.prototype
if(typeof a=="string")return J.ao.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.ax.prototype
return a}
J.aE=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ac.prototype
return a}if(a instanceof P.b)return a
return J.aF(a)}
J.a5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ev(a).K(a,b)}
J.J=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.m(a).m(a,b)}
J.ct=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.eu(a).a4(a,b)}
J.cu=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eL(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.t(a).h(a,b)}
J.cv=function(a,b){return J.aE(a).a2(a,b)}
J.cw=function(a,b){return J.aE(a).ai(a,b)}
J.cx=function(a,b){return J.bc(a).C(a,b)}
J.a6=function(a){return J.aE(a).gI(a)}
J.ai=function(a){return J.m(a).gp(a)}
J.aL=function(a){return J.bc(a).gt(a)}
J.a7=function(a){return J.t(a).gj(a)}
J.cy=function(a,b){return J.bc(a).T(a,b)}
J.K=function(a){return J.m(a).i(a)}
var $=I.p
C.m=J.d.prototype
C.c=J.aa.prototype
C.b=J.bz.prototype
C.f=J.ab.prototype
C.n=J.ao.prototype
C.v=J.ac.prototype
C.j=J.dd.prototype
C.d=J.ax.prototype
C.w=W.dz.prototype
C.k=new H.bo()
C.l=new P.dX()
C.a=new P.e4()
C.e=new P.al(0)
C.o=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.p=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.h=function(hooks) { return hooks; }

C.q=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.r=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.t=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.u=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.i=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
$.bJ="$cachedFunction"
$.bK="$cachedInvocation"
$.w=0
$.W=null
$.bi=null
$.be=null
$.cf=null
$.co=null
$.aC=null
$.aH=null
$.bf=null
$.T=null
$.a0=null
$.a1=null
$.b9=!1
$.l=C.a
$.bu=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bn","$get$bn",function(){return H.cj("_$dart_dartClosure")},"aR","$get$aR",function(){return H.cj("_$dart_js")},"bw","$get$bw",function(){return H.cU()},"bx","$get$bx",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.bu
$.bu=z+1
z="expando$key$"+z}return new P.cM(null,z)},"bT","$get$bT",function(){return H.A(H.aw({
toString:function(){return"$receiver$"}}))},"bU","$get$bU",function(){return H.A(H.aw({$method$:null,
toString:function(){return"$receiver$"}}))},"bV","$get$bV",function(){return H.A(H.aw(null))},"bW","$get$bW",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"c_","$get$c_",function(){return H.A(H.aw(void 0))},"c0","$get$c0",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"bY","$get$bY",function(){return H.A(H.bZ(null))},"bX","$get$bX",function(){return H.A(function(){try{null.$method$}catch(z){return z.message}}())},"c2","$get$c2",function(){return H.A(H.bZ(void 0))},"c1","$get$c1",function(){return H.A(function(){try{(void 0).$method$}catch(z){return z.message}}())},"b5","$get$b5",function(){return P.dB()},"a2","$get$a2",function(){return[]},"ae","$get$ae",function(){return C.l}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.P,args:[P.i]},{func:1,args:[,P.P]},{func:1,args:[P.P]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,P.bQ]},{func:1,args:[P.i,,]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,args:[F.au]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.eV(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.q=a.q
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.cq(F.cm(),b)},[])
else (function(b){H.cq(F.cm(),b)})([])})})()