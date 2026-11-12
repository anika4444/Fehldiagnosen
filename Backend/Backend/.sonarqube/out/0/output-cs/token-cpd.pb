”s
3C:\sources\Fehldiagnosen\Backend\Backend\Program.cs
var 
builder 
= 
WebApplication 
. 
CreateBuilder *
(* +
args+ /
)/ 0
;0 1
builder 
. 
Services 
. 
AddCors 
( 
options  
=>! #
{ 
options 
. 
	AddPolicy 
( 
$str  
,  !
policy" (
=>) +
{ 
policy 
. 
SetIsOriginAllowed !
(! "
origin" (
=>) +
true, 0
)0 1
.   	
AllowAnyMethod  	 
(   
)   
.!! 	
AllowAnyHeader!!	 
(!! 
)!! 
."" 	
AllowCredentials""	 
("" 
)"" 
;"" 
}## 
)## 
;## 
}$$ 
)$$ 
;$$ 
builder&& 
.&& 
Services&& 
.&& 
AddControllers&& 
(&&  
)&&  !
;&&! "
builder'' 
.'' 
Services'' 
.'' 

AddOpenApi'' 
('' 
)'' 
;'' 
builder(( 
.(( 
Services(( 
.(( 
AddHttpClient(( 
((( 
)((  
;((  !
builder** 
.** 
Services** 
.** 
	AddScoped** 
<** %
IPatientSymptomRepository** 4
,**4 5"
MySqlSymptomRepository**6 L
>**L M
(**M N
)**N O
;**O P
builder++ 
.++ 
Services++ 
.++ 
	AddScoped++ 
<++ 
IPatientRepository++ -
,++- ."
MySqlPatientRepository++/ E
>++E F
(++F G
)++G H
;++H I
builder,, 
.,, 
Services,, 
.,, 
	AddScoped,, 
<,, (
ISymptomDefinitionRepository,, 7
,,,7 8,
 MySqlSymptomDefinitionRepository,,9 Y
>,,Y Z
(,,Z [
),,[ \
;,,\ ]
builder-- 
.-- 
Services-- 
.-- 
	AddScoped-- 
<-- !
IMedicationRepository-- 0
,--0 1%
MySqlMedicationRepository--2 K
>--K L
(--L M
)--M N
;--N O
builder.. 
... 
Services.. 
... 
	AddScoped.. 
<.. *
IMedicalHistoryEntryRepository.. 9
,..9 :.
"MySqlMedicalHistoryEntryRepository..; ]
>..] ^
(..^ _
).._ `
;..` a
builder// 
.// 
Services// 
.// 
	AddScoped// 
<// )
IFamilyHistoryEntryRepository// 8
,//8 9-
!MySqlFamilyHistoryEntryRepository//: [
>//[ \
(//\ ]
)//] ^
;//^ _
builder00 
.00 
Services00 
.00 
	AddScoped00 
<00 )
ICommunicationLevelRepository00 8
,008 9-
!MySqlCommunicationLevelRepository00: [
>00[ \
(00\ ]
)00] ^
;00^ _
builder11 
.11 
Services11 
.11 
	AddScoped11 
<11 &
IDrugInteractionRepository11 5
,115 6*
MySqlDrugInteractionRepository117 U
>11U V
(11V W
)11W X
;11X Y
builder33 
.33 
Services33 
.33 
	AddScoped33 
<33 
IPatientService33 *
,33* +
PatientService33, :
>33: ;
(33; <
)33< =
;33= >
builder44 
.44 
Services44 
.44 
	AddScoped44 
<44 
ISymptomService44 *
,44* +
SymptomService44, :
>44: ;
(44; <
)44< =
;44= >
builder55 
.55 
Services55 
.55 
	AddScoped55 
<55 
IMedicationService55 -
,55- .
MedicationService55/ @
>55@ A
(55A B
)55B C
;55C D
builder66 
.66 
Services66 
.66 
	AddScoped66 
<66 '
IMedicalHistoryEntryService66 6
,666 7&
MedicalHistoryEntryService668 R
>66R S
(66S T
)66T U
;66U V
builder77 
.77 
Services77 
.77 
	AddScoped77 
<77 &
IFamilyHistoryEntryService77 5
,775 6%
FamilyHistoryEntryService777 P
>77P Q
(77Q R
)77R S
;77S T
builder88 
.88 
Services88 
.88 
	AddScoped88 
<88 
IUserService88 '
,88' (
UserService88) 4
>884 5
(885 6
)886 7
;887 8
builder99 
.99 
Services99 
.99 
	AddScoped99 
<99 

IAIService99 %
,99% &
	AIService99' 0
>990 1
(991 2
)992 3
;993 4
builder:: 
.:: 
Services:: 
.:: 
	AddScoped:: 
<:: &
IKnownMedicationRepository:: 5
,::5 6*
MySqlKnownMedicationRepository::7 U
>::U V
(::V W
)::W X
;::X Y
builder;; 
.;; 
Services;; 
.;; 
	AddScoped;; 
<;; #
IKnownMedicationService;; 2
,;;2 3"
KnownMedicationService;;4 J
>;;J K
(;;K L
);;L M
;;;M N
builder<< 
.<< 
Services<< 
.<< 
	AddScoped<< 
<<<  
IDiagnosisRepository<< /
,<</ 0$
MySqlDiagnosisRepository<<1 I
><<I J
(<<J K
)<<K L
;<<L M
builder== 
.== 
Services== 
.== 
	AddScoped== 
<== 
IDiagnosisService== ,
,==, -
DiagnosisService==. >
>==> ?
(==? @
)==@ A
;==A B
builder>> 
.>> 
Services>> 
.>> 
	AddScoped>> 
<>> 
IHealthTipService>> ,
,>>, -
HealthTipService>>. >
>>>> ?
(>>? @
)>>@ A
;>>A B
builder?? 
.?? 
Services?? 
.?? 
	AddScoped?? 
<?? &
ICommunicationLevelService?? 5
,??5 6%
CommunicationLevelService??7 P
>??P Q
(??Q R
)??R S
;??S T
builder@@ 
.@@ 
Services@@ 
.@@ 
AddMemoryCache@@ 
(@@  
)@@  !
;@@! "
builderAA 
.AA 
ServicesAA 
.AA 
	AddScopedAA 
<AA #
IDrugInteractionServiceAA 2
,AA2 3"
DrugInteractionServiceAA4 J
>AAJ K
(AAK L
)AAL M
;AAM N
builderBB 
.BB 
ServicesBB 
.BB 
	AddScopedBB 
<BB 
ICheckupServiceBB *
,BB* +
CheckupServiceBB, :
>BB: ;
(BB; <
)BB< =
;BB= >
builderDD 
.DD 
ServicesDD 
.DD 
	AddScopedDD 
<DD $
IMedicalLetterRepositoryDD 3
,DD3 4(
MySqlMedicalLetterRepositoryDD5 Q
>DDQ R
(DDR S
)DDS T
;DDT U
builderEE 
.EE 
ServicesEE 
.EE 
	AddScopedEE 
<EE 
IAnonymizerServiceEE -
,EE- .
AnonymizerServiceEE/ @
>EE@ A
(EEA B
)EEB C
;EEC D
builderGG 
.GG 
ServicesGG 
.GG 
AddTransientGG 
<GG 
	DtoMapperGG '
>GG' (
(GG( )
)GG) *
;GG* +
varII 
connectionStringII 
=II 
builderII 
.II 
ConfigurationII ,
.II, -
GetConnectionStringII- @
(II@ A
$strIIA J
)IIJ K
;IIK L
ifJJ 
(JJ 
stringJJ 

.JJ
 
IsNullOrEmptyJJ 
(JJ 
connectionStringJJ )
)JJ) *
)JJ* +
{KK 
throwLL 	
newLL
 %
InvalidOperationExceptionLL '
(LL' (
$strLL( P
)LLP Q
;LLQ R
}MM 
builderOO 
.OO 
ServicesOO 
.OO 
AddDbContextOO 
<OO 
MySqlDbContextOO ,
>OO, -
(OO- .
optionsOO. 5
=>OO6 8
optionsOO9 @
.OO@ A
UseMySQLOOA I
(OOI J
connectionStringOOJ Z
)OOZ [
)OO[ \
;OO\ ]
builderQQ 
.QQ 
ServicesQQ 
.QQ 
AddIdentityQQ 
<QQ 
ApplicationUserQQ ,
,QQ, -
IdentityRoleQQ. :
>QQ: ;
(QQ; <
optionsQQ< C
=>QQD F
{RR 
optionsSS 
.SS 
PasswordSS 
.SS 
RequireDigitSS !
=SS" #
falseSS$ )
;SS) *
optionsTT 
.TT 
PasswordTT 
.TT 
RequireLowercaseTT %
=TT& '
falseTT( -
;TT- .
optionsUU 
.UU 
PasswordUU 
.UU "
RequireNonAlphanumericUU +
=UU, -
falseUU. 3
;UU3 4
optionsVV 
.VV 
PasswordVV 
.VV 
RequireUppercaseVV %
=VV& '
falseVV( -
;VV- .
optionsWW 
.WW 
PasswordWW 
.WW 
RequiredLengthWW #
=WW$ %
$numWW& '
;WW' (
optionsXX 
.XX 
SignInXX 
.XX #
RequireConfirmedAccountXX *
=XX+ ,
falseXX- 2
;XX2 3
}ZZ 
)ZZ 
.ZZ $
AddEntityFrameworkStoresZZ 
<ZZ 
MySqlDbContextZZ *
>ZZ* +
(ZZ+ ,
)ZZ, -
.[[ $
AddDefaultTokenProviders[[ 
([[ 
)[[ 
;[[ 
builder]] 
.]] 
Services]] 
.]] 
AddAuthentication]] "
(]]" #
options]]# *
=>]]+ -
{^^ 
options__ 
.__ %
DefaultAuthenticateScheme__ %
=__& '
JwtBearerDefaults__( 9
.__9 : 
AuthenticationScheme__: N
;__N O
options`` 
.`` 
DefaultScheme`` 
=`` 
JwtBearerDefaults`` -
.``- . 
AuthenticationScheme``. B
;``B C
optionsaa 
.aa "
DefaultChallengeSchemeaa "
=aa# $
JwtBearerDefaultsaa% 6
.aa6 7 
AuthenticationSchemeaa7 K
;aaK L
}bb 
)bb 
.bb 
AddJwtBearerbb 
(bb 
optionsbb 
=>bb 
{cc 
optionsdd 
.dd %
TokenValidationParametersdd %
=dd& '
newdd( +%
TokenValidationParametersdd, E
{ee 
IssuerSigningKeyff 
=ff 
newff  
SymmetricSecurityKeyff 3
(ff3 4
Systemff4 :
.ff: ;
Textff; ?
.ff? @
Encodingff@ H
.ffH I
UTF8ffI M
.ffM N
GetBytesffN V
(ffV W
buildergg 
.gg 
Configurationgg !
.gg! "

GetSectiongg" ,
(gg, -
$strgg- :
)gg: ;
[gg; <
$strgg< D
]ggD E
)ggE F
)hh 	
,hh	 

ValidateIssuerii 
=ii 
falseii 
,ii 
ValidateAudiencejj 
=jj 
falsejj  
,jj  !
ValidateLifetimekk 
=kk 
truekk 
,kk  !
RequireExpirationTimell 
=ll 
falsell  %
}mm 
;mm 
}nn 
)nn 
;nn 
varpp 
apppp 
=pp 	
builderpp
 
.pp 
Buildpp 
(pp 
)pp 
;pp 
usingrr 
(rr 
varrr 

scoperr 
=rr 
apprr 
.rr 
Servicesrr 
.rr  
CreateScoperr  +
(rr+ ,
)rr, -
)rr- .
{ss 
vartt 
servicestt 
=tt 
scopett 
.tt 
ServiceProvidertt (
;tt( )
varuu 
contextuu 
=uu 
servicesuu 
.uu 
GetRequiredServiceuu -
<uu- .
MySqlDbContextuu. <
>uu< =
(uu= >
)uu> ?
;uu? @
varvv 
roleManagervv 
=vv 
servicesvv 
.vv 
GetRequiredServicevv 1
<vv1 2
RoleManagervv2 =
<vv= >
IdentityRolevv> J
>vvJ K
>vvK L
(vvL M
)vvM N
;vvN O
awaitxx 	
DbInitializerxx
 
.xx 

Initializexx "
(xx" #
contextxx# *
,xx* +
roleManagerxx, 7
)xx7 8
;xx8 9
}yy 
if|| 
(|| 
app|| 
.|| 
Environment|| 
.|| 
IsDevelopment|| !
(||! "
)||" #
)||# $
{}} 
app~~ 
.~~ 

MapOpenApi~~ 
(~~ 
)~~ 
;~~ 
app 
. !
MapScalarApiReference 
( 
) 
;  
}ÄÄ 
appÇÇ 
.
ÇÇ !
UseHttpsRedirection
ÇÇ 
(
ÇÇ 
)
ÇÇ 
;
ÇÇ 
appÑÑ 
.
ÑÑ 
UseCors
ÑÑ 
(
ÑÑ 
$str
ÑÑ 
)
ÑÑ 
;
ÑÑ 
appÜÜ 
.
ÜÜ 
UseAuthentication
ÜÜ 
(
ÜÜ 
)
ÜÜ 
;
ÜÜ 
appáá 
.
áá 
UseAuthorization
áá 
(
áá 
)
áá 
;
áá 
appââ 
.
ââ 
MapControllers
ââ 
(
ââ 
)
ââ 
;
ââ 
appãã 
.
ãã 
Run
ãã 
(
ãã 
)
ãã 	
;
ãã	 
¬≤
SC:\sources\Fehldiagnosen\Backend\Backend\Migrations\20260608122700_initialCreate.cs
	namespace 	
Backend
 
. 

Migrations 
{ 
public

 

partial

 
class

 
initialCreate

 &
:

' (
	Migration

) 2
{ 
	protected 
override 
void 
Up  "
(" #
MigrationBuilder# 3
migrationBuilder4 D
)D E
{ 	
migrationBuilder 
. 
AlterDatabase *
(* +
)+ ,
. 

Annotation 
( 
$str +
,+ ,
$str- 6
)6 7
;7 8
migrationBuilder 
. 
CreateTable (
(( )
name 
: 
$str #
,# $
columns 
: 
table 
=> !
new" %
{ 
Id 
= 
table 
. 
Column %
<% &
string& ,
>, -
(- .
type. 2
:2 3
$str4 B
,B C
nullableD L
:L M
falseN S
)S T
,T U
Name 
= 
table  
.  !
Column! '
<' (
string( .
>. /
(/ 0
type0 4
:4 5
$str6 D
,D E
	maxLengthF O
:O P
$numQ T
,T U
nullableV ^
:^ _
true` d
)d e
,e f
NormalizedName "
=# $
table% *
.* +
Column+ 1
<1 2
string2 8
>8 9
(9 :
type: >
:> ?
$str@ N
,N O
	maxLengthP Y
:Y Z
$num[ ^
,^ _
nullable` h
:h i
truej n
)n o
,o p
ConcurrencyStamp $
=% &
table' ,
., -
Column- 3
<3 4
string4 :
>: ;
(; <
type< @
:@ A
$strB L
,L M
nullableN V
:V W
trueX \
)\ ]
} 
, 
constraints 
: 
table "
=># %
{ 
table 
. 

PrimaryKey $
($ %
$str% 5
,5 6
x7 8
=>9 ;
x< =
.= >
Id> @
)@ A
;A B
} 
) 
. 

Annotation 
( 
$str +
,+ ,
$str- 6
)6 7
;7 8
migrationBuilder!! 
.!! 
CreateTable!! (
(!!( )
name"" 
:"" 
$str"" #
,""# $
columns## 
:## 
table## 
=>## !
new##" %
{$$ 
Id%% 
=%% 
table%% 
.%% 
Column%% %
<%%% &
string%%& ,
>%%, -
(%%- .
type%%. 2
:%%2 3
$str%%4 B
,%%B C
nullable%%D L
:%%L M
false%%N S
)%%S T
,%%T U
UserName&& 
=&& 
table&& $
.&&$ %
Column&&% +
<&&+ ,
string&&, 2
>&&2 3
(&&3 4
type&&4 8
:&&8 9
$str&&: H
,&&H I
	maxLength&&J S
:&&S T
$num&&U X
,&&X Y
nullable&&Z b
:&&b c
true&&d h
)&&h i
,&&i j
NormalizedUserName'' &
=''' (
table'') .
.''. /
Column''/ 5
<''5 6
string''6 <
>''< =
(''= >
type''> B
:''B C
$str''D R
,''R S
	maxLength''T ]
:''] ^
$num''_ b
,''b c
nullable''d l
:''l m
true''n r
)''r s
,''s t
Email(( 
=(( 
table(( !
.((! "
Column((" (
<((( )
string(() /
>((/ 0
(((0 1
type((1 5
:((5 6
$str((7 E
,((E F
	maxLength((G P
:((P Q
$num((R U
,((U V
nullable((W _
:((_ `
true((a e
)((e f
,((f g
NormalizedEmail)) #
=))$ %
table))& +
.))+ ,
Column)), 2
<))2 3
string))3 9
>))9 :
()): ;
type)); ?
:))? @
$str))A O
,))O P
	maxLength))Q Z
:))Z [
$num))\ _
,))_ `
nullable))a i
:))i j
true))k o
)))o p
,))p q
EmailConfirmed** "
=**# $
table**% *
.*** +
Column**+ 1
<**1 2
bool**2 6
>**6 7
(**7 8
type**8 <
:**< =
$str**> J
,**J K
nullable**L T
:**T U
false**V [
)**[ \
,**\ ]
PasswordHash++  
=++! "
table++# (
.++( )
Column++) /
<++/ 0
string++0 6
>++6 7
(++7 8
type++8 <
:++< =
$str++> H
,++H I
nullable++J R
:++R S
true++T X
)++X Y
,++Y Z
SecurityStamp,, !
=,," #
table,,$ )
.,,) *
Column,,* 0
<,,0 1
string,,1 7
>,,7 8
(,,8 9
type,,9 =
:,,= >
$str,,? I
,,,I J
nullable,,K S
:,,S T
true,,U Y
),,Y Z
,,,Z [
ConcurrencyStamp-- $
=--% &
table--' ,
.--, -
Column--- 3
<--3 4
string--4 :
>--: ;
(--; <
type--< @
:--@ A
$str--B L
,--L M
nullable--N V
:--V W
true--X \
)--\ ]
,--] ^
PhoneNumber.. 
=..  !
table.." '
...' (
Column..( .
<... /
string../ 5
>..5 6
(..6 7
type..7 ;
:..; <
$str..= G
,..G H
nullable..I Q
:..Q R
true..S W
)..W X
,..X Y 
PhoneNumberConfirmed// (
=//) *
table//+ 0
.//0 1
Column//1 7
<//7 8
bool//8 <
>//< =
(//= >
type//> B
://B C
$str//D P
,//P Q
nullable//R Z
://Z [
false//\ a
)//a b
,//b c
TwoFactorEnabled00 $
=00% &
table00' ,
.00, -
Column00- 3
<003 4
bool004 8
>008 9
(009 :
type00: >
:00> ?
$str00@ L
,00L M
nullable00N V
:00V W
false00X ]
)00] ^
,00^ _

LockoutEnd11 
=11  
table11! &
.11& '
Column11' -
<11- .
DateTimeOffset11. <
>11< =
(11= >
type11> B
:11B C
$str11D N
,11N O
nullable11P X
:11X Y
true11Z ^
)11^ _
,11_ `
LockoutEnabled22 "
=22# $
table22% *
.22* +
Column22+ 1
<221 2
bool222 6
>226 7
(227 8
type228 <
:22< =
$str22> J
,22J K
nullable22L T
:22T U
false22V [
)22[ \
,22\ ]
AccessFailedCount33 %
=33& '
table33( -
.33- .
Column33. 4
<334 5
int335 8
>338 9
(339 :
type33: >
:33> ?
$str33@ E
,33E F
nullable33G O
:33O P
false33Q V
)33V W
}44 
,44 
constraints55 
:55 
table55 "
=>55# %
{66 
table77 
.77 

PrimaryKey77 $
(77$ %
$str77% 5
,775 6
x777 8
=>779 ;
x77< =
.77= >
Id77> @
)77@ A
;77A B
}88 
)88 
.99 

Annotation99 
(99 
$str99 +
,99+ ,
$str99- 6
)996 7
;997 8
migrationBuilder;; 
.;; 
CreateTable;; (
(;;( )
name<< 
:<< 
$str<< '
,<<' (
columns== 
:== 
table== 
=>== !
new==" %
{>> 
Id?? 
=?? 
table?? 
.?? 
Column?? %
<??% &
int??& )
>??) *
(??* +
type??+ /
:??/ 0
$str??1 6
,??6 7
nullable??8 @
:??@ A
false??B G
)??G H
.@@ 

Annotation@@ #
(@@# $
$str@@$ C
,@@C D(
MySQLValueGenerationStrategy@@E a
.@@a b
IdentityColumn@@b p
)@@p q
,@@q r
AtcCodeAA 
=AA 
tableAA #
.AA# $
ColumnAA$ *
<AA* +
stringAA+ 1
>AA1 2
(AA2 3
typeAA3 7
:AA7 8
$strAA9 F
,AAF G
	maxLengthAAH Q
:AAQ R
$numAAS U
,AAU V
nullableAAW _
:AA_ `
falseAAa f
)AAf g
,AAg h

DrugBankIdBB 
=BB  
tableBB! &
.BB& '
ColumnBB' -
<BB- .
stringBB. 4
>BB4 5
(BB5 6
typeBB6 :
:BB: ;
$strBB< I
,BBI J
	maxLengthBBK T
:BBT U
$numBBV X
,BBX Y
nullableBBZ b
:BBb c
falseBBd i
)BBi j
,BBj k
DrugNameCC 
=CC 
tableCC $
.CC$ %
ColumnCC% +
<CC+ ,
stringCC, 2
>CC2 3
(CC3 4
typeCC4 8
:CC8 9
$strCC: H
,CCH I
	maxLengthCCJ S
:CCS T
$numCCU X
,CCX Y
nullableCCZ b
:CCb c
falseCCd i
)CCi j
}DD 
,DD 
constraintsEE 
:EE 
tableEE "
=>EE# %
{FF 
tableGG 
.GG 

PrimaryKeyGG $
(GG$ %
$strGG% 9
,GG9 :
xGG; <
=>GG= ?
xGG@ A
.GGA B
IdGGB D
)GGD E
;GGE F
}HH 
)HH 
.II 

AnnotationII 
(II 
$strII +
,II+ ,
$strII- 6
)II6 7
;II7 8
migrationBuilderKK 
.KK 
CreateTableKK (
(KK( )
nameLL 
:LL 
$strLL +
,LL+ ,
columnsMM 
:MM 
tableMM 
=>MM !
newMM" %
{NN 
IdOO 
=OO 
tableOO 
.OO 
ColumnOO %
<OO% &
intOO& )
>OO) *
(OO* +
typeOO+ /
:OO/ 0
$strOO1 6
,OO6 7
nullableOO8 @
:OO@ A
falseOOB G
)OOG H
.PP 

AnnotationPP #
(PP# $
$strPP$ C
,PPC D(
MySQLValueGenerationStrategyPPE a
.PPa b
IdentityColumnPPb p
)PPp q
,PPq r
NameQQ 
=QQ 
tableQQ  
.QQ  !
ColumnQQ! '
<QQ' (
stringQQ( .
>QQ. /
(QQ/ 0
typeQQ0 4
:QQ4 5
$strQQ6 C
,QQC D
	maxLengthQQE N
:QQN O
$numQQP R
,QQR S
nullableQQT \
:QQ\ ]
falseQQ^ c
)QQc d
,QQd e
DescriptionRR 
=RR  !
tableRR" '
.RR' (
ColumnRR( .
<RR. /
stringRR/ 5
>RR5 6
(RR6 7
typeRR7 ;
:RR; <
$strRR= G
,RRG H
nullableRRI Q
:RRQ R
falseRRS X
)RRX Y
,RRY Z
KiPromptSS 
=SS 
tableSS $
.SS$ %
ColumnSS% +
<SS+ ,
stringSS, 2
>SS2 3
(SS3 4
typeSS4 8
:SS8 9
$strSS: D
,SSD E
nullableSSF N
:SSN O
falseSSP U
)SSU V
,SSV W 
ActionRecommendationTT (
=TT) *
tableTT+ 0
.TT0 1
ColumnTT1 7
<TT7 8
stringTT8 >
>TT> ?
(TT? @
typeTT@ D
:TTD E
$strTTF P
,TTP Q
nullableTTR Z
:TTZ [
falseTT\ a
)TTa b
}UU 
,UU 
constraintsVV 
:VV 
tableVV "
=>VV# %
{WW 
tableXX 
.XX 

PrimaryKeyXX $
(XX$ %
$strXX% =
,XX= >
xXX? @
=>XXA C
xXXD E
.XXE F
IdXXF H
)XXH I
;XXI J
}YY 
)YY 
.ZZ 

AnnotationZZ 
(ZZ 
$strZZ +
,ZZ+ ,
$strZZ- 6
)ZZ6 7
;ZZ7 8
migrationBuilder\\ 
.\\ 
CreateTable\\ (
(\\( )
name]] 
:]] 
$str]] #
,]]# $
columns^^ 
:^^ 
table^^ 
=>^^ !
new^^" %
{__ 
Id`` 
=`` 
table`` 
.`` 
Column`` %
<``% &
int``& )
>``) *
(``* +
type``+ /
:``/ 0
$str``1 6
,``6 7
nullable``8 @
:``@ A
false``B G
)``G H
.aa 

Annotationaa #
(aa# $
$straa$ C
,aaC D(
MySQLValueGenerationStrategyaaE a
.aaa b
IdentityColumnaab p
)aap q
,aaq r

DrugBankIdbb 
=bb  
tablebb! &
.bb& '
Columnbb' -
<bb- .
stringbb. 4
>bb4 5
(bb5 6
typebb6 :
:bb: ;
$strbb< I
,bbI J
	maxLengthbbK T
:bbT U
$numbbV X
,bbX Y
nullablebbZ b
:bbb c
falsebbd i
)bbi j
,bbj k
Toxicitycc 
=cc 
tablecc $
.cc$ %
Columncc% +
<cc+ ,
stringcc, 2
>cc2 3
(cc3 4
typecc4 8
:cc8 9
$strcc: D
,ccD E
nullableccF N
:ccN O
trueccP T
)ccT U
,ccU V
Pharmacodynamicsdd $
=dd% &
tabledd' ,
.dd, -
Columndd- 3
<dd3 4
stringdd4 :
>dd: ;
(dd; <
typedd< @
:dd@ A
$strddB L
,ddL M
nullableddN V
:ddV W
trueddX \
)dd\ ]
,dd] ^
SnpAdverseReactionsee '
=ee( )
tableee* /
.ee/ 0
Columnee0 6
<ee6 7
stringee7 =
>ee= >
(ee> ?
typeee? C
:eeC D
$streeE O
,eeO P
nullableeeQ Y
:eeY Z
trueee[ _
)ee_ `
}ff 
,ff 
constraintsgg 
:gg 
tablegg "
=>gg# %
{hh 
tableii 
.ii 

PrimaryKeyii $
(ii$ %
$strii% 5
,ii5 6
xii7 8
=>ii9 ;
xii< =
.ii= >
Idii> @
)ii@ A
;iiA B
}jj 
)jj 
.kk 

Annotationkk 
(kk 
$strkk +
,kk+ ,
$strkk- 6
)kk6 7
;kk7 8
migrationBuildermm 
.mm 
CreateTablemm (
(mm( )
namenn 
:nn 
$strnn (
,nn( )
columnsoo 
:oo 
tableoo 
=>oo !
newoo" %
{pp 
Idqq 
=qq 
tableqq 
.qq 
Columnqq %
<qq% &
intqq& )
>qq) *
(qq* +
typeqq+ /
:qq/ 0
$strqq1 6
,qq6 7
nullableqq8 @
:qq@ A
falseqqB G
)qqG H
.rr 

Annotationrr #
(rr# $
$strrr$ C
,rrC D(
MySQLValueGenerationStrategyrrE a
.rra b
IdentityColumnrrb p
)rrp q
,rrq r
SourceDrugBankIdss $
=ss% &
tabless' ,
.ss, -
Columnss- 3
<ss3 4
stringss4 :
>ss: ;
(ss; <
typess< @
:ss@ A
$strssB O
,ssO P
	maxLengthssQ Z
:ssZ [
$numss\ ^
,ss^ _
nullabless` h
:ssh i
falsessj o
)sso p
,ssp q
TargetDrugBankIdtt $
=tt% &
tablett' ,
.tt, -
Columntt- 3
<tt3 4
stringtt4 :
>tt: ;
(tt; <
typett< @
:tt@ A
$strttB O
,ttO P
	maxLengthttQ Z
:ttZ [
$numtt\ ^
,tt^ _
nullablett` h
:tth i
falsettj o
)tto p
,ttp q

TargetNameuu 
=uu  
tableuu! &
.uu& '
Columnuu' -
<uu- .
stringuu. 4
>uu4 5
(uu5 6
typeuu6 :
:uu: ;
$struu< J
,uuJ K
	maxLengthuuL U
:uuU V
$numuuW Z
,uuZ [
nullableuu\ d
:uud e
falseuuf k
)uuk l
,uul m
Descriptionvv 
=vv  !
tablevv" '
.vv' (
Columnvv( .
<vv. /
stringvv/ 5
>vv5 6
(vv6 7
typevv7 ;
:vv; <
$strvv= G
,vvG H
nullablevvI Q
:vvQ R
falsevvS X
)vvX Y
}ww 
,ww 
constraintsxx 
:xx 
tablexx "
=>xx# %
{yy 
tablezz 
.zz 

PrimaryKeyzz $
(zz$ %
$strzz% :
,zz: ;
xzz< =
=>zz> @
xzzA B
.zzB C
IdzzC E
)zzE F
;zzF G
}{{ 
){{ 
.|| 

Annotation|| 
(|| 
$str|| +
,||+ ,
$str||- 6
)||6 7
;||7 8
migrationBuilder~~ 
.~~ 
CreateTable~~ (
(~~( )
name 
: 
$str (
,( )
columns
ÄÄ 
:
ÄÄ 
table
ÄÄ 
=>
ÄÄ !
new
ÄÄ" %
{
ÅÅ 
Id
ÇÇ 
=
ÇÇ 
table
ÇÇ 
.
ÇÇ 
Column
ÇÇ %
<
ÇÇ% &
int
ÇÇ& )
>
ÇÇ) *
(
ÇÇ* +
type
ÇÇ+ /
:
ÇÇ/ 0
$str
ÇÇ1 6
,
ÇÇ6 7
nullable
ÇÇ8 @
:
ÇÇ@ A
false
ÇÇB G
)
ÇÇG H
.
ÉÉ 

Annotation
ÉÉ #
(
ÉÉ# $
$str
ÉÉ$ C
,
ÉÉC D*
MySQLValueGenerationStrategy
ÉÉE a
.
ÉÉa b
IdentityColumn
ÉÉb p
)
ÉÉp q
,
ÉÉq r
Name
ÑÑ 
=
ÑÑ 
table
ÑÑ  
.
ÑÑ  !
Column
ÑÑ! '
<
ÑÑ' (
string
ÑÑ( .
>
ÑÑ. /
(
ÑÑ/ 0
type
ÑÑ0 4
:
ÑÑ4 5
$str
ÑÑ6 @
,
ÑÑ@ A
nullable
ÑÑB J
:
ÑÑJ K
false
ÑÑL Q
)
ÑÑQ R
,
ÑÑR S
	Substance
ÖÖ 
=
ÖÖ 
table
ÖÖ  %
.
ÖÖ% &
Column
ÖÖ& ,
<
ÖÖ, -
string
ÖÖ- 3
>
ÖÖ3 4
(
ÖÖ4 5
type
ÖÖ5 9
:
ÖÖ9 :
$str
ÖÖ; E
,
ÖÖE F
nullable
ÖÖG O
:
ÖÖO P
true
ÖÖQ U
)
ÖÖU V
,
ÖÖV W
AtcCode
ÜÜ 
=
ÜÜ 
table
ÜÜ #
.
ÜÜ# $
Column
ÜÜ$ *
<
ÜÜ* +
string
ÜÜ+ 1
>
ÜÜ1 2
(
ÜÜ2 3
type
ÜÜ3 7
:
ÜÜ7 8
$str
ÜÜ9 C
,
ÜÜC D
nullable
ÜÜE M
:
ÜÜM N
true
ÜÜO S
)
ÜÜS T
,
ÜÜT U
Dosage
áá 
=
áá 
table
áá "
.
áá" #
Column
áá# )
<
áá) *
string
áá* 0
>
áá0 1
(
áá1 2
type
áá2 6
:
áá6 7
$str
áá8 B
,
ááB C
nullable
ááD L
:
ááL M
true
ááN R
)
ááR S
,
ááS T"
PrescriptionRequired
àà (
=
àà) *
table
àà+ 0
.
àà0 1
Column
àà1 7
<
àà7 8
string
àà8 >
>
àà> ?
(
àà? @
type
àà@ D
:
ààD E
$str
ààF P
,
ààP Q
nullable
ààR Z
:
ààZ [
true
àà\ `
)
àà` a
}
ââ 
,
ââ 
constraints
ää 
:
ää 
table
ää "
=>
ää# %
{
ãã 
table
åå 
.
åå 

PrimaryKey
åå $
(
åå$ %
$str
åå% :
,
åå: ;
x
åå< =
=>
åå> @
x
ååA B
.
ååB C
Id
ååC E
)
ååE F
;
ååF G
}
çç 
)
çç 
.
éé 

Annotation
éé 
(
éé 
$str
éé +
,
éé+ ,
$str
éé- 6
)
éé6 7
;
éé7 8
migrationBuilder
êê 
.
êê 
CreateTable
êê (
(
êê( )
name
ëë 
:
ëë 
$str
ëë *
,
ëë* +
columns
íí 
:
íí 
table
íí 
=>
íí !
new
íí" %
{
ìì 
Id
îî 
=
îî 
table
îî 
.
îî 
Column
îî %
<
îî% &
int
îî& )
>
îî) *
(
îî* +
type
îî+ /
:
îî/ 0
$str
îî1 6
,
îî6 7
nullable
îî8 @
:
îî@ A
false
îîB G
)
îîG H
.
ïï 

Annotation
ïï #
(
ïï# $
$str
ïï$ C
,
ïïC D*
MySQLValueGenerationStrategy
ïïE a
.
ïïa b
IdentityColumn
ïïb p
)
ïïp q
,
ïïq r
Name
ññ 
=
ññ 
table
ññ  
.
ññ  !
Column
ññ! '
<
ññ' (
string
ññ( .
>
ññ. /
(
ññ/ 0
type
ññ0 4
:
ññ4 5
$str
ññ6 D
,
ññD E
	maxLength
ññF O
:
ññO P
$num
ññQ T
,
ññT U
nullable
ññV ^
:
ññ^ _
false
ññ` e
)
ññe f
,
ññf g
Aliases
óó 
=
óó 
table
óó #
.
óó# $
Column
óó$ *
<
óó* +
string
óó+ 1
>
óó1 2
(
óó2 3
type
óó3 7
:
óó7 8
$str
óó9 ?
,
óó? @
nullable
óóA I
:
óóI J
false
óóK P
)
óóP Q
,
óóQ R
Fields
òò 
=
òò 
table
òò "
.
òò" #
Column
òò# )
<
òò) *
string
òò* 0
>
òò0 1
(
òò1 2
type
òò2 6
:
òò6 7
$str
òò8 >
,
òò> ?
nullable
òò@ H
:
òòH I
false
òòJ O
)
òòO P
}
ôô 
,
ôô 
constraints
öö 
:
öö 
table
öö "
=>
öö# %
{
õõ 
table
úú 
.
úú 

PrimaryKey
úú $
(
úú$ %
$str
úú% <
,
úú< =
x
úú> ?
=>
úú@ B
x
úúC D
.
úúD E
Id
úúE G
)
úúG H
;
úúH I
}
ùù 
)
ùù 
.
ûû 

Annotation
ûû 
(
ûû 
$str
ûû +
,
ûû+ ,
$str
ûû- 6
)
ûû6 7
;
ûû7 8
migrationBuilder
†† 
.
†† 
CreateTable
†† (
(
††( )
name
°° 
:
°° 
$str
°° (
,
°°( )
columns
¢¢ 
:
¢¢ 
table
¢¢ 
=>
¢¢ !
new
¢¢" %
{
££ 
Id
§§ 
=
§§ 
table
§§ 
.
§§ 
Column
§§ %
<
§§% &
int
§§& )
>
§§) *
(
§§* +
type
§§+ /
:
§§/ 0
$str
§§1 6
,
§§6 7
nullable
§§8 @
:
§§@ A
false
§§B G
)
§§G H
.
•• 

Annotation
•• #
(
••# $
$str
••$ C
,
••C D*
MySQLValueGenerationStrategy
••E a
.
••a b
IdentityColumn
••b p
)
••p q
,
••q r
RoleId
¶¶ 
=
¶¶ 
table
¶¶ "
.
¶¶" #
Column
¶¶# )
<
¶¶) *
string
¶¶* 0
>
¶¶0 1
(
¶¶1 2
type
¶¶2 6
:
¶¶6 7
$str
¶¶8 F
,
¶¶F G
nullable
¶¶H P
:
¶¶P Q
false
¶¶R W
)
¶¶W X
,
¶¶X Y
	ClaimType
ßß 
=
ßß 
table
ßß  %
.
ßß% &
Column
ßß& ,
<
ßß, -
string
ßß- 3
>
ßß3 4
(
ßß4 5
type
ßß5 9
:
ßß9 :
$str
ßß; E
,
ßßE F
nullable
ßßG O
:
ßßO P
true
ßßQ U
)
ßßU V
,
ßßV W

ClaimValue
®® 
=
®®  
table
®®! &
.
®®& '
Column
®®' -
<
®®- .
string
®®. 4
>
®®4 5
(
®®5 6
type
®®6 :
:
®®: ;
$str
®®< F
,
®®F G
nullable
®®H P
:
®®P Q
true
®®R V
)
®®V W
}
©© 
,
©© 
constraints
™™ 
:
™™ 
table
™™ "
=>
™™# %
{
´´ 
table
¨¨ 
.
¨¨ 

PrimaryKey
¨¨ $
(
¨¨$ %
$str
¨¨% :
,
¨¨: ;
x
¨¨< =
=>
¨¨> @
x
¨¨A B
.
¨¨B C
Id
¨¨C E
)
¨¨E F
;
¨¨F G
table
≠≠ 
.
≠≠ 

ForeignKey
≠≠ $
(
≠≠$ %
name
ÆÆ 
:
ÆÆ 
$str
ÆÆ F
,
ÆÆF G
column
ØØ 
:
ØØ 
x
ØØ  !
=>
ØØ" $
x
ØØ% &
.
ØØ& '
RoleId
ØØ' -
,
ØØ- .
principalTable
∞∞ &
:
∞∞& '
$str
∞∞( 5
,
∞∞5 6
principalColumn
±± '
:
±±' (
$str
±±) -
,
±±- .
onDelete
≤≤  
:
≤≤  !
ReferentialAction
≤≤" 3
.
≤≤3 4
Cascade
≤≤4 ;
)
≤≤; <
;
≤≤< =
}
≥≥ 
)
≥≥ 
.
¥¥ 

Annotation
¥¥ 
(
¥¥ 
$str
¥¥ +
,
¥¥+ ,
$str
¥¥- 6
)
¥¥6 7
;
¥¥7 8
migrationBuilder
∂∂ 
.
∂∂ 
CreateTable
∂∂ (
(
∂∂( )
name
∑∑ 
:
∑∑ 
$str
∑∑ (
,
∑∑( )
columns
∏∏ 
:
∏∏ 
table
∏∏ 
=>
∏∏ !
new
∏∏" %
{
ππ 
Id
∫∫ 
=
∫∫ 
table
∫∫ 
.
∫∫ 
Column
∫∫ %
<
∫∫% &
int
∫∫& )
>
∫∫) *
(
∫∫* +
type
∫∫+ /
:
∫∫/ 0
$str
∫∫1 6
,
∫∫6 7
nullable
∫∫8 @
:
∫∫@ A
false
∫∫B G
)
∫∫G H
.
ªª 

Annotation
ªª #
(
ªª# $
$str
ªª$ C
,
ªªC D*
MySQLValueGenerationStrategy
ªªE a
.
ªªa b
IdentityColumn
ªªb p
)
ªªp q
,
ªªq r
UserId
ºº 
=
ºº 
table
ºº "
.
ºº" #
Column
ºº# )
<
ºº) *
string
ºº* 0
>
ºº0 1
(
ºº1 2
type
ºº2 6
:
ºº6 7
$str
ºº8 F
,
ººF G
nullable
ººH P
:
ººP Q
false
ººR W
)
ººW X
,
ººX Y
	ClaimType
ΩΩ 
=
ΩΩ 
table
ΩΩ  %
.
ΩΩ% &
Column
ΩΩ& ,
<
ΩΩ, -
string
ΩΩ- 3
>
ΩΩ3 4
(
ΩΩ4 5
type
ΩΩ5 9
:
ΩΩ9 :
$str
ΩΩ; E
,
ΩΩE F
nullable
ΩΩG O
:
ΩΩO P
true
ΩΩQ U
)
ΩΩU V
,
ΩΩV W

ClaimValue
ææ 
=
ææ  
table
ææ! &
.
ææ& '
Column
ææ' -
<
ææ- .
string
ææ. 4
>
ææ4 5
(
ææ5 6
type
ææ6 :
:
ææ: ;
$str
ææ< F
,
ææF G
nullable
ææH P
:
ææP Q
true
ææR V
)
ææV W
}
øø 
,
øø 
constraints
¿¿ 
:
¿¿ 
table
¿¿ "
=>
¿¿# %
{
¡¡ 
table
¬¬ 
.
¬¬ 

PrimaryKey
¬¬ $
(
¬¬$ %
$str
¬¬% :
,
¬¬: ;
x
¬¬< =
=>
¬¬> @
x
¬¬A B
.
¬¬B C
Id
¬¬C E
)
¬¬E F
;
¬¬F G
table
√√ 
.
√√ 

ForeignKey
√√ $
(
√√$ %
name
ƒƒ 
:
ƒƒ 
$str
ƒƒ F
,
ƒƒF G
column
≈≈ 
:
≈≈ 
x
≈≈  !
=>
≈≈" $
x
≈≈% &
.
≈≈& '
UserId
≈≈' -
,
≈≈- .
principalTable
∆∆ &
:
∆∆& '
$str
∆∆( 5
,
∆∆5 6
principalColumn
«« '
:
««' (
$str
««) -
,
««- .
onDelete
»»  
:
»»  !
ReferentialAction
»»" 3
.
»»3 4
Cascade
»»4 ;
)
»»; <
;
»»< =
}
…… 
)
…… 
.
   

Annotation
   
(
   
$str
   +
,
  + ,
$str
  - 6
)
  6 7
;
  7 8
migrationBuilder
ÃÃ 
.
ÃÃ 
CreateTable
ÃÃ (
(
ÃÃ( )
name
ÕÕ 
:
ÕÕ 
$str
ÕÕ (
,
ÕÕ( )
columns
ŒŒ 
:
ŒŒ 
table
ŒŒ 
=>
ŒŒ !
new
ŒŒ" %
{
œœ 
LoginProvider
–– !
=
––" #
table
––$ )
.
––) *
Column
––* 0
<
––0 1
string
––1 7
>
––7 8
(
––8 9
type
––9 =
:
––= >
$str
––? M
,
––M N
nullable
––O W
:
––W X
false
––Y ^
)
––^ _
,
––_ `
ProviderKey
—— 
=
——  !
table
——" '
.
——' (
Column
——( .
<
——. /
string
——/ 5
>
——5 6
(
——6 7
type
——7 ;
:
——; <
$str
——= K
,
——K L
nullable
——M U
:
——U V
false
——W \
)
——\ ]
,
——] ^!
ProviderDisplayName
““ '
=
““( )
table
““* /
.
““/ 0
Column
““0 6
<
““6 7
string
““7 =
>
““= >
(
““> ?
type
““? C
:
““C D
$str
““E O
,
““O P
nullable
““Q Y
:
““Y Z
true
““[ _
)
““_ `
,
““` a
UserId
”” 
=
”” 
table
”” "
.
””" #
Column
””# )
<
””) *
string
””* 0
>
””0 1
(
””1 2
type
””2 6
:
””6 7
$str
””8 F
,
””F G
nullable
””H P
:
””P Q
false
””R W
)
””W X
}
‘‘ 
,
‘‘ 
constraints
’’ 
:
’’ 
table
’’ "
=>
’’# %
{
÷÷ 
table
◊◊ 
.
◊◊ 

PrimaryKey
◊◊ $
(
◊◊$ %
$str
◊◊% :
,
◊◊: ;
x
◊◊< =
=>
◊◊> @
new
◊◊A D
{
◊◊E F
x
◊◊G H
.
◊◊H I
LoginProvider
◊◊I V
,
◊◊V W
x
◊◊X Y
.
◊◊Y Z
ProviderKey
◊◊Z e
}
◊◊f g
)
◊◊g h
;
◊◊h i
table
ÿÿ 
.
ÿÿ 

ForeignKey
ÿÿ $
(
ÿÿ$ %
name
ŸŸ 
:
ŸŸ 
$str
ŸŸ F
,
ŸŸF G
column
⁄⁄ 
:
⁄⁄ 
x
⁄⁄  !
=>
⁄⁄" $
x
⁄⁄% &
.
⁄⁄& '
UserId
⁄⁄' -
,
⁄⁄- .
principalTable
€€ &
:
€€& '
$str
€€( 5
,
€€5 6
principalColumn
‹‹ '
:
‹‹' (
$str
‹‹) -
,
‹‹- .
onDelete
››  
:
››  !
ReferentialAction
››" 3
.
››3 4
Cascade
››4 ;
)
››; <
;
››< =
}
ﬁﬁ 
)
ﬁﬁ 
.
ﬂﬂ 

Annotation
ﬂﬂ 
(
ﬂﬂ 
$str
ﬂﬂ +
,
ﬂﬂ+ ,
$str
ﬂﬂ- 6
)
ﬂﬂ6 7
;
ﬂﬂ7 8
migrationBuilder
·· 
.
·· 
CreateTable
·· (
(
··( )
name
‚‚ 
:
‚‚ 
$str
‚‚ '
,
‚‚' (
columns
„„ 
:
„„ 
table
„„ 
=>
„„ !
new
„„" %
{
‰‰ 
UserId
ÂÂ 
=
ÂÂ 
table
ÂÂ "
.
ÂÂ" #
Column
ÂÂ# )
<
ÂÂ) *
string
ÂÂ* 0
>
ÂÂ0 1
(
ÂÂ1 2
type
ÂÂ2 6
:
ÂÂ6 7
$str
ÂÂ8 F
,
ÂÂF G
nullable
ÂÂH P
:
ÂÂP Q
false
ÂÂR W
)
ÂÂW X
,
ÂÂX Y
RoleId
ÊÊ 
=
ÊÊ 
table
ÊÊ "
.
ÊÊ" #
Column
ÊÊ# )
<
ÊÊ) *
string
ÊÊ* 0
>
ÊÊ0 1
(
ÊÊ1 2
type
ÊÊ2 6
:
ÊÊ6 7
$str
ÊÊ8 F
,
ÊÊF G
nullable
ÊÊH P
:
ÊÊP Q
false
ÊÊR W
)
ÊÊW X
}
ÁÁ 
,
ÁÁ 
constraints
ËË 
:
ËË 
table
ËË "
=>
ËË# %
{
ÈÈ 
table
ÍÍ 
.
ÍÍ 

PrimaryKey
ÍÍ $
(
ÍÍ$ %
$str
ÍÍ% 9
,
ÍÍ9 :
x
ÍÍ; <
=>
ÍÍ= ?
new
ÍÍ@ C
{
ÍÍD E
x
ÍÍF G
.
ÍÍG H
UserId
ÍÍH N
,
ÍÍN O
x
ÍÍP Q
.
ÍÍQ R
RoleId
ÍÍR X
}
ÍÍY Z
)
ÍÍZ [
;
ÍÍ[ \
table
ÎÎ 
.
ÎÎ 

ForeignKey
ÎÎ $
(
ÎÎ$ %
name
ÏÏ 
:
ÏÏ 
$str
ÏÏ E
,
ÏÏE F
column
ÌÌ 
:
ÌÌ 
x
ÌÌ  !
=>
ÌÌ" $
x
ÌÌ% &
.
ÌÌ& '
RoleId
ÌÌ' -
,
ÌÌ- .
principalTable
ÓÓ &
:
ÓÓ& '
$str
ÓÓ( 5
,
ÓÓ5 6
principalColumn
ÔÔ '
:
ÔÔ' (
$str
ÔÔ) -
,
ÔÔ- .
onDelete
  
:
  !
ReferentialAction
" 3
.
3 4
Cascade
4 ;
)
; <
;
< =
table
ÒÒ 
.
ÒÒ 

ForeignKey
ÒÒ $
(
ÒÒ$ %
name
ÚÚ 
:
ÚÚ 
$str
ÚÚ E
,
ÚÚE F
column
ÛÛ 
:
ÛÛ 
x
ÛÛ  !
=>
ÛÛ" $
x
ÛÛ% &
.
ÛÛ& '
UserId
ÛÛ' -
,
ÛÛ- .
principalTable
ÙÙ &
:
ÙÙ& '
$str
ÙÙ( 5
,
ÙÙ5 6
principalColumn
ıı '
:
ıı' (
$str
ıı) -
,
ıı- .
onDelete
ˆˆ  
:
ˆˆ  !
ReferentialAction
ˆˆ" 3
.
ˆˆ3 4
Cascade
ˆˆ4 ;
)
ˆˆ; <
;
ˆˆ< =
}
˜˜ 
)
˜˜ 
.
¯¯ 

Annotation
¯¯ 
(
¯¯ 
$str
¯¯ +
,
¯¯+ ,
$str
¯¯- 6
)
¯¯6 7
;
¯¯7 8
migrationBuilder
˙˙ 
.
˙˙ 
CreateTable
˙˙ (
(
˙˙( )
name
˚˚ 
:
˚˚ 
$str
˚˚ (
,
˚˚( )
columns
¸¸ 
:
¸¸ 
table
¸¸ 
=>
¸¸ !
new
¸¸" %
{
˝˝ 
UserId
˛˛ 
=
˛˛ 
table
˛˛ "
.
˛˛" #
Column
˛˛# )
<
˛˛) *
string
˛˛* 0
>
˛˛0 1
(
˛˛1 2
type
˛˛2 6
:
˛˛6 7
$str
˛˛8 F
,
˛˛F G
nullable
˛˛H P
:
˛˛P Q
false
˛˛R W
)
˛˛W X
,
˛˛X Y
LoginProvider
ˇˇ !
=
ˇˇ" #
table
ˇˇ$ )
.
ˇˇ) *
Column
ˇˇ* 0
<
ˇˇ0 1
string
ˇˇ1 7
>
ˇˇ7 8
(
ˇˇ8 9
type
ˇˇ9 =
:
ˇˇ= >
$str
ˇˇ? M
,
ˇˇM N
nullable
ˇˇO W
:
ˇˇW X
false
ˇˇY ^
)
ˇˇ^ _
,
ˇˇ_ `
Name
ÄÄ 
=
ÄÄ 
table
ÄÄ  
.
ÄÄ  !
Column
ÄÄ! '
<
ÄÄ' (
string
ÄÄ( .
>
ÄÄ. /
(
ÄÄ/ 0
type
ÄÄ0 4
:
ÄÄ4 5
$str
ÄÄ6 D
,
ÄÄD E
nullable
ÄÄF N
:
ÄÄN O
false
ÄÄP U
)
ÄÄU V
,
ÄÄV W
Value
ÅÅ 
=
ÅÅ 
table
ÅÅ !
.
ÅÅ! "
Column
ÅÅ" (
<
ÅÅ( )
string
ÅÅ) /
>
ÅÅ/ 0
(
ÅÅ0 1
type
ÅÅ1 5
:
ÅÅ5 6
$str
ÅÅ7 A
,
ÅÅA B
nullable
ÅÅC K
:
ÅÅK L
true
ÅÅM Q
)
ÅÅQ R
}
ÇÇ 
,
ÇÇ 
constraints
ÉÉ 
:
ÉÉ 
table
ÉÉ "
=>
ÉÉ# %
{
ÑÑ 
table
ÖÖ 
.
ÖÖ 

PrimaryKey
ÖÖ $
(
ÖÖ$ %
$str
ÖÖ% :
,
ÖÖ: ;
x
ÖÖ< =
=>
ÖÖ> @
new
ÖÖA D
{
ÖÖE F
x
ÖÖG H
.
ÖÖH I
UserId
ÖÖI O
,
ÖÖO P
x
ÖÖQ R
.
ÖÖR S
LoginProvider
ÖÖS `
,
ÖÖ` a
x
ÖÖb c
.
ÖÖc d
Name
ÖÖd h
}
ÖÖi j
)
ÖÖj k
;
ÖÖk l
table
ÜÜ 
.
ÜÜ 

ForeignKey
ÜÜ $
(
ÜÜ$ %
name
áá 
:
áá 
$str
áá F
,
ááF G
column
àà 
:
àà 
x
àà  !
=>
àà" $
x
àà% &
.
àà& '
UserId
àà' -
,
àà- .
principalTable
ââ &
:
ââ& '
$str
ââ( 5
,
ââ5 6
principalColumn
ää '
:
ää' (
$str
ää) -
,
ää- .
onDelete
ãã  
:
ãã  !
ReferentialAction
ãã" 3
.
ãã3 4
Cascade
ãã4 ;
)
ãã; <
;
ãã< =
}
åå 
)
åå 
.
çç 

Annotation
çç 
(
çç 
$str
çç +
,
çç+ ,
$str
çç- 6
)
çç6 7
;
çç7 8
migrationBuilder
èè 
.
èè 
CreateTable
èè (
(
èè( )
name
êê 
:
êê 
$str
êê  
,
êê  !
columns
ëë 
:
ëë 
table
ëë 
=>
ëë !
new
ëë" %
{
íí 
Id
ìì 
=
ìì 
table
ìì 
.
ìì 
Column
ìì %
<
ìì% &
int
ìì& )
>
ìì) *
(
ìì* +
type
ìì+ /
:
ìì/ 0
$str
ìì1 6
,
ìì6 7
nullable
ìì8 @
:
ìì@ A
false
ììB G
)
ììG H
.
îî 

Annotation
îî #
(
îî# $
$str
îî$ C
,
îîC D*
MySQLValueGenerationStrategy
îîE a
.
îîa b
IdentityColumn
îîb p
)
îîp q
,
îîq r
UserId
ïï 
=
ïï 
table
ïï "
.
ïï" #
Column
ïï# )
<
ïï) *
string
ïï* 0
>
ïï0 1
(
ïï1 2
type
ïï2 6
:
ïï6 7
$str
ïï8 B
,
ïïB C
nullable
ïïD L
:
ïïL M
false
ïïN S
)
ïïS T
,
ïïT U
UserName
ññ 
=
ññ 
table
ññ $
.
ññ$ %
Column
ññ% +
<
ññ+ ,
string
ññ, 2
>
ññ2 3
(
ññ3 4
type
ññ4 8
:
ññ8 9
$str
ññ: D
,
ññD E
nullable
ññF N
:
ññN O
false
ññP U
)
ññU V
,
ññV W
	FirstName
óó 
=
óó 
table
óó  %
.
óó% &
Column
óó& ,
<
óó, -
string
óó- 3
>
óó3 4
(
óó4 5
type
óó5 9
:
óó9 :
$str
óó; E
,
óóE F
nullable
óóG O
:
óóO P
false
óóQ V
)
óóV W
,
óóW X
LastName
òò 
=
òò 
table
òò $
.
òò$ %
Column
òò% +
<
òò+ ,
string
òò, 2
>
òò2 3
(
òò3 4
type
òò4 8
:
òò8 9
$str
òò: D
,
òòD E
nullable
òòF N
:
òòN O
false
òòP U
)
òòU V
,
òòV W
DateOfBirth
ôô 
=
ôô  !
table
ôô" '
.
ôô' (
Column
ôô( .
<
ôô. /
DateTime
ôô/ 7
>
ôô7 8
(
ôô8 9
type
ôô9 =
:
ôô= >
$str
ôô? L
,
ôôL M
nullable
ôôN V
:
ôôV W
false
ôôX ]
)
ôô] ^
,
ôô^ _
Gender
öö 
=
öö 
table
öö "
.
öö" #
Column
öö# )
<
öö) *
int
öö* -
>
öö- .
(
öö. /
type
öö/ 3
:
öö3 4
$str
öö5 :
,
öö: ;
nullable
öö< D
:
ööD E
true
ööF J
)
ööJ K
,
ööK L"
CommunicationLevelId
õõ (
=
õõ) *
table
õõ+ 0
.
õõ0 1
Column
õõ1 7
<
õõ7 8
int
õõ8 ;
>
õõ; <
(
õõ< =
type
õõ= A
:
õõA B
$str
õõC H
,
õõH I
nullable
õõJ R
:
õõR S
true
õõT X
)
õõX Y
}
úú 
,
úú 
constraints
ùù 
:
ùù 
table
ùù "
=>
ùù# %
{
ûû 
table
üü 
.
üü 

PrimaryKey
üü $
(
üü$ %
$str
üü% 2
,
üü2 3
x
üü4 5
=>
üü6 8
x
üü9 :
.
üü: ;
Id
üü; =
)
üü= >
;
üü> ?
table
†† 
.
†† 

ForeignKey
†† $
(
††$ %
name
°° 
:
°° 
$str
°° T
,
°°T U
column
¢¢ 
:
¢¢ 
x
¢¢  !
=>
¢¢" $
x
¢¢% &
.
¢¢& '"
CommunicationLevelId
¢¢' ;
,
¢¢; <
principalTable
££ &
:
££& '
$str
££( =
,
££= >
principalColumn
§§ '
:
§§' (
$str
§§) -
)
§§- .
;
§§. /
}
•• 
)
•• 
.
¶¶ 

Annotation
¶¶ 
(
¶¶ 
$str
¶¶ +
,
¶¶+ ,
$str
¶¶- 6
)
¶¶6 7
;
¶¶7 8
migrationBuilder
®® 
.
®® 
CreateTable
®® (
(
®®( )
name
©© 
:
©© 
$str
©© !
,
©©! "
columns
™™ 
:
™™ 
table
™™ 
=>
™™ !
new
™™" %
{
´´ 
Id
¨¨ 
=
¨¨ 
table
¨¨ 
.
¨¨ 
Column
¨¨ %
<
¨¨% &
int
¨¨& )
>
¨¨) *
(
¨¨* +
type
¨¨+ /
:
¨¨/ 0
$str
¨¨1 6
,
¨¨6 7
nullable
¨¨8 @
:
¨¨@ A
false
¨¨B G
)
¨¨G H
.
≠≠ 

Annotation
≠≠ #
(
≠≠# $
$str
≠≠$ C
,
≠≠C D*
MySQLValueGenerationStrategy
≠≠E a
.
≠≠a b
IdentityColumn
≠≠b p
)
≠≠p q
,
≠≠q r
	PatientId
ÆÆ 
=
ÆÆ 
table
ÆÆ  %
.
ÆÆ% &
Column
ÆÆ& ,
<
ÆÆ, -
int
ÆÆ- 0
>
ÆÆ0 1
(
ÆÆ1 2
type
ÆÆ2 6
:
ÆÆ6 7
$str
ÆÆ8 =
,
ÆÆ= >
nullable
ÆÆ? G
:
ÆÆG H
false
ÆÆI N
)
ÆÆN O
,
ÆÆO P
Title
ØØ 
=
ØØ 
table
ØØ !
.
ØØ! "
Column
ØØ" (
<
ØØ( )
string
ØØ) /
>
ØØ/ 0
(
ØØ0 1
type
ØØ1 5
:
ØØ5 6
$str
ØØ7 E
,
ØØE F
	maxLength
ØØG P
:
ØØP Q
$num
ØØR U
,
ØØU V
nullable
ØØW _
:
ØØ_ `
false
ØØa f
)
ØØf g
,
ØØg h
Description
∞∞ 
=
∞∞  !
table
∞∞" '
.
∞∞' (
Column
∞∞( .
<
∞∞. /
string
∞∞/ 5
>
∞∞5 6
(
∞∞6 7
type
∞∞7 ;
:
∞∞; <
$str
∞∞= L
,
∞∞L M
	maxLength
∞∞N W
:
∞∞W X
$num
∞∞Y ]
,
∞∞] ^
nullable
∞∞_ g
:
∞∞g h
false
∞∞i n
)
∞∞n o
,
∞∞o p
IcdCode
±± 
=
±± 
table
±± #
.
±±# $
Column
±±$ *
<
±±* +
string
±±+ 1
>
±±1 2
(
±±2 3
type
±±3 7
:
±±7 8
$str
±±9 F
,
±±F G
	maxLength
±±H Q
:
±±Q R
$num
±±S U
,
±±U V
nullable
±±W _
:
±±_ `
false
±±a f
)
±±f g
,
±±g h
Severity
≤≤ 
=
≤≤ 
table
≤≤ $
.
≤≤$ %
Column
≤≤% +
<
≤≤+ ,
string
≤≤, 2
>
≤≤2 3
(
≤≤3 4
type
≤≤4 8
:
≤≤8 9
$str
≤≤: G
,
≤≤G H
	maxLength
≤≤I R
:
≤≤R S
$num
≤≤T V
,
≤≤V W
nullable
≤≤X `
:
≤≤` a
false
≤≤b g
)
≤≤g h
,
≤≤h i
SideLocalization
≥≥ $
=
≥≥% &
table
≥≥' ,
.
≥≥, -
Column
≥≥- 3
<
≥≥3 4
string
≥≥4 :
>
≥≥: ;
(
≥≥; <
type
≥≥< @
:
≥≥@ A
$str
≥≥B O
,
≥≥O P
	maxLength
≥≥Q Z
:
≥≥Z [
$num
≥≥\ ^
,
≥≥^ _
nullable
≥≥` h
:
≥≥h i
false
≥≥j o
)
≥≥o p
,
≥≥p q
ConditionStatus
¥¥ #
=
¥¥$ %
table
¥¥& +
.
¥¥+ ,
Column
¥¥, 2
<
¥¥2 3
int
¥¥3 6
>
¥¥6 7
(
¥¥7 8
type
¥¥8 <
:
¥¥< =
$str
¥¥> C
,
¥¥C D
nullable
¥¥E M
:
¥¥M N
false
¥¥O T
)
¥¥T U
,
¥¥U V
EntryBy
µµ 
=
µµ 
table
µµ #
.
µµ# $
Column
µµ$ *
<
µµ* +
int
µµ+ .
>
µµ. /
(
µµ/ 0
type
µµ0 4
:
µµ4 5
$str
µµ6 ;
,
µµ; <
nullable
µµ= E
:
µµE F
false
µµG L
)
µµL M
,
µµM N
AiExplanation
∂∂ !
=
∂∂" #
table
∂∂$ )
.
∂∂) *
Column
∂∂* 0
<
∂∂0 1
string
∂∂1 7
>
∂∂7 8
(
∂∂8 9
type
∂∂9 =
:
∂∂= >
$str
∂∂? I
,
∂∂I J
nullable
∂∂K S
:
∂∂S T
true
∂∂U Y
)
∂∂Y Z
,
∂∂Z [
MedicationText
∑∑ "
=
∑∑# $
table
∑∑% *
.
∑∑* +
Column
∑∑+ 1
<
∑∑1 2
string
∑∑2 8
>
∑∑8 9
(
∑∑9 :
type
∑∑: >
:
∑∑> ?
$str
∑∑@ N
,
∑∑N O
	maxLength
∑∑P Y
:
∑∑Y Z
$num
∑∑[ ^
,
∑∑^ _
nullable
∑∑` h
:
∑∑h i
false
∑∑j o
)
∑∑o p
,
∑∑p q
Symptoms
∏∏ 
=
∏∏ 
table
∏∏ $
.
∏∏$ %
Column
∏∏% +
<
∏∏+ ,
string
∏∏, 2
>
∏∏2 3
(
∏∏3 4
type
∏∏4 8
:
∏∏8 9
$str
∏∏: I
,
∏∏I J
	maxLength
∏∏K T
:
∏∏T U
$num
∏∏V Z
,
∏∏Z [
nullable
∏∏\ d
:
∏∏d e
false
∏∏f k
)
∏∏k l
,
∏∏l m
Findings
ππ 
=
ππ 
table
ππ $
.
ππ$ %
Column
ππ% +
<
ππ+ ,
string
ππ, 2
>
ππ2 3
(
ππ3 4
type
ππ4 8
:
ππ8 9
$str
ππ: I
,
ππI J
	maxLength
ππK T
:
ππT U
$num
ππV Z
,
ππZ [
nullable
ππ\ d
:
ππd e
false
ππf k
)
ππk l
,
ππl m!
TherapeuticMeasures
∫∫ '
=
∫∫( )
table
∫∫* /
.
∫∫/ 0
Column
∫∫0 6
<
∫∫6 7
string
∫∫7 =
>
∫∫= >
(
∫∫> ?
type
∫∫? C
:
∫∫C D
$str
∫∫E T
,
∫∫T U
	maxLength
∫∫V _
:
∫∫_ `
$num
∫∫a e
,
∫∫e f
nullable
∫∫g o
:
∫∫o p
false
∫∫q v
)
∫∫v w
,
∫∫w x
Note
ªª 
=
ªª 
table
ªª  
.
ªª  !
Column
ªª! '
<
ªª' (
string
ªª( .
>
ªª. /
(
ªª/ 0
type
ªª0 4
:
ªª4 5
$str
ªª6 D
,
ªªD E
	maxLength
ªªF O
:
ªªO P
$num
ªªQ T
,
ªªT U
nullable
ªªV ^
:
ªª^ _
true
ªª` d
)
ªªd e
,
ªªe f
DiagnosisDate
ºº !
=
ºº" #
table
ºº$ )
.
ºº) *
Column
ºº* 0
<
ºº0 1
DateTime
ºº1 9
>
ºº9 :
(
ºº: ;
type
ºº; ?
:
ºº? @
$str
ººA N
,
ººN O
nullable
ººP X
:
ººX Y
false
ººZ _
)
ºº_ `
,
ºº` a
	CreatedAt
ΩΩ 
=
ΩΩ 
table
ΩΩ  %
.
ΩΩ% &
Column
ΩΩ& ,
<
ΩΩ, -
DateTime
ΩΩ- 5
>
ΩΩ5 6
(
ΩΩ6 7
type
ΩΩ7 ;
:
ΩΩ; <
$str
ΩΩ= J
,
ΩΩJ K
nullable
ΩΩL T
:
ΩΩT U
false
ΩΩV [
)
ΩΩ[ \
,
ΩΩ\ ]
	UpdatedAt
ææ 
=
ææ 
table
ææ  %
.
ææ% &
Column
ææ& ,
<
ææ, -
DateTime
ææ- 5
>
ææ5 6
(
ææ6 7
type
ææ7 ;
:
ææ; <
$str
ææ= J
,
ææJ K
nullable
ææL T
:
ææT U
false
ææV [
)
ææ[ \
}
øø 
,
øø 
constraints
¿¿ 
:
¿¿ 
table
¿¿ "
=>
¿¿# %
{
¡¡ 
table
¬¬ 
.
¬¬ 

PrimaryKey
¬¬ $
(
¬¬$ %
$str
¬¬% 3
,
¬¬3 4
x
¬¬5 6
=>
¬¬7 9
x
¬¬: ;
.
¬¬; <
Id
¬¬< >
)
¬¬> ?
;
¬¬? @
table
√√ 
.
√√ 

ForeignKey
√√ $
(
√√$ %
name
ƒƒ 
:
ƒƒ 
$str
ƒƒ ?
,
ƒƒ? @
column
≈≈ 
:
≈≈ 
x
≈≈  !
=>
≈≈" $
x
≈≈% &
.
≈≈& '
	PatientId
≈≈' 0
,
≈≈0 1
principalTable
∆∆ &
:
∆∆& '
$str
∆∆( 2
,
∆∆2 3
principalColumn
«« '
:
««' (
$str
««) -
,
««- .
onDelete
»»  
:
»»  !
ReferentialAction
»»" 3
.
»»3 4
Cascade
»»4 ;
)
»»; <
;
»»< =
}
…… 
)
…… 
.
   

Annotation
   
(
   
$str
   +
,
  + ,
$str
  - 6
)
  6 7
;
  7 8
migrationBuilder
ÃÃ 
.
ÃÃ 
CreateTable
ÃÃ (
(
ÃÃ( )
name
ÕÕ 
:
ÕÕ 
$str
ÕÕ ,
,
ÕÕ, -
columns
ŒŒ 
:
ŒŒ 
table
ŒŒ 
=>
ŒŒ !
new
ŒŒ" %
{
œœ 
Id
–– 
=
–– 
table
–– 
.
–– 
Column
–– %
<
––% &
int
––& )
>
––) *
(
––* +
type
––+ /
:
––/ 0
$str
––1 6
,
––6 7
nullable
––8 @
:
––@ A
false
––B G
)
––G H
.
—— 

Annotation
—— #
(
——# $
$str
——$ C
,
——C D*
MySQLValueGenerationStrategy
——E a
.
——a b
IdentityColumn
——b p
)
——p q
,
——q r
	PatientId
““ 
=
““ 
table
““  %
.
““% &
Column
““& ,
<
““, -
int
““- 0
>
““0 1
(
““1 2
type
““2 6
:
““6 7
$str
““8 =
,
““= >
nullable
““? G
:
““G H
false
““I N
)
““N O
,
““O P
Relative
”” 
=
”” 
table
”” $
.
””$ %
Column
””% +
<
””+ ,
string
””, 2
>
””2 3
(
””3 4
type
””4 8
:
””8 9
$str
””: H
,
””H I
	maxLength
””J S
:
””S T
$num
””U X
,
””X Y
nullable
””Z b
:
””b c
false
””d i
)
””i j
,
””j k
	Diagnosis
‘‘ 
=
‘‘ 
table
‘‘  %
.
‘‘% &
Column
‘‘& ,
<
‘‘, -
string
‘‘- 3
>
‘‘3 4
(
‘‘4 5
type
‘‘5 9
:
‘‘9 :
$str
‘‘; I
,
‘‘I J
	maxLength
‘‘K T
:
‘‘T U
$num
‘‘V Y
,
‘‘Y Z
nullable
‘‘[ c
:
‘‘c d
false
‘‘e j
)
‘‘j k
,
‘‘k l
Comment
’’ 
=
’’ 
table
’’ #
.
’’# $
Column
’’$ *
<
’’* +
string
’’+ 1
>
’’1 2
(
’’2 3
type
’’3 7
:
’’7 8
$str
’’9 H
,
’’H I
	maxLength
’’J S
:
’’S T
$num
’’U Y
,
’’Y Z
nullable
’’[ c
:
’’c d
true
’’e i
)
’’i j
}
÷÷ 
,
÷÷ 
constraints
◊◊ 
:
◊◊ 
table
◊◊ "
=>
◊◊# %
{
ÿÿ 
table
ŸŸ 
.
ŸŸ 

PrimaryKey
ŸŸ $
(
ŸŸ$ %
$str
ŸŸ% >
,
ŸŸ> ?
x
ŸŸ@ A
=>
ŸŸB D
x
ŸŸE F
.
ŸŸF G
Id
ŸŸG I
)
ŸŸI J
;
ŸŸJ K
table
⁄⁄ 
.
⁄⁄ 

ForeignKey
⁄⁄ $
(
⁄⁄$ %
name
€€ 
:
€€ 
$str
€€ J
,
€€J K
column
‹‹ 
:
‹‹ 
x
‹‹  !
=>
‹‹" $
x
‹‹% &
.
‹‹& '
	PatientId
‹‹' 0
,
‹‹0 1
principalTable
›› &
:
››& '
$str
››( 2
,
››2 3
principalColumn
ﬁﬁ '
:
ﬁﬁ' (
$str
ﬁﬁ) -
,
ﬁﬁ- .
onDelete
ﬂﬂ  
:
ﬂﬂ  !
ReferentialAction
ﬂﬂ" 3
.
ﬂﬂ3 4
Cascade
ﬂﬂ4 ;
)
ﬂﬂ; <
;
ﬂﬂ< =
}
‡‡ 
)
‡‡ 
.
·· 

Annotation
·· 
(
·· 
$str
·· +
,
··+ ,
$str
··- 6
)
··6 7
;
··7 8
migrationBuilder
„„ 
.
„„ 
CreateTable
„„ (
(
„„( )
name
‰‰ 
:
‰‰ 
$str
‰‰ -
,
‰‰- .
columns
ÂÂ 
:
ÂÂ 
table
ÂÂ 
=>
ÂÂ !
new
ÂÂ" %
{
ÊÊ 
Id
ÁÁ 
=
ÁÁ 
table
ÁÁ 
.
ÁÁ 
Column
ÁÁ %
<
ÁÁ% &
int
ÁÁ& )
>
ÁÁ) *
(
ÁÁ* +
type
ÁÁ+ /
:
ÁÁ/ 0
$str
ÁÁ1 6
,
ÁÁ6 7
nullable
ÁÁ8 @
:
ÁÁ@ A
false
ÁÁB G
)
ÁÁG H
.
ËË 

Annotation
ËË #
(
ËË# $
$str
ËË$ C
,
ËËC D*
MySQLValueGenerationStrategy
ËËE a
.
ËËa b
IdentityColumn
ËËb p
)
ËËp q
,
ËËq r
	PatientId
ÈÈ 
=
ÈÈ 
table
ÈÈ  %
.
ÈÈ% &
Column
ÈÈ& ,
<
ÈÈ, -
int
ÈÈ- 0
>
ÈÈ0 1
(
ÈÈ1 2
type
ÈÈ2 6
:
ÈÈ6 7
$str
ÈÈ8 =
,
ÈÈ= >
nullable
ÈÈ? G
:
ÈÈG H
false
ÈÈI N
)
ÈÈN O
,
ÈÈO P
	ICD10Code
ÍÍ 
=
ÍÍ 
table
ÍÍ  %
.
ÍÍ% &
Column
ÍÍ& ,
<
ÍÍ, -
string
ÍÍ- 3
>
ÍÍ3 4
(
ÍÍ4 5
type
ÍÍ5 9
:
ÍÍ9 :
$str
ÍÍ; H
,
ÍÍH I
	maxLength
ÍÍJ S
:
ÍÍS T
$num
ÍÍU W
,
ÍÍW X
nullable
ÍÍY a
:
ÍÍa b
true
ÍÍc g
)
ÍÍg h
,
ÍÍh i
	Diagnosis
ÎÎ 
=
ÎÎ 
table
ÎÎ  %
.
ÎÎ% &
Column
ÎÎ& ,
<
ÎÎ, -
string
ÎÎ- 3
>
ÎÎ3 4
(
ÎÎ4 5
type
ÎÎ5 9
:
ÎÎ9 :
$str
ÎÎ; J
,
ÎÎJ K
	maxLength
ÎÎL U
:
ÎÎU V
$num
ÎÎW [
,
ÎÎ[ \
nullable
ÎÎ] e
:
ÎÎe f
false
ÎÎg l
)
ÎÎl m
,
ÎÎm n
Year
ÏÏ 
=
ÏÏ 
table
ÏÏ  
.
ÏÏ  !
Column
ÏÏ! '
<
ÏÏ' (
int
ÏÏ( +
>
ÏÏ+ ,
(
ÏÏ, -
type
ÏÏ- 1
:
ÏÏ1 2
$str
ÏÏ3 8
,
ÏÏ8 9
nullable
ÏÏ: B
:
ÏÏB C
false
ÏÏD I
)
ÏÏI J
,
ÏÏJ K
Status
ÌÌ 
=
ÌÌ 
table
ÌÌ "
.
ÌÌ" #
Column
ÌÌ# )
<
ÌÌ) *
int
ÌÌ* -
>
ÌÌ- .
(
ÌÌ. /
type
ÌÌ/ 3
:
ÌÌ3 4
$str
ÌÌ5 :
,
ÌÌ: ;
nullable
ÌÌ< D
:
ÌÌD E
false
ÌÌF K
)
ÌÌK L
,
ÌÌL M
Comment
ÓÓ 
=
ÓÓ 
table
ÓÓ #
.
ÓÓ# $
Column
ÓÓ$ *
<
ÓÓ* +
string
ÓÓ+ 1
>
ÓÓ1 2
(
ÓÓ2 3
type
ÓÓ3 7
:
ÓÓ7 8
$str
ÓÓ9 H
,
ÓÓH I
	maxLength
ÓÓJ S
:
ÓÓS T
$num
ÓÓU Y
,
ÓÓY Z
nullable
ÓÓ[ c
:
ÓÓc d
true
ÓÓe i
)
ÓÓi j
,
ÓÓj k
EntryBy
ÔÔ 
=
ÔÔ 
table
ÔÔ #
.
ÔÔ# $
Column
ÔÔ$ *
<
ÔÔ* +
int
ÔÔ+ .
>
ÔÔ. /
(
ÔÔ/ 0
type
ÔÔ0 4
:
ÔÔ4 5
$str
ÔÔ6 ;
,
ÔÔ; <
nullable
ÔÔ= E
:
ÔÔE F
false
ÔÔG L
)
ÔÔL M
,
ÔÔM N
AiExplanation
 !
=
" #
table
$ )
.
) *
Column
* 0
<
0 1
string
1 7
>
7 8
(
8 9
type
9 =
:
= >
$str
? I
,
I J
nullable
K S
:
S T
true
U Y
)
Y Z
}
ÒÒ 
,
ÒÒ 
constraints
ÚÚ 
:
ÚÚ 
table
ÚÚ "
=>
ÚÚ# %
{
ÛÛ 
table
ÙÙ 
.
ÙÙ 

PrimaryKey
ÙÙ $
(
ÙÙ$ %
$str
ÙÙ% ?
,
ÙÙ? @
x
ÙÙA B
=>
ÙÙC E
x
ÙÙF G
.
ÙÙG H
Id
ÙÙH J
)
ÙÙJ K
;
ÙÙK L
table
ıı 
.
ıı 

ForeignKey
ıı $
(
ıı$ %
name
ˆˆ 
:
ˆˆ 
$str
ˆˆ K
,
ˆˆK L
column
˜˜ 
:
˜˜ 
x
˜˜  !
=>
˜˜" $
x
˜˜% &
.
˜˜& '
	PatientId
˜˜' 0
,
˜˜0 1
principalTable
¯¯ &
:
¯¯& '
$str
¯¯( 2
,
¯¯2 3
principalColumn
˘˘ '
:
˘˘' (
$str
˘˘) -
,
˘˘- .
onDelete
˙˙  
:
˙˙  !
ReferentialAction
˙˙" 3
.
˙˙3 4
Cascade
˙˙4 ;
)
˙˙; <
;
˙˙< =
}
˚˚ 
)
˚˚ 
.
¸¸ 

Annotation
¸¸ 
(
¸¸ 
$str
¸¸ +
,
¸¸+ ,
$str
¸¸- 6
)
¸¸6 7
;
¸¸7 8
migrationBuilder
˛˛ 
.
˛˛ 
CreateTable
˛˛ (
(
˛˛( )
name
ˇˇ 
:
ˇˇ 
$str
ˇˇ &
,
ˇˇ& '
columns
ÄÄ 
:
ÄÄ 
table
ÄÄ 
=>
ÄÄ !
new
ÄÄ" %
{
ÅÅ 
Id
ÇÇ 
=
ÇÇ 
table
ÇÇ 
.
ÇÇ 
Column
ÇÇ %
<
ÇÇ% &
int
ÇÇ& )
>
ÇÇ) *
(
ÇÇ* +
type
ÇÇ+ /
:
ÇÇ/ 0
$str
ÇÇ1 6
,
ÇÇ6 7
nullable
ÇÇ8 @
:
ÇÇ@ A
false
ÇÇB G
)
ÇÇG H
.
ÉÉ 

Annotation
ÉÉ #
(
ÉÉ# $
$str
ÉÉ$ C
,
ÉÉC D*
MySQLValueGenerationStrategy
ÉÉE a
.
ÉÉa b
IdentityColumn
ÉÉb p
)
ÉÉp q
,
ÉÉq r
	PatientId
ÑÑ 
=
ÑÑ 
table
ÑÑ  %
.
ÑÑ% &
Column
ÑÑ& ,
<
ÑÑ, -
int
ÑÑ- 0
>
ÑÑ0 1
(
ÑÑ1 2
type
ÑÑ2 6
:
ÑÑ6 7
$str
ÑÑ8 =
,
ÑÑ= >
nullable
ÑÑ? G
:
ÑÑG H
false
ÑÑI N
)
ÑÑN O
,
ÑÑO P
AiSuggestion
ÖÖ  
=
ÖÖ! "
table
ÖÖ# (
.
ÖÖ( )
Column
ÖÖ) /
<
ÖÖ/ 0
string
ÖÖ0 6
>
ÖÖ6 7
(
ÖÖ7 8
type
ÖÖ8 <
:
ÖÖ< =
$str
ÖÖ> M
,
ÖÖM N
	maxLength
ÖÖO X
:
ÖÖX Y
$num
ÖÖZ ^
,
ÖÖ^ _
nullable
ÖÖ` h
:
ÖÖh i
true
ÖÖj n
)
ÖÖn o
,
ÖÖo p
ReworkedText
ÜÜ  
=
ÜÜ! "
table
ÜÜ# (
.
ÜÜ( )
Column
ÜÜ) /
<
ÜÜ/ 0
string
ÜÜ0 6
>
ÜÜ6 7
(
ÜÜ7 8
type
ÜÜ8 <
:
ÜÜ< =
$str
ÜÜ> M
,
ÜÜM N
	maxLength
ÜÜO X
:
ÜÜX Y
$num
ÜÜZ ^
,
ÜÜ^ _
nullable
ÜÜ` h
:
ÜÜh i
true
ÜÜj n
)
ÜÜn o
,
ÜÜo p
	Startdate
áá 
=
áá 
table
áá  %
.
áá% &
Column
áá& ,
<
áá, -
DateTime
áá- 5
>
áá5 6
(
áá6 7
type
áá7 ;
:
áá; <
$str
áá= J
,
ááJ K
nullable
ááL T
:
ááT U
false
ááV [
)
áá[ \
,
áá\ ]
Status
àà 
=
àà 
table
àà "
.
àà" #
Column
àà# )
<
àà) *
int
àà* -
>
àà- .
(
àà. /
type
àà/ 3
:
àà3 4
$str
àà5 :
,
àà: ;
nullable
àà< D
:
ààD E
false
ààF K
)
ààK L
,
ààL M
Subject
ââ 
=
ââ 
table
ââ #
.
ââ# $
Column
ââ$ *
<
ââ* +
string
ââ+ 1
>
ââ1 2
(
ââ2 3
type
ââ3 7
:
ââ7 8
$str
ââ9 G
,
ââG H
	maxLength
ââI R
:
ââR S
$num
ââT W
,
ââW X
nullable
ââY a
:
ââa b
false
ââc h
)
ââh i
,
ââi j
ReciverName
ää 
=
ää  !
table
ää" '
.
ää' (
Column
ää( .
<
ää. /
string
ää/ 5
>
ää5 6
(
ää6 7
type
ää7 ;
:
ää; <
$str
ää= K
,
ääK L
	maxLength
ääM V
:
ääV W
$num
ääX [
,
ää[ \
nullable
ää] e
:
ääe f
false
ääg l
)
ääl m
,
ääm n
	CreatedAt
ãã 
=
ãã 
table
ãã  %
.
ãã% &
Column
ãã& ,
<
ãã, -
DateTime
ãã- 5
>
ãã5 6
(
ãã6 7
type
ãã7 ;
:
ãã; <
$str
ãã= J
,
ããJ K
nullable
ããL T
:
ããT U
false
ããV [
)
ãã[ \
,
ãã\ ]
	UpdatedAt
åå 
=
åå 
table
åå  %
.
åå% &
Column
åå& ,
<
åå, -
DateTime
åå- 5
>
åå5 6
(
åå6 7
type
åå7 ;
:
åå; <
$str
åå= J
,
ååJ K
nullable
ååL T
:
ååT U
false
ååV [
)
åå[ \
}
çç 
,
çç 
constraints
éé 
:
éé 
table
éé "
=>
éé# %
{
èè 
table
êê 
.
êê 

PrimaryKey
êê $
(
êê$ %
$str
êê% 8
,
êê8 9
x
êê: ;
=>
êê< >
x
êê? @
.
êê@ A
Id
êêA C
)
êêC D
;
êêD E
table
ëë 
.
ëë 

ForeignKey
ëë $
(
ëë$ %
name
íí 
:
íí 
$str
íí D
,
ííD E
column
ìì 
:
ìì 
x
ìì  !
=>
ìì" $
x
ìì% &
.
ìì& '
	PatientId
ìì' 0
,
ìì0 1
principalTable
îî &
:
îî& '
$str
îî( 2
,
îî2 3
principalColumn
ïï '
:
ïï' (
$str
ïï) -
,
ïï- .
onDelete
ññ  
:
ññ  !
ReferentialAction
ññ" 3
.
ññ3 4
Cascade
ññ4 ;
)
ññ; <
;
ññ< =
}
óó 
)
óó 
.
òò 

Annotation
òò 
(
òò 
$str
òò +
,
òò+ ,
$str
òò- 6
)
òò6 7
;
òò7 8
migrationBuilder
öö 
.
öö 
CreateTable
öö (
(
öö( )
name
õõ 
:
õõ 
$str
õõ #
,
õõ# $
columns
úú 
:
úú 
table
úú 
=>
úú !
new
úú" %
{
ùù 
Id
ûû 
=
ûû 
table
ûû 
.
ûû 
Column
ûû %
<
ûû% &
int
ûû& )
>
ûû) *
(
ûû* +
type
ûû+ /
:
ûû/ 0
$str
ûû1 6
,
ûû6 7
nullable
ûû8 @
:
ûû@ A
false
ûûB G
)
ûûG H
.
üü 

Annotation
üü #
(
üü# $
$str
üü$ C
,
üüC D*
MySQLValueGenerationStrategy
üüE a
.
üüa b
IdentityColumn
üüb p
)
üüp q
,
üüq r
	PatientId
†† 
=
†† 
table
††  %
.
††% &
Column
††& ,
<
††, -
int
††- 0
>
††0 1
(
††1 2
type
††2 6
:
††6 7
$str
††8 =
,
††= >
nullable
††? G
:
††G H
false
††I N
)
††N O
,
††O P
Name
°° 
=
°° 
table
°°  
.
°°  !
Column
°°! '
<
°°' (
string
°°( .
>
°°. /
(
°°/ 0
type
°°0 4
:
°°4 5
$str
°°6 D
,
°°D E
	maxLength
°°F O
:
°°O P
$num
°°Q T
,
°°T U
nullable
°°V ^
:
°°^ _
false
°°` e
)
°°e f
,
°°f g
Dosage
¢¢ 
=
¢¢ 
table
¢¢ "
.
¢¢" #
Column
¢¢# )
<
¢¢) *
string
¢¢* 0
>
¢¢0 1
(
¢¢1 2
type
¢¢2 6
:
¢¢6 7
$str
¢¢8 F
,
¢¢F G
	maxLength
¢¢H Q
:
¢¢Q R
$num
¢¢S V
,
¢¢V W
nullable
¢¢X `
:
¢¢` a
true
¢¢b f
)
¢¢f g
,
¢¢g h
IntakeFrequency
££ #
=
££$ %
table
££& +
.
££+ ,
Column
££, 2
<
££2 3
string
££3 9
>
££9 :
(
££: ;
type
££; ?
:
££? @
$str
££A O
,
££O P
	maxLength
££Q Z
:
££Z [
$num
££\ _
,
££_ `
nullable
££a i
:
££i j
true
££k o
)
££o p
,
££p q
IntakeStartDate
§§ #
=
§§$ %
table
§§& +
.
§§+ ,
Column
§§, 2
<
§§2 3
DateTime
§§3 ;
>
§§; <
(
§§< =
type
§§= A
:
§§A B
$str
§§C P
,
§§P Q
nullable
§§R Z
:
§§Z [
true
§§\ `
)
§§` a
,
§§a b
DurationInDays
•• "
=
••# $
table
••% *
.
••* +
Column
••+ 1
<
••1 2
int
••2 5
>
••5 6
(
••6 7
type
••7 ;
:
••; <
$str
••= B
,
••B C
nullable
••D L
:
••L M
false
••N S
)
••S T
,
••T U

Indication
¶¶ 
=
¶¶  
table
¶¶! &
.
¶¶& '
Column
¶¶' -
<
¶¶- .
string
¶¶. 4
>
¶¶4 5
(
¶¶5 6
type
¶¶6 :
:
¶¶: ;
$str
¶¶< J
,
¶¶J K
	maxLength
¶¶L U
:
¶¶U V
$num
¶¶W Z
,
¶¶Z [
nullable
¶¶\ d
:
¶¶d e
true
¶¶f j
)
¶¶j k
,
¶¶k l
AtcCode
ßß 
=
ßß 
table
ßß #
.
ßß# $
Column
ßß$ *
<
ßß* +
string
ßß+ 1
>
ßß1 2
(
ßß2 3
type
ßß3 7
:
ßß7 8
$str
ßß9 F
,
ßßF G
	maxLength
ßßH Q
:
ßßQ R
$num
ßßS U
,
ßßU V
nullable
ßßW _
:
ßß_ `
true
ßßa e
)
ßße f
,
ßßf g
EntryBy
®® 
=
®® 
table
®® #
.
®®# $
Column
®®$ *
<
®®* +
int
®®+ .
>
®®. /
(
®®/ 0
type
®®0 4
:
®®4 5
$str
®®6 ;
,
®®; <
nullable
®®= E
:
®®E F
true
®®G K
)
®®K L
,
®®L M
Notes
©© 
=
©© 
table
©© !
.
©©! "
Column
©©" (
<
©©( )
string
©©) /
>
©©/ 0
(
©©0 1
type
©©1 5
:
©©5 6
$str
©©7 E
,
©©E F
	maxLength
©©G P
:
©©P Q
$num
©©R U
,
©©U V
nullable
©©W _
:
©©_ `
true
©©a e
)
©©e f
}
™™ 
,
™™ 
constraints
´´ 
:
´´ 
table
´´ "
=>
´´# %
{
¨¨ 
table
≠≠ 
.
≠≠ 

PrimaryKey
≠≠ $
(
≠≠$ %
$str
≠≠% 5
,
≠≠5 6
x
≠≠7 8
=>
≠≠9 ;
x
≠≠< =
.
≠≠= >
Id
≠≠> @
)
≠≠@ A
;
≠≠A B
table
ÆÆ 
.
ÆÆ 

ForeignKey
ÆÆ $
(
ÆÆ$ %
name
ØØ 
:
ØØ 
$str
ØØ A
,
ØØA B
column
∞∞ 
:
∞∞ 
x
∞∞  !
=>
∞∞" $
x
∞∞% &
.
∞∞& '
	PatientId
∞∞' 0
,
∞∞0 1
principalTable
±± &
:
±±& '
$str
±±( 2
,
±±2 3
principalColumn
≤≤ '
:
≤≤' (
$str
≤≤) -
,
≤≤- .
onDelete
≥≥  
:
≥≥  !
ReferentialAction
≥≥" 3
.
≥≥3 4
Cascade
≥≥4 ;
)
≥≥; <
;
≥≥< =
}
¥¥ 
)
¥¥ 
.
µµ 

Annotation
µµ 
(
µµ 
$str
µµ +
,
µµ+ ,
$str
µµ- 6
)
µµ6 7
;
µµ7 8
migrationBuilder
∑∑ 
.
∑∑ 
CreateTable
∑∑ (
(
∑∑( )
name
∏∏ 
:
∏∏ 
$str
∏∏ '
,
∏∏' (
columns
ππ 
:
ππ 
table
ππ 
=>
ππ !
new
ππ" %
{
∫∫ 
Id
ªª 
=
ªª 
table
ªª 
.
ªª 
Column
ªª %
<
ªª% &
int
ªª& )
>
ªª) *
(
ªª* +
type
ªª+ /
:
ªª/ 0
$str
ªª1 6
,
ªª6 7
nullable
ªª8 @
:
ªª@ A
false
ªªB G
)
ªªG H
.
ºº 

Annotation
ºº #
(
ºº# $
$str
ºº$ C
,
ººC D*
MySQLValueGenerationStrategy
ººE a
.
ººa b
IdentityColumn
ººb p
)
ººp q
,
ººq r
	PatientId
ΩΩ 
=
ΩΩ 
table
ΩΩ  %
.
ΩΩ% &
Column
ΩΩ& ,
<
ΩΩ, -
int
ΩΩ- 0
>
ΩΩ0 1
(
ΩΩ1 2
type
ΩΩ2 6
:
ΩΩ6 7
$str
ΩΩ8 =
,
ΩΩ= >
nullable
ΩΩ? G
:
ΩΩG H
false
ΩΩI N
)
ΩΩN O
,
ΩΩO P
SymptomName
ææ 
=
ææ  !
table
ææ" '
.
ææ' (
Column
ææ( .
<
ææ. /
string
ææ/ 5
>
ææ5 6
(
ææ6 7
type
ææ7 ;
:
ææ; <
$str
ææ= K
,
ææK L
	maxLength
ææM V
:
ææV W
$num
ææX [
,
ææ[ \
nullable
ææ] e
:
ææe f
true
ææg k
)
ææk l
,
ææl m!
SymptomDefinitionId
øø '
=
øø( )
table
øø* /
.
øø/ 0
Column
øø0 6
<
øø6 7
int
øø7 :
>
øø: ;
(
øø; <
type
øø< @
:
øø@ A
$str
øøB G
,
øøG H
nullable
øøI Q
:
øøQ R
true
øøS W
)
øøW X
,
øøX Y
OccurrenceTime
¿¿ "
=
¿¿# $
table
¿¿% *
.
¿¿* +
Column
¿¿+ 1
<
¿¿1 2
DateTime
¿¿2 :
>
¿¿: ;
(
¿¿; <
type
¿¿< @
:
¿¿@ A
$str
¿¿B O
,
¿¿O P
nullable
¿¿Q Y
:
¿¿Y Z
false
¿¿[ `
)
¿¿` a
,
¿¿a b
	Intensity
¡¡ 
=
¡¡ 
table
¡¡  %
.
¡¡% &
Column
¡¡& ,
<
¡¡, -
int
¡¡- 0
>
¡¡0 1
(
¡¡1 2
type
¡¡2 6
:
¡¡6 7
$str
¡¡8 =
,
¡¡= >
nullable
¡¡? G
:
¡¡G H
false
¡¡I N
)
¡¡N O
,
¡¡O P
Duration
¬¬ 
=
¬¬ 
table
¬¬ $
.
¬¬$ %
Column
¬¬% +
<
¬¬+ ,
string
¬¬, 2
>
¬¬2 3
(
¬¬3 4
type
¬¬4 8
:
¬¬8 9
$str
¬¬: H
,
¬¬H I
	maxLength
¬¬J S
:
¬¬S T
$num
¬¬U X
,
¬¬X Y
nullable
¬¬Z b
:
¬¬b c
true
¬¬d h
)
¬¬h i
,
¬¬i j
PossibleTrigger
√√ #
=
√√$ %
table
√√& +
.
√√+ ,
Column
√√, 2
<
√√2 3
string
√√3 9
>
√√9 :
(
√√: ;
type
√√; ?
:
√√? @
$str
√√A O
,
√√O P
	maxLength
√√Q Z
:
√√Z [
$num
√√\ _
,
√√_ `
nullable
√√a i
:
√√i j
true
√√k o
)
√√o p
,
√√p q
Notes
ƒƒ 
=
ƒƒ 
table
ƒƒ !
.
ƒƒ! "
Column
ƒƒ" (
<
ƒƒ( )
string
ƒƒ) /
>
ƒƒ/ 0
(
ƒƒ0 1
type
ƒƒ1 5
:
ƒƒ5 6
$str
ƒƒ7 F
,
ƒƒF G
	maxLength
ƒƒH Q
:
ƒƒQ R
$num
ƒƒS W
,
ƒƒW X
nullable
ƒƒY a
:
ƒƒa b
true
ƒƒc g
)
ƒƒg h
,
ƒƒh i
Details
≈≈ 
=
≈≈ 
table
≈≈ #
.
≈≈# $
Column
≈≈$ *
<
≈≈* +
string
≈≈+ 1
>
≈≈1 2
(
≈≈2 3
type
≈≈3 7
:
≈≈7 8
$str
≈≈9 ?
,
≈≈? @
nullable
≈≈A I
:
≈≈I J
false
≈≈K P
)
≈≈P Q
,
≈≈Q R
	CreatedAt
∆∆ 
=
∆∆ 
table
∆∆  %
.
∆∆% &
Column
∆∆& ,
<
∆∆, -
DateTime
∆∆- 5
>
∆∆5 6
(
∆∆6 7
type
∆∆7 ;
:
∆∆; <
$str
∆∆= J
,
∆∆J K
nullable
∆∆L T
:
∆∆T U
false
∆∆V [
)
∆∆[ \
}
«« 
,
«« 
constraints
»» 
:
»» 
table
»» "
=>
»»# %
{
…… 
table
   
.
   

PrimaryKey
   $
(
  $ %
$str
  % 9
,
  9 :
x
  ; <
=>
  = ?
x
  @ A
.
  A B
Id
  B D
)
  D E
;
  E F
table
ÀÀ 
.
ÀÀ 

ForeignKey
ÀÀ $
(
ÀÀ$ %
name
ÃÃ 
:
ÃÃ 
$str
ÃÃ E
,
ÃÃE F
column
ÕÕ 
:
ÕÕ 
x
ÕÕ  !
=>
ÕÕ" $
x
ÕÕ% &
.
ÕÕ& '
	PatientId
ÕÕ' 0
,
ÕÕ0 1
principalTable
ŒŒ &
:
ŒŒ& '
$str
ŒŒ( 2
,
ŒŒ2 3
principalColumn
œœ '
:
œœ' (
$str
œœ) -
,
œœ- .
onDelete
––  
:
––  !
ReferentialAction
––" 3
.
––3 4
Cascade
––4 ;
)
––; <
;
––< =
table
—— 
.
—— 

ForeignKey
—— $
(
——$ %
name
““ 
:
““ 
$str
““ Y
,
““Y Z
column
”” 
:
”” 
x
””  !
=>
””" $
x
””% &
.
””& '!
SymptomDefinitionId
””' :
,
””: ;
principalTable
‘‘ &
:
‘‘& '
$str
‘‘( <
,
‘‘< =
principalColumn
’’ '
:
’’' (
$str
’’) -
)
’’- .
;
’’. /
}
÷÷ 
)
÷÷ 
.
◊◊ 

Annotation
◊◊ 
(
◊◊ 
$str
◊◊ +
,
◊◊+ ,
$str
◊◊- 6
)
◊◊6 7
;
◊◊7 8
migrationBuilder
ŸŸ 
.
ŸŸ 
CreateIndex
ŸŸ (
(
ŸŸ( )
name
⁄⁄ 
:
⁄⁄ 
$str
⁄⁄ 2
,
⁄⁄2 3
table
€€ 
:
€€ 
$str
€€ )
,
€€) *
column
‹‹ 
:
‹‹ 
$str
‹‹  
)
‹‹  !
;
‹‹! "
migrationBuilder
ﬁﬁ 
.
ﬁﬁ 
CreateIndex
ﬁﬁ (
(
ﬁﬁ( )
name
ﬂﬂ 
:
ﬂﬂ 
$str
ﬂﬂ %
,
ﬂﬂ% &
table
‡‡ 
:
‡‡ 
$str
‡‡ $
,
‡‡$ %
column
·· 
:
·· 
$str
·· (
,
··( )
unique
‚‚ 
:
‚‚ 
true
‚‚ 
)
‚‚ 
;
‚‚ 
migrationBuilder
‰‰ 
.
‰‰ 
CreateIndex
‰‰ (
(
‰‰( )
name
ÂÂ 
:
ÂÂ 
$str
ÂÂ 2
,
ÂÂ2 3
table
ÊÊ 
:
ÊÊ 
$str
ÊÊ )
,
ÊÊ) *
column
ÁÁ 
:
ÁÁ 
$str
ÁÁ  
)
ÁÁ  !
;
ÁÁ! "
migrationBuilder
ÈÈ 
.
ÈÈ 
CreateIndex
ÈÈ (
(
ÈÈ( )
name
ÍÍ 
:
ÍÍ 
$str
ÍÍ 2
,
ÍÍ2 3
table
ÎÎ 
:
ÎÎ 
$str
ÎÎ )
,
ÎÎ) *
column
ÏÏ 
:
ÏÏ 
$str
ÏÏ  
)
ÏÏ  !
;
ÏÏ! "
migrationBuilder
ÓÓ 
.
ÓÓ 
CreateIndex
ÓÓ (
(
ÓÓ( )
name
ÔÔ 
:
ÔÔ 
$str
ÔÔ 1
,
ÔÔ1 2
table
 
:
 
$str
 (
,
( )
column
ÒÒ 
:
ÒÒ 
$str
ÒÒ  
)
ÒÒ  !
;
ÒÒ! "
migrationBuilder
ÛÛ 
.
ÛÛ 
CreateIndex
ÛÛ (
(
ÛÛ( )
name
ÙÙ 
:
ÙÙ 
$str
ÙÙ "
,
ÙÙ" #
table
ıı 
:
ıı 
$str
ıı $
,
ıı$ %
column
ˆˆ 
:
ˆˆ 
$str
ˆˆ )
)
ˆˆ) *
;
ˆˆ* +
migrationBuilder
¯¯ 
.
¯¯ 
CreateIndex
¯¯ (
(
¯¯( )
name
˘˘ 
:
˘˘ 
$str
˘˘ %
,
˘˘% &
table
˙˙ 
:
˙˙ 
$str
˙˙ $
,
˙˙$ %
column
˚˚ 
:
˚˚ 
$str
˚˚ ,
,
˚˚, -
unique
¸¸ 
:
¸¸ 
true
¸¸ 
)
¸¸ 
;
¸¸ 
migrationBuilder
˛˛ 
.
˛˛ 
CreateIndex
˛˛ (
(
˛˛( )
name
ˇˇ 
:
ˇˇ 
$str
ˇˇ 2
,
ˇˇ2 3
table
ÄÄ 
:
ÄÄ 
$str
ÄÄ (
,
ÄÄ( )
column
ÅÅ 
:
ÅÅ 
$str
ÅÅ !
)
ÅÅ! "
;
ÅÅ" #
migrationBuilder
ÉÉ 
.
ÉÉ 
CreateIndex
ÉÉ (
(
ÉÉ( )
name
ÑÑ 
:
ÑÑ 
$str
ÑÑ .
,
ÑÑ. /
table
ÖÖ 
:
ÖÖ 
$str
ÖÖ "
,
ÖÖ" #
column
ÜÜ 
:
ÜÜ 
$str
ÜÜ #
)
ÜÜ# $
;
ÜÜ$ %
migrationBuilder
àà 
.
àà 
CreateIndex
àà (
(
àà( )
name
ââ 
:
ââ 
$str
ââ <
,
ââ< =
table
ää 
:
ää 
$str
ää )
,
ää) *
column
ãã 
:
ãã 
$str
ãã *
)
ãã* +
;
ãã+ ,
migrationBuilder
çç 
.
çç 
CreateIndex
çç (
(
çç( )
name
éé 
:
éé 
$str
éé M
,
ééM N
table
èè 
:
èè 
$str
èè )
,
èè) *
columns
êê 
:
êê 
new
êê 
[
êê 
]
êê 
{
êê  
$str
êê! 3
,
êê3 4
$str
êê5 G
}
êêH I
)
êêI J
;
êêJ K
migrationBuilder
íí 
.
íí 
CreateIndex
íí (
(
íí( )
name
ìì 
:
ìì 
$str
ìì 9
,
ìì9 :
table
îî 
:
îî 
$str
îî -
,
îî- .
column
ïï 
:
ïï 
$str
ïï #
)
ïï# $
;
ïï$ %
migrationBuilder
óó 
.
óó 
CreateIndex
óó (
(
óó( )
name
òò 
:
òò 
$str
òò :
,
òò: ;
table
ôô 
:
ôô 
$str
ôô .
,
ôô. /
column
öö 
:
öö 
$str
öö #
)
öö# $
;
öö$ %
migrationBuilder
úú 
.
úú 
CreateIndex
úú (
(
úú( )
name
ùù 
:
ùù 
$str
ùù 3
,
ùù3 4
table
ûû 
:
ûû 
$str
ûû '
,
ûû' (
column
üü 
:
üü 
$str
üü #
)
üü# $
;
üü$ %
migrationBuilder
°° 
.
°° 
CreateIndex
°° (
(
°°( )
name
¢¢ 
:
¢¢ 
$str
¢¢ 0
,
¢¢0 1
table
££ 
:
££ 
$str
££ $
,
££$ %
column
§§ 
:
§§ 
$str
§§ #
)
§§# $
;
§§$ %
migrationBuilder
¶¶ 
.
¶¶ 
CreateIndex
¶¶ (
(
¶¶( )
name
ßß 
:
ßß 
$str
ßß 8
,
ßß8 9
table
®® 
:
®® 
$str
®® !
,
®®! "
column
©© 
:
©© 
$str
©© .
)
©©. /
;
©©/ 0
migrationBuilder
´´ 
.
´´ 
CreateIndex
´´ (
(
´´( )
name
¨¨ 
:
¨¨ 
$str
¨¨ 4
,
¨¨4 5
table
≠≠ 
:
≠≠ 
$str
≠≠ (
,
≠≠( )
column
ÆÆ 
:
ÆÆ 
$str
ÆÆ #
)
ÆÆ# $
;
ÆÆ$ %
migrationBuilder
∞∞ 
.
∞∞ 
CreateIndex
∞∞ (
(
∞∞( )
name
±± 
:
±± 
$str
±± >
,
±±> ?
table
≤≤ 
:
≤≤ 
$str
≤≤ (
,
≤≤( )
column
≥≥ 
:
≥≥ 
$str
≥≥ -
)
≥≥- .
;
≥≥. /
}
¥¥ 	
	protected
∑∑ 
override
∑∑ 
void
∑∑ 
Down
∑∑  $
(
∑∑$ %
MigrationBuilder
∑∑% 5
migrationBuilder
∑∑6 F
)
∑∑F G
{
∏∏ 	
migrationBuilder
ππ 
.
ππ 
	DropTable
ππ &
(
ππ& '
name
∫∫ 
:
∫∫ 
$str
∫∫ (
)
∫∫( )
;
∫∫) *
migrationBuilder
ºº 
.
ºº 
	DropTable
ºº &
(
ºº& '
name
ΩΩ 
:
ΩΩ 
$str
ΩΩ (
)
ΩΩ( )
;
ΩΩ) *
migrationBuilder
øø 
.
øø 
	DropTable
øø &
(
øø& '
name
¿¿ 
:
¿¿ 
$str
¿¿ (
)
¿¿( )
;
¿¿) *
migrationBuilder
¬¬ 
.
¬¬ 
	DropTable
¬¬ &
(
¬¬& '
name
√√ 
:
√√ 
$str
√√ '
)
√√' (
;
√√( )
migrationBuilder
≈≈ 
.
≈≈ 
	DropTable
≈≈ &
(
≈≈& '
name
∆∆ 
:
∆∆ 
$str
∆∆ (
)
∆∆( )
;
∆∆) *
migrationBuilder
»» 
.
»» 
	DropTable
»» &
(
»»& '
name
…… 
:
…… 
$str
…… '
)
……' (
;
……( )
migrationBuilder
ÀÀ 
.
ÀÀ 
	DropTable
ÀÀ &
(
ÀÀ& '
name
ÃÃ 
:
ÃÃ 
$str
ÃÃ !
)
ÃÃ! "
;
ÃÃ" #
migrationBuilder
ŒŒ 
.
ŒŒ 
	DropTable
ŒŒ &
(
ŒŒ& '
name
œœ 
:
œœ 
$str
œœ #
)
œœ# $
;
œœ$ %
migrationBuilder
—— 
.
—— 
	DropTable
—— &
(
——& '
name
““ 
:
““ 
$str
““ (
)
““( )
;
““) *
migrationBuilder
‘‘ 
.
‘‘ 
	DropTable
‘‘ &
(
‘‘& '
name
’’ 
:
’’ 
$str
’’ ,
)
’’, -
;
’’- .
migrationBuilder
◊◊ 
.
◊◊ 
	DropTable
◊◊ &
(
◊◊& '
name
ÿÿ 
:
ÿÿ 
$str
ÿÿ (
)
ÿÿ( )
;
ÿÿ) *
migrationBuilder
⁄⁄ 
.
⁄⁄ 
	DropTable
⁄⁄ &
(
⁄⁄& '
name
€€ 
:
€€ 
$str
€€ -
)
€€- .
;
€€. /
migrationBuilder
›› 
.
›› 
	DropTable
›› &
(
››& '
name
ﬁﬁ 
:
ﬁﬁ 
$str
ﬁﬁ &
)
ﬁﬁ& '
;
ﬁﬁ' (
migrationBuilder
‡‡ 
.
‡‡ 
	DropTable
‡‡ &
(
‡‡& '
name
·· 
:
·· 
$str
·· #
)
··# $
;
··$ %
migrationBuilder
„„ 
.
„„ 
	DropTable
„„ &
(
„„& '
name
‰‰ 
:
‰‰ 
$str
‰‰ '
)
‰‰' (
;
‰‰( )
migrationBuilder
ÊÊ 
.
ÊÊ 
	DropTable
ÊÊ &
(
ÊÊ& '
name
ÁÁ 
:
ÁÁ 
$str
ÁÁ #
)
ÁÁ# $
;
ÁÁ$ %
migrationBuilder
ÈÈ 
.
ÈÈ 
	DropTable
ÈÈ &
(
ÈÈ& '
name
ÍÍ 
:
ÍÍ 
$str
ÍÍ #
)
ÍÍ# $
;
ÍÍ$ %
migrationBuilder
ÏÏ 
.
ÏÏ 
	DropTable
ÏÏ &
(
ÏÏ& '
name
ÌÌ 
:
ÌÌ 
$str
ÌÌ  
)
ÌÌ  !
;
ÌÌ! "
migrationBuilder
ÔÔ 
.
ÔÔ 
	DropTable
ÔÔ &
(
ÔÔ& '
name
 
:
 
$str
 *
)
* +
;
+ ,
migrationBuilder
ÚÚ 
.
ÚÚ 
	DropTable
ÚÚ &
(
ÚÚ& '
name
ÛÛ 
:
ÛÛ 
$str
ÛÛ +
)
ÛÛ+ ,
;
ÛÛ, -
}
ÙÙ 	
}
ıı 
}ˆˆ Ò(
^C:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlSymptomRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class "
MySqlSymptomRepository '
:( )%
IPatientSymptomRepository* C
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public "
MySqlSymptomRepository %
(% &
MySqlDbContext& 4
context5 <
)< =
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
PatientSymptom (
>( )
AddAsync* 2
(2 3
PatientSymptom3 A
entityB H
)H I
{ 	
await 
_context 
. 
PatientSymptoms *
.* +
AddAsync+ 3
(3 4
entity4 :
): ;
;; <
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
PatientSymptom (
>( )
DeleteAsync* 5
(5 6
PatientSymptom6 D
entityE K
)K L
{ 	
_context 
. 
PatientSymptoms $
.$ %
Remove% +
(+ ,
entity, 2
)2 3
;3 4
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
List 
< 
PatientSymptom -
>- .
>. /
FindAllAsync0 <
(< =
)= >
{ 	
return   
await   
_context   !
.  ! "
PatientSymptoms  " 1
.  1 2
ToListAsync  2 =
(  = >
)  > ?
;  ? @
}!! 	
public## 
async## 
Task## 
<## 
PatientSymptom## (
?##( )
>##) *
FindByIdAsync##+ 8
(##8 9
int##9 <
id##= ?
)##? @
{$$ 	
return%% 
await%% 
_context%% !
.%%! "
PatientSymptoms%%" 1
.%%1 2
	FindAsync%%2 ;
(%%; <
id%%< >
)%%> ?
;%%? @
}&& 	
public(( 
async(( 
Task(( 
<(( 
IEnumerable(( %
<((% &
PatientSymptom((& 4
>((4 5
>((5 6*
FindAllByPatientIdAndDateAsync((7 U
(((U V
int((V Y
	patientId((Z c
,((c d
DateTime((e m
date((n r
)((r s
{)) 	
return** 
await** 
_context** !
.**! "
PatientSymptoms**" 1
.++ 
Where++ 
(++ 
ps++ 
=>++ 
ps++ 
.++  
	PatientId++  )
==++* ,
	patientId++- 6
&&++7 9
ps++: <
.++< =
OccurrenceTime++= K
.++K L
Date++L P
==++Q S
date++T X
.++X Y
Date++Y ]
)++] ^
.,, 
ToListAsync,, 
(,, 
),, 
;,, 
}-- 	
public// 
async// 
Task// 
<// 
IEnumerable// %
<//% &
PatientSymptom//& 4
>//4 5
>//5 6#
FindAllByPatientIdAsync//7 N
(//N O
int//O R
	patientId//S \
)//\ ]
{00 	
return11 
await11 
_context11 !
.11! "
PatientSymptoms11" 1
.22 
Include22 
(22 
ps22 
=>22 
ps22 !
.22! "
SymptomDefinition22" 3
)223 4
.33 
Where33 
(33 
ps33 
=>33 
ps33 
.33  
	PatientId33  )
==33* ,
	patientId33- 6
)336 7
.44 
ToListAsync44 
(44 
)44 
;44 
}55 	
public77 
async77 
Task77 
<77 
PatientSymptom77 (
>77( )
UpdateAsync77* 5
(775 6
PatientSymptom776 D
entity77E K
)77K L
{88 	
_context99 
.99 
PatientSymptoms99 $
.99$ %
Update99% +
(99+ ,
entity99, 2
)992 3
;993 4
await:: 
_context:: 
.:: 
SaveChangesAsync:: +
(::+ ,
)::, -
;::- .
return;; 
entity;; 
;;; 
}<< 	
}== 
}>> Ó'
hC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlSymptomDefinitionRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class ,
 MySqlSymptomDefinitionRepository 1
:2 3(
ISymptomDefinitionRepository4 P
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public ,
 MySqlSymptomDefinitionRepository /
(/ 0
MySqlDbContext0 >
context? F
)F G
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
SymptomDefinition +
>+ ,
AddAsync- 5
(5 6
SymptomDefinition6 G
entityH N
)N O
{ 	
await 
_context 
. 
SymptomsDefinition -
.- .
AddAsync. 6
(6 7
entity7 =
)= >
;> ?
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
SymptomDefinition +
>+ ,
DeleteAsync- 8
(8 9
SymptomDefinition9 J
entityK Q
)Q R
{ 	
_context 
. 
SymptomsDefinition '
.' (
Remove( .
(. /
entity/ 5
)5 6
;6 7
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
List 
< 
SymptomDefinition 0
>0 1
>1 2
FindAllAsync3 ?
(? @
)@ A
{ 	
return   
await   
_context   !
.  ! "
SymptomsDefinition  " 4
.  4 5
ToListAsync  5 @
(  @ A
)  A B
;  B C
}!! 	
public## 
async## 
Task## 
<## 
SymptomDefinition## +
?##+ ,
>##, -
FindByIdAsync##. ;
(##; <
int##< ?
id##@ B
)##B C
{$$ 	
return%% 
await%% 
_context%% !
.%%! "
SymptomsDefinition%%" 4
.%%4 5
	FindAsync%%5 >
(%%> ?
id%%? A
)%%A B
;%%B C
}&& 	
public(( 
async(( 
Task(( 
<(( 
IEnumerable(( %
<((% &
SymptomDefinition((& 7
>((7 8
>((8 9
SearchByNameAsync((: K
(((K L
string((L R
name((S W
)((W X
{)) 	
if** 
(** 
string** 
.** 
IsNullOrWhiteSpace** )
(**) *
name*** .
)**. /
)**/ 0
return++ 
await++ 
_context++ %
.++% &
SymptomsDefinition++& 8
.++8 9
ToListAsync++9 D
(++D E
)++E F
;++F G
return-- 
await-- 
_context-- !
.--! "
SymptomsDefinition--" 4
... 
AsAsyncEnumerable.. "
(.." #
)..# $
.// 
Where// 
(// 
s// 
=>// 
s// 
.// 
Name// "
.//" #
Contains//# +
(//+ ,
name//, 0
)//0 1
||//2 4
s//5 6
.//6 7
Aliases//7 >
.//> ?
Any//? B
(//B C
alias//C H
=>//I K
alias//L Q
.//Q R
Contains//R Z
(//Z [
name//[ _
)//_ `
)//` a
)//a b
.00 
OrderBy00 
(00 
s00 
=>00 
s00 
.00  
Name00  $
)00$ %
.11 
ToListAsync11 
(11 
)11 
;11 
}22 	
public44 
async44 
Task44 
<44 
SymptomDefinition44 +
>44+ ,
UpdateAsync44- 8
(448 9
SymptomDefinition449 J
entity44K Q
)44Q R
{55 	
_context66 
.66 
SymptomsDefinition66 '
.66' (
Update66( .
(66. /
entity66/ 5
)665 6
;666 7
await77 
_context77 
.77 
SaveChangesAsync77 +
(77+ ,
)77, -
;77- .
return88 
entity88 
;88 
}99 	
}:: 
};; Ë
^C:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlPatientRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class "
MySqlPatientRepository '
:( )
IPatientRepository* <
{ 
private 
readonly 
MySqlDbContext '
_context( 0
;0 1
public

 "
MySqlPatientRepository

 %
(

% &
MySqlDbContext

& 4
context

5 <
)

< =
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
Patient !
?! "
>" #
FindByIdAsync$ 1
(1 2
int2 5
id6 8
)8 9
{ 	
return 
await 
_context !
.! "
Patients" *
.* +
	FindAsync+ 4
(4 5
id5 7
)7 8
;8 9
} 	
public 
async 
Task 
< 
Patient !
>! "
UpdateAsync# .
(. /
Patient/ 6
patient7 >
)> ?
{ 	
_context 
. 
Patients 
. 
Update $
($ %
patient% ,
), -
;- .
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
patient 
; 
} 	
} 
} ﬂ!
aC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlMedicationRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class %
MySqlMedicationRepository *
:+ ,!
IMedicationRepository- B
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public

 %
MySqlMedicationRepository

 (
(

( )
MySqlDbContext

) 7
context

8 ?
)

? @
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 

Medication $
>$ %
AddAsync& .
(. /

Medication/ 9
entity: @
)@ A
{ 	
await 
_context 
. 
Medications &
.& '
AddAsync' /
(/ 0
entity0 6
)6 7
;7 8
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 

Medication $
>$ %
DeleteAsync& 1
(1 2

Medication2 <
entity= C
)C D
{ 	
_context 
. 
Medications  
.  !
Remove! '
(' (
entity( .
). /
;/ 0
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
List 
< 

Medication )
>) *
>* +
FindAllAsync, 8
(8 9
)9 :
{ 	
return 
await 
_context !
.! "
Medications" -
.- .
ToListAsync. 9
(9 :
): ;
;; <
}!! 	
public## 
async## 
Task## 
<## 

Medication## $
?##$ %
>##% &
FindByIdAsync##' 4
(##4 5
int##5 8
id##9 ;
)##; <
{$$ 	

Medication%% 
?%% 

medication%% "
=%%# $
await%%% *
_context%%+ 3
.%%3 4
Medications%%4 ?
.%%? @
	FindAsync%%@ I
(%%I J
id%%J L
)%%L M
;%%M N
return&& 

medication&& 
;&& 
}'' 	
public)) 
async)) 
Task)) 
<)) 
IEnumerable)) %
<))% &

Medication))& 0
>))0 1
>))1 2#
FindAllByPatientIdAsync))3 J
())J K
int))K N
	patientId))O X
)))X Y
{** 	
var++ 
patientMedication++ !
=++" #
await++$ )
_context++* 2
.++2 3
Medications++3 >
.++> ?
Where++? D
(++D E
m++E F
=>++G I
m++J K
.++K L
	PatientId++L U
==++V X
	patientId++Y b
)++b c
.++c d
ToListAsync++d o
(++o p
)++p q
;++q r
return,, 
patientMedication,, $
;,,$ %
}-- 	
public// 
async// 
Task// 
<// 

Medication// $
>//$ %
UpdateAsync//& 1
(//1 2

Medication//2 <
entity//= C
)//C D
{00 	
_context11 
.11 
Medications11  
.11  !
Update11! '
(11' (
entity11( .
)11. /
;11/ 0
await22 
_context22 
.22 
SaveChangesAsync22 +
(22+ ,
)22, -
;22- .
return33 
entity33 
;33 
}44 	
}55 
}66 ‡
dC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlMedicalLetterRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class (
MySqlMedicalLetterRepository -
:. /$
IMedicalLetterRepository0 H
{		 
private

 
MySqlDbContext

 
_context

 '
;

' (
public (
MySqlMedicalLetterRepository +
(+ ,
MySqlDbContext, :
context; B
)B C
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
MedicalLetter '
>' (
AddAsync) 1
(1 2
MedicalLetter2 ?
entity@ F
)F G
{ 	
await 
_context 
. 
AddAsync #
(# $
entity$ *
)* +
;+ ,
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
MedicalLetter '
>' (
DeleteAsync) 4
(4 5
MedicalLetter5 B
entityC I
)I J
{ 	
_context 
. 
Remove 
( 
entity #
)# $
;$ %
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
List 
< 
MedicalLetter ,
>, -
>- .
FindAllAsync/ ;
(; <
)< =
{ 	
var 

allLetters 
= 
await #
_context$ ,
., -
MedicalLetters- ;
.; <
ToListAsync< G
(G H
)H I
;I J
return   

allLetters   
;   
}!! 	
public## 
async## 
Task## 
<## 
MedicalLetter## '
?##' (
>##( )
FindByIdAsync##* 7
(##7 8
int##8 ;
id##< >
)##> ?
{$$ 	
var%% 
foundLetter%% 
=%% 
await%% #
_context%%$ ,
.%%, -
MedicalLetters%%- ;
.%%; <
	FindAsync%%< E
(%%E F
id%%F H
)%%H I
;%%I J
return&& 
foundLetter&& 
;&& 
}(( 	
public** 
async** 
Task** 
<** 
MedicalLetter** '
>**' (
UpdateAsync**) 4
(**4 5
MedicalLetter**5 B
entity**C I
)**I J
{++ 	
_context,, 
.,, 
MedicalLetters,, #
.,,# $
Update,,$ *
(,,* +
entity,,+ 1
),,1 2
;,,2 3
await-- 
_context-- 
.-- 
SaveChangesAsync-- +
(--+ ,
)--, -
;--- .
return.. 
entity.. 
;.. 
}// 	
}00 
}11 õ!
iC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlFamilyHistoryEntryRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class -
!MySqlFamilyHistoryEntryRepository 2
:3 4)
IFamilyHistoryEntryRepository5 R
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public -
!MySqlFamilyHistoryEntryRepository 0
(0 1
MySqlDbContext1 ?
context@ G
)G H
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
List 
< 
FamilyHistoryEntry 1
>1 2
>2 3
FindAllAsync4 @
(@ A
)A B
{ 	
return 
await 
_context !
.! " 
FamilyHistoryEntries" 6
.6 7
ToListAsync7 B
(B C
)C D
;D E
} 	
public 
async 
Task 
< 
FamilyHistoryEntry ,
?, -
>- .
FindByIdAsync/ <
(< =
int= @
idA C
)C D
{ 	
return 
await 
_context !
.! " 
FamilyHistoryEntries" 6
.6 7
	FindAsync7 @
(@ A
idA C
)C D
;D E
} 	
public 
async 
Task 
< 
IEnumerable %
<% &
FamilyHistoryEntry& 8
>8 9
>9 :#
FindAllByPatientIdAsync; R
(R S
intS V
	patientIdW `
)` a
{ 	
return 
await 
_context !
.! " 
FamilyHistoryEntries" 6
. 
Where 
( 
e 
=> 
e 
. 
	PatientId '
==( *
	patientId+ 4
)4 5
. 
ToListAsync 
( 
) 
; 
} 	
public!! 
async!! 
Task!! 
<!! 
FamilyHistoryEntry!! ,
>!!, -
AddAsync!!. 6
(!!6 7
FamilyHistoryEntry!!7 I
entity!!J P
)!!P Q
{"" 	
await## 
_context## 
.##  
FamilyHistoryEntries## /
.##/ 0
AddAsync##0 8
(##8 9
entity##9 ?
)##? @
;##@ A
await$$ 
_context$$ 
.$$ 
SaveChangesAsync$$ +
($$+ ,
)$$, -
;$$- .
return%% 
entity%% 
;%% 
}&& 	
public(( 
async(( 
Task(( 
<(( 
FamilyHistoryEntry(( ,
>((, -
UpdateAsync((. 9
(((9 :
FamilyHistoryEntry((: L
entity((M S
)((S T
{)) 	
_context** 
.**  
FamilyHistoryEntries** )
.**) *
Update*** 0
(**0 1
entity**1 7
)**7 8
;**8 9
await++ 
_context++ 
.++ 
SaveChangesAsync++ +
(+++ ,
)++, -
;++- .
return,, 
entity,, 
;,, 
}-- 	
public.. 
async.. 
Task.. 
<.. 
FamilyHistoryEntry.. ,
>.., -
DeleteAsync... 9
(..9 :
FamilyHistoryEntry..: L
entity..M S
)..S T
{// 	
_context00 
.00  
FamilyHistoryEntries00 )
.00) *
Remove00* 0
(000 1
entity001 7
)007 8
;008 9
await11 
_context11 
.11 
SaveChangesAsync11 +
(11+ ,
)11, -
;11- .
return22 
entity22 
;22 
}33 	
}55 
}66 ¬ï
fC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlKnownMedicationRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class *
MySqlKnownMedicationRepository /
:0 1&
IKnownMedicationRepository2 L
{		 
private

 
readonly

 
MySqlDbContext

 '
_context

( 0
;

0 1
public *
MySqlKnownMedicationRepository -
(- .
MySqlDbContext. <
context= D
)D E
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
IEnumerable %
<% &
KnownMedication& 5
>5 6
>6 7
SearchAsync8 C
(C D
stringD J
queryK P
)P Q
{ 	
return 
await 
_context !
.! "
KnownMedications" 2
. 
Where 
( 
m 
=> 
m 
. 
Name "
." #
Contains# +
(+ ,
query, 1
)1 2
)2 3
. 
Take 
( 
$num 
) 
. 
ToListAsync 
( 
) 
; 
} 	
public 
async 
Task 
RebuildFromCsvAsync -
(- .
string. 4
csvPath5 <
)< =
{ 	
_context 
. 
KnownMedications %
.% &
RemoveRange& 1
(1 2
_context2 :
.: ;
KnownMedications; K
)K L
;L M
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
var 
lines 
= 
await 
File "
." #
ReadAllLinesAsync# 4
(4 5
csvPath5 <
,< =
System> D
.D E
TextE I
.I J
EncodingJ R
.R S
UTF8S W
)W X
;X Y
var 
medications 
= 
new !
List" &
<& '
KnownMedication' 6
>6 7
(7 8
)8 9
;9 :
foreach!! 
(!! 
var!! 
line!! 
in!!  
lines!!! &
.!!& '
Skip!!' +
(!!+ ,
$num!!, -
)!!- .
)!!. /
{"" 
var## 
cols## 
=## 
line## 
.##  
Split##  %
(##% &
$char##& )
)##) *
;##* +
if$$ 
($$ 
cols$$ 
.$$ 
Length$$ 
<$$  
$num$$! #
)$$# $
continue$$% -
;$$- .
var&& 
name&& 
=&& 
cols&& 
[&&  
$num&&  !
]&&! "
.&&" #
Trim&&# '
(&&' (
$char&&( +
)&&+ ,
.&&, -
Trim&&- 1
(&&1 2
)&&2 3
;&&3 4
if'' 
('' 
string'' 
.'' 
IsNullOrWhiteSpace'' ,
('', -
name''- 1
)''1 2
)''2 3
continue''4 <
;''< =
medications)) 
.)) 
Add)) 
())  
new))  #
KnownMedication))$ 3
{** 
Name++ 
=++ 
name++ 
,++  
	Substance,, 
=,, 
cols,,  $
[,,$ %
$num,,% &
],,& '
.,,' (
Trim,,( ,
(,,, -
$char,,- 0
),,0 1
.,,1 2
Trim,,2 6
(,,6 7
),,7 8
,,,8 9
AtcCode-- 
=-- 
cols-- "
[--" #
$num--# $
]--$ %
.--% &
Trim--& *
(--* +
$char--+ .
)--. /
.--/ 0
Trim--0 4
(--4 5
)--5 6
,--6 7
Dosage.. 
=.. 
cols.. !
[..! "
$num.." $
]..$ %
...% &
Trim..& *
(..* +
$char..+ .
)... /
.../ 0
Trim..0 4
(..4 5
)..5 6
,..6 7 
PrescriptionRequired// (
=//) *
cols//+ /
[/// 0
$num//0 2
]//2 3
.//3 4
Trim//4 8
(//8 9
$char//9 <
)//< =
.//= >
Trim//> B
(//B C
)//C D
,//D E
}00 
)00 
;00 
}11 
await33 
_context33 
.33 
KnownMedications33 +
.33+ ,
AddRangeAsync33, 9
(339 :
medications33: E
)33E F
;33F G
await44 
_context44 
.44 
SaveChangesAsync44 +
(44+ ,
)44, -
;44- .
}55 	
public66 
async66 
Task66 
<66 
IEnumerable66 %
<66% &
KnownMedication66& 5
>665 6
>666 7
IdentifyAsync668 E
(66E F
string66F L
?66L M
brand66N S
,66S T
string66U [
?66[ \
productName66] h
,66h i
string66j p
?66p q
activeIngredient	66r Ç
,
66Ç É
string
66Ñ ä
?
66ä ã
dosage
66å í
,
66í ì
string
66î ö
?
66ö õ
form
66ú †
)
66† °
{77 	
var88 

brandLower88 
=88 
brand88 "
?88" #
.88# $
Trim88$ (
(88( )
)88) *
.88* +
ToLowerInvariant88+ ;
(88; <
)88< =
??88> @
string88A G
.88G H
Empty88H M
;88M N
var99 
brandFirstWord99 
=99  

brandLower99! +
.99+ ,
Split99, 1
(991 2
$char992 5
)995 6
[996 7
$num997 8
]998 9
;999 :
var:: !
activeIngredientLower:: %
=::& '
activeIngredient::( 8
?::8 9
.::9 :
Trim::: >
(::> ?
)::? @
.::@ A
ToLowerInvariant::A Q
(::Q R
)::R S
??::T V
string::W ]
.::] ^
Empty::^ c
;::c d
if<< 
(<< 
string<< 
.<< 
IsNullOrWhiteSpace<< )
(<<) *

brandLower<<* 4
)<<4 5
&&<<6 8
string<<9 ?
.<<? @
IsNullOrWhiteSpace<<@ R
(<<R S!
activeIngredientLower<<S h
)<<h i
)<<i j
{== 
Console>> 
.>> 
	WriteLine>> !
(>>! "
$str>>" c
)>>c d
;>>d e
return?? 

Enumerable?? !
.??! "
Empty??" '
<??' (
KnownMedication??( 7
>??7 8
(??8 9
)??9 :
;??: ;
}@@ 
ListBB 
<BB 
KnownMedicationBB  
>BB  !

candidatesBB" ,
;BB, -
ifDD 
(DD 
!DD 
stringDD 
.DD 
IsNullOrWhiteSpaceDD *
(DD* +

brandLowerDD+ 5
)DD5 6
&&DD7 9
!DD: ;
stringDD; A
.DDA B
IsNullOrWhiteSpaceDDB T
(DDT U!
activeIngredientLowerDDU j
)DDj k
)DDk l
{EE 

candidatesFF 
=FF 
awaitFF "
_contextFF# +
.FF+ ,
KnownMedicationsFF, <
.GG 
WhereGG 
(GG 

medicationGG %
=>GG& (

medicationGG) 3
.GG3 4
NameGG4 8
.GG8 9
ToLowerGG9 @
(GG@ A
)GGA B
.GGB C
ContainsGGC K
(GGK L
brandFirstWordGGL Z
)GGZ [
||GG\ ^

medicationHH) 3
.HH3 4
	SubstanceHH4 =
.HH= >
ToLowerHH> E
(HHE F
)HHF G
.HHG H
ContainsHHH P
(HHP Q!
activeIngredientLowerHHQ f
)HHf g
)HHg h
.II 
TakeII 
(II 
$numII 
)II 
.JJ 
ToListAsyncJJ  
(JJ  !
)JJ! "
;JJ" #
}KK 
elseLL 
ifLL 
(LL 
!LL 
stringLL 
.LL 
IsNullOrWhiteSpaceLL /
(LL/ 0

brandLowerLL0 :
)LL: ;
)LL; <
{MM 

candidatesNN 
=NN 
awaitNN "
_contextNN# +
.NN+ ,
KnownMedicationsNN, <
.OO 
WhereOO 
(OO 

medicationOO %
=>OO& (

medicationOO) 3
.OO3 4
NameOO4 8
.OO8 9
ToLowerOO9 @
(OO@ A
)OOA B
.OOB C
ContainsOOC K
(OOK L
brandFirstWordOOL Z
)OOZ [
)OO[ \
.PP 
TakePP 
(PP 
$numPP 
)PP 
.QQ 
ToListAsyncQQ  
(QQ  !
)QQ! "
;QQ" #
}RR 
elseSS 
{TT 

candidatesUU 
=UU 
awaitUU "
_contextUU# +
.UU+ ,
KnownMedicationsUU, <
.VV 
WhereVV 
(VV 

medicationVV %
=>VV& (

medicationVV) 3
.VV3 4
	SubstanceVV4 =
.VV= >
ToLowerVV> E
(VVE F
)VVF G
.VVG H
ContainsVVH P
(VVP Q!
activeIngredientLowerVVQ f
)VVf g
)VVg h
.WW 
TakeWW 
(WW 
$numWW 
)WW 
.XX 
ToListAsyncXX  
(XX  !
)XX! "
;XX" #
}YY 
Console[[ 
.[[ 
	WriteLine[[ 
([[ 
$"[[  
$str[[  H
{[[H I

candidates[[I S
.[[S T
Count[[T Y
}[[Y Z
"[[Z [
)[[[ \
;[[\ ]
if]] 
(]] 
!]] 

candidates]] 
.]] 
Any]] 
(]]  
)]]  !
)]]! "
{^^ 
return__ 

Enumerable__ !
.__! "
Empty__" '
<__' (
KnownMedication__( 7
>__7 8
(__8 9
)__9 :
;__: ;
}`` 
varbb 
scoredbb 
=bb 

candidatesbb #
.cc 
Selectcc 
(cc 

medicationcc "
=>cc# %
newcc& )
{dd 

Medicationee 
=ee  

medicationee! +
,ee+ ,
Scoreff 
=ff $
CalculateStructuredScoreff 4
(ff4 5

medicationff5 ?
,ff? @
brandffA F
,ffF G
productNameffH S
,ffS T
activeIngredientffU e
,ffe f
dosageffg m
,ffm n
formffo s
)ffs t
}gg 
)gg 
.hh 
Wherehh 
(hh 
entryhh 
=>hh 
entryhh  %
.hh% &
Scorehh& +
>hh, -
$numhh. /
)hh/ 0
.ii 
OrderByDescendingii "
(ii" #
entryii# (
=>ii) +
entryii, 1
.ii1 2
Scoreii2 7
)ii7 8
.jj 
ToListjj 
(jj 
)jj 
;jj 
Consolell 
.ll 
	WriteLinell 
(ll 
$"ll  
$strll  ;
{ll; <
scoredll< B
.llB C
CountllC H
}llH I
$strllI Q
"llQ R
)llR S
;llS T
foreachmm 
(mm 
varmm 
entrymm 
inmm !
scoredmm" (
.mm( )
Takemm) -
(mm- .
$nummm. /
)mm/ 0
)mm0 1
{nn 
Consoleoo 
.oo 
	WriteLineoo !
(oo! "
$"oo" $
$stroo$ (
{oo( )
entryoo) .
.oo. /

Medicationoo/ 9
.oo9 :
Nameoo: >
}oo> ?
$stroo? H
{ooH I
entryooI N
.ooN O
ScoreooO T
}ooT U
"ooU V
)ooV W
;ooW X
}pp 
ifrr 
(rr 
!rr 
scoredrr 
.rr 
Anyrr 
(rr 
)rr 
)rr 
{ss 
returntt 

Enumerablett !
.tt! "
Emptytt" '
<tt' (
KnownMedicationtt( 7
>tt7 8
(tt8 9
)tt9 :
;tt: ;
}uu 
varww 
bestww 
=ww 
scoredww 
.ww 
Firstww #
(ww# $
)ww$ %
;ww% &
ifyy 
(yy 
bestyy 
.yy 
Scoreyy 
<yy 
$numyy 
)yy 
{zz 
Console{{ 
.{{ 
	WriteLine{{ !
({{! "
$"{{" $
$str{{$ C
{{{C D
best{{D H
.{{H I
Score{{I N
}{{N O
$str{{O _
"{{_ `
){{` a
;{{a b
return|| 

Enumerable|| !
.||! "
Empty||" '
<||' (
KnownMedication||( 7
>||7 8
(||8 9
)||9 :
;||: ;
}}} 
if 
( 
scored 
. 
Count 
> 
$num  
&&! #
scored$ *
[* +
$num+ ,
], -
.- .
Score. 3
>=4 6
best7 ;
.; <
Score< A
)A B
{
ÄÄ 
var
ÅÅ 
topCandidates
ÅÅ !
=
ÅÅ" #
scored
ÅÅ$ *
.
ÅÅ* +
Where
ÅÅ+ 0
(
ÅÅ0 1
entry
ÅÅ1 6
=>
ÅÅ7 9
entry
ÅÅ: ?
.
ÅÅ? @
Score
ÅÅ@ E
==
ÅÅF H
best
ÅÅI M
.
ÅÅM N
Score
ÅÅN S
)
ÅÅS T
.
ÅÅT U
ToList
ÅÅU [
(
ÅÅ[ \
)
ÅÅ\ ]
;
ÅÅ] ^
Console
ÇÇ 
.
ÇÇ 
	WriteLine
ÇÇ !
(
ÇÇ! "
$"
ÇÇ" $
$str
ÇÇ$ A
{
ÇÇA B
topCandidates
ÇÇB O
.
ÇÇO P
Count
ÇÇP U
}
ÇÇU V
$str
ÇÇV w
"
ÇÇw x
)
ÇÇx y
;
ÇÇy z
var
ÑÑ 
dosageLower
ÑÑ 
=
ÑÑ  !
dosage
ÑÑ" (
?
ÑÑ( )
.
ÑÑ) *
ToLowerInvariant
ÑÑ* :
(
ÑÑ: ;
)
ÑÑ; <
??
ÑÑ= ?
$str
ÑÑ@ B
;
ÑÑB C
var
ÖÖ 
	formLower
ÖÖ 
=
ÖÖ 
form
ÖÖ  $
?
ÖÖ$ %
.
ÖÖ% &
ToLowerInvariant
ÖÖ& 6
(
ÖÖ6 7
)
ÖÖ7 8
??
ÖÖ9 ;
$str
ÖÖ< >
;
ÖÖ> ?
var
ÜÜ 
productNameLower
ÜÜ $
=
ÜÜ% &
productName
ÜÜ' 2
?
ÜÜ2 3
.
ÜÜ3 4
ToLowerInvariant
ÜÜ4 D
(
ÜÜD E
)
ÜÜE F
??
ÜÜG I
$str
ÜÜJ L
;
ÜÜL M
var
ââ 

exactMatch
ââ 
=
ââ  
topCandidates
ââ! .
.
ââ. /
FirstOrDefault
ââ/ =
(
ââ= >
entry
ââ> C
=>
ââD F
!
ää 
string
ää 
.
ää  
IsNullOrWhiteSpace
ää .
(
ää. /
dosageLower
ää/ :
)
ää: ;
&&
ää< >
entry
ãã 
.
ãã 

Medication
ãã $
.
ãã$ %
Name
ãã% )
.
ãã) *
ToLowerInvariant
ãã* :
(
ãã: ;
)
ãã; <
.
ãã< =
Contains
ãã= E
(
ããE F
dosageLower
ããF Q
)
ããQ R
&&
ããS U
!
åå 
string
åå 
.
åå  
IsNullOrWhiteSpace
åå .
(
åå. /
	formLower
åå/ 8
)
åå8 9
&&
åå: <
entry
çç 
.
çç 

Medication
çç $
.
çç$ %
Name
çç% )
.
çç) *
ToLowerInvariant
çç* :
(
çç: ;
)
çç; <
.
çç< =
Contains
çç= E
(
ççE F
	formLower
ççF O
)
ççO P
)
ççP Q
;
ççQ R
if
èè 
(
èè 

exactMatch
èè 
!=
èè !
null
èè" &
)
èè& '
{
êê 
Console
ëë 
.
ëë 
	WriteLine
ëë %
(
ëë% &
$"
ëë& (
$str
ëë( W
{
ëëW X

exactMatch
ëëX b
.
ëëb c

Medication
ëëc m
.
ëëm n
Name
ëën r
}
ëër s
"
ëës t
)
ëët u
;
ëëu v
return
íí 
new
íí 
[
íí 
]
íí  
{
íí! "

exactMatch
íí# -
.
íí- .

Medication
íí. 8
}
íí9 :
;
íí: ;
}
ìì 
if
ññ 
(
ññ 
!
ññ 
string
ññ 
.
ññ  
IsNullOrWhiteSpace
ññ .
(
ññ. /
productNameLower
ññ/ ?
)
ññ? @
)
ññ@ A
{
óó 
var
òò 
productWords
òò $
=
òò% &
productNameLower
òò' 7
.
ôô 
Split
ôô 
(
ôô 
$char
ôô "
,
ôô" # 
StringSplitOptions
ôô$ 6
.
ôô6 7 
RemoveEmptyEntries
ôô7 I
)
ôôI J
.
öö 
Where
öö 
(
öö 
word
öö #
=>
öö$ &
word
öö' +
.
öö+ ,
Length
öö, 2
>
öö3 4
$num
öö5 6
)
öö6 7
.
õõ 
ToList
õõ 
(
õõ  
)
õõ  !
;
õõ! "
var
ùù 
productMatch
ùù $
=
ùù% &
topCandidates
ùù' 4
.
ûû 
Select
ûû 
(
ûû  
entry
ûû  %
=>
ûû& (
new
ûû) ,
{
üü 
entry
†† !
.
††! "

Medication
††" ,
,
††, -
entry
°° !
.
°°! "
Score
°°" '
,
°°' ( 
ProductWordMatches
¢¢ .
=
¢¢/ 0
productWords
¢¢1 =
.
¢¢= >
Count
¢¢> C
(
¢¢C D
word
¢¢D H
=>
¢¢I K
entry
££  %
.
££% &

Medication
££& 0
.
££0 1
Name
££1 5
.
££5 6
ToLowerInvariant
££6 F
(
££F G
)
££G H
.
££H I
Contains
££I Q
(
££Q R
word
££R V
)
££V W
)
££W X
}
§§ 
)
§§ 
.
•• 
Where
•• 
(
•• 
entry
•• $
=>
••% '
entry
••( -
.
••- . 
ProductWordMatches
••. @
>
••A B
$num
••C D
)
••D E
.
¶¶ 
OrderByDescending
¶¶ *
(
¶¶* +
entry
¶¶+ 0
=>
¶¶1 3
entry
¶¶4 9
.
¶¶9 : 
ProductWordMatches
¶¶: L
)
¶¶L M
.
ßß 
FirstOrDefault
ßß '
(
ßß' (
)
ßß( )
;
ßß) *
if
©© 
(
©© 
productMatch
©© $
!=
©©% '
null
©©( ,
)
©©, -
{
™™ 
var
´´ 
secondBestMatches
´´ -
=
´´. /
topCandidates
´´0 =
.
¨¨ 
Where
¨¨ "
(
¨¨" #
entry
¨¨# (
=>
¨¨) +
entry
¨¨, 1
.
¨¨1 2

Medication
¨¨2 <
.
¨¨< =
Name
¨¨= A
!=
¨¨B D
productMatch
¨¨E Q
.
¨¨Q R

Medication
¨¨R \
.
¨¨\ ]
Name
¨¨] a
)
¨¨a b
.
≠≠ 
Select
≠≠ #
(
≠≠# $
entry
≠≠$ )
=>
≠≠* ,
productWords
≠≠- 9
.
≠≠9 :
Count
≠≠: ?
(
≠≠? @
word
≠≠@ D
=>
≠≠E G
entry
ÆÆ  %
.
ÆÆ% &

Medication
ÆÆ& 0
.
ÆÆ0 1
Name
ÆÆ1 5
.
ÆÆ5 6
ToLowerInvariant
ÆÆ6 F
(
ÆÆF G
)
ÆÆG H
.
ÆÆH I
Contains
ÆÆI Q
(
ÆÆQ R
word
ÆÆR V
)
ÆÆV W
)
ÆÆW X
)
ÆÆX Y
.
ØØ 
DefaultIfEmpty
ØØ +
(
ØØ+ ,
$num
ØØ, -
)
ØØ- .
.
∞∞ 
Max
∞∞  
(
∞∞  !
)
∞∞! "
;
∞∞" #
if
≤≤ 
(
≤≤ 
productMatch
≤≤ (
.
≤≤( ) 
ProductWordMatches
≤≤) ;
>
≤≤< =
secondBestMatches
≤≤> O
)
≤≤O P
{
≥≥ 
Console
¥¥ #
.
¥¥# $
	WriteLine
¥¥$ -
(
¥¥- .
$"
¥¥. 0
$str
¥¥0 _
{
¥¥_ `
productMatch
¥¥` l
.
¥¥l m

Medication
¥¥m w
.
¥¥w x
Name
¥¥x |
}
¥¥| }
"
¥¥} ~
)
¥¥~ 
;¥¥ Ä
return
µµ "
new
µµ# &
[
µµ& '
]
µµ' (
{
µµ) *
productMatch
µµ+ 7
.
µµ7 8

Medication
µµ8 B
}
µµC D
;
µµD E
}
∂∂ 
}
∑∑ 
}
∏∏ 
var
ªª 
dosageMatch
ªª 
=
ªª  !
topCandidates
ªª" /
.
ªª/ 0
FirstOrDefault
ªª0 >
(
ªª> ?
entry
ªª? D
=>
ªªE G
!
ºº 
string
ºº 
.
ºº  
IsNullOrWhiteSpace
ºº .
(
ºº. /
dosageLower
ºº/ :
)
ºº: ;
&&
ºº< >
entry
ΩΩ 
.
ΩΩ 

Medication
ΩΩ $
.
ΩΩ$ %
Name
ΩΩ% )
.
ΩΩ) *
ToLowerInvariant
ΩΩ* :
(
ΩΩ: ;
)
ΩΩ; <
.
ΩΩ< =
Contains
ΩΩ= E
(
ΩΩE F
dosageLower
ΩΩF Q
)
ΩΩQ R
)
ΩΩR S
;
ΩΩS T
if
øø 
(
øø 
dosageMatch
øø 
!=
øø  "
null
øø# '
)
øø' (
{
¿¿ 
Console
¡¡ 
.
¡¡ 
	WriteLine
¡¡ %
(
¡¡% &
$"
¡¡& (
$str
¡¡( V
{
¡¡V W
dosageMatch
¡¡W b
.
¡¡b c

Medication
¡¡c m
.
¡¡m n
Name
¡¡n r
}
¡¡r s
"
¡¡s t
)
¡¡t u
;
¡¡u v
return
¬¬ 
new
¬¬ 
[
¬¬ 
]
¬¬  
{
¬¬! "
dosageMatch
¬¬# .
.
¬¬. /

Medication
¬¬/ 9
}
¬¬: ;
;
¬¬; <
}
√√ 
Console
≈≈ 
.
≈≈ 
	WriteLine
≈≈ !
(
≈≈! "
$"
≈≈" $
$str
≈≈$ ]
"
≈≈] ^
)
≈≈^ _
;
≈≈_ `
return
∆∆ 

Enumerable
∆∆ !
.
∆∆! "
Empty
∆∆" '
<
∆∆' (
KnownMedication
∆∆( 7
>
∆∆7 8
(
∆∆8 9
)
∆∆9 :
;
∆∆: ;
}
«« 
Console
…… 
.
…… 
	WriteLine
…… 
(
…… 
$"
……  
$str
……  =
{
……= >
best
……> B
.
……B C

Medication
……C M
.
……M N
Name
……N R
}
……R S
$str
……S \
{
……\ ]
best
……] a
.
……a b
Score
……b g
}
……g h
"
……h i
)
……i j
;
……j k
return
   
new
   
[
   
]
   
{
   
best
   
.
    

Medication
    *
}
  + ,
;
  , -
}
ÀÀ 	
private
ÕÕ 
static
ÕÕ 
int
ÕÕ &
CalculateStructuredScore
ÕÕ 3
(
ÕÕ3 4
KnownMedication
ÕÕ4 C
m
ÕÕD E
,
ÕÕE F
string
ÕÕG M
?
ÕÕM N
brand
ÕÕO T
,
ÕÕT U
string
ÕÕV \
?
ÕÕ\ ]
productName
ÕÕ^ i
,
ÕÕi j
string
ÕÕk q
?
ÕÕq r
activeIngredientÕÕs É
,ÕÕÉ Ñ
stringÕÕÖ ã
?ÕÕã å
dosageÕÕç ì
,ÕÕì î
stringÕÕï õ
?ÕÕõ ú
formÕÕù °
)ÕÕ° ¢
{
ŒŒ 	
int
œœ 
score
œœ 
=
œœ 
$num
œœ 
;
œœ 
var
–– 
name
–– 
=
–– 
m
–– 
.
–– 
Name
–– 
?
–– 
.
–– 
ToLowerInvariant
–– /
(
––/ 0
)
––0 1
??
––2 4
$str
––5 7
;
––7 8
var
—— 
	substance
—— 
=
—— 
m
—— 
.
—— 
	Substance
—— '
?
——' (
.
——( )
ToLowerInvariant
——) 9
(
——9 :
)
——: ;
??
——< >
$str
——? A
;
——A B
var
““ 
dbDosage
““ 
=
““ 
m
““ 
.
““ 
Dosage
““ #
?
““# $
.
““$ %
ToLowerInvariant
““% 5
(
““5 6
)
““6 7
??
““8 :
$str
““; =
;
““= >
if
‘‘ 
(
‘‘ 
!
‘‘ 
string
‘‘ 
.
‘‘  
IsNullOrWhiteSpace
‘‘ *
(
‘‘* +
brand
‘‘+ 0
)
‘‘0 1
)
‘‘1 2
{
’’ 
var
÷÷ 
b
÷÷ 
=
÷÷ 
brand
÷÷ 
.
÷÷ 
ToLowerInvariant
÷÷ .
(
÷÷. /
)
÷÷/ 0
;
÷÷0 1
var
◊◊ 
bNoSpace
◊◊ 
=
◊◊ 
b
◊◊  
.
◊◊  !
Replace
◊◊! (
(
◊◊( )
$str
◊◊) ,
,
◊◊, -
$str
◊◊. 0
)
◊◊0 1
;
◊◊1 2
var
ÿÿ 
nameNoSpace
ÿÿ 
=
ÿÿ  !
name
ÿÿ" &
.
ÿÿ& '
Replace
ÿÿ' .
(
ÿÿ. /
$str
ÿÿ/ 2
,
ÿÿ2 3
$str
ÿÿ4 6
)
ÿÿ6 7
.
ÿÿ7 8
Replace
ÿÿ8 ?
(
ÿÿ? @
$str
ÿÿ@ C
,
ÿÿC D
$str
ÿÿE G
)
ÿÿG H
;
ÿÿH I
if
€€ 
(
€€ 
name
€€ 
.
€€ 
Contains
€€ !
(
€€! "
b
€€" #
)
€€# $
)
€€$ %
score
‹‹ 
+=
‹‹ 
$num
‹‹ 
;
‹‹ 
else
ﬁﬁ 
if
ﬁﬁ 
(
ﬁﬁ 
nameNoSpace
ﬁﬁ $
.
ﬁﬁ$ %
Contains
ﬁﬁ% -
(
ﬁﬁ- .
bNoSpace
ﬁﬁ. 6
)
ﬁﬁ6 7
||
ﬁﬁ8 :
bNoSpace
ﬁﬁ; C
.
ﬁﬁC D
Contains
ﬁﬁD L
(
ﬁﬁL M
nameNoSpace
ﬁﬁM X
.
ﬁﬁX Y
Split
ﬁﬁY ^
(
ﬁﬁ^ _
$char
ﬁﬁ_ b
)
ﬁﬁb c
[
ﬁﬁc d
$num
ﬁﬁd e
]
ﬁﬁe f
.
ﬁﬁf g
Replace
ﬁﬁg n
(
ﬁﬁn o
$str
ﬁﬁo r
,
ﬁﬁr s
$str
ﬁﬁt v
)
ﬁﬁv w
)
ﬁﬁw x
)
ﬁﬁx y
score
ﬂﬂ 
+=
ﬂﬂ 
$num
ﬂﬂ 
;
ﬂﬂ 
else
·· 
if
·· 
(
·· 
name
·· 
.
·· 
Contains
·· &
(
··& '
b
··' (
.
··( )
Split
··) .
(
··. /
$char
··/ 2
)
··2 3
[
··3 4
$num
··4 5
]
··5 6
)
··6 7
&&
··8 :
b
··; <
.
··< =
Split
··= B
(
··B C
$char
··C F
)
··F G
[
··G H
$num
··H I
]
··I J
.
··J K
Length
··K Q
>
··R S
$num
··T U
)
··U V
score
‚‚ 
+=
‚‚ 
$num
‚‚ 
;
‚‚ 
}
„„ 
if
ÂÂ 
(
ÂÂ 
!
ÂÂ 
string
ÂÂ 
.
ÂÂ  
IsNullOrWhiteSpace
ÂÂ *
(
ÂÂ* +
productName
ÂÂ+ 6
)
ÂÂ6 7
)
ÂÂ7 8
{
ÊÊ 
var
ÁÁ 
p
ÁÁ 
=
ÁÁ 
productName
ÁÁ #
.
ÁÁ# $
ToLowerInvariant
ÁÁ$ 4
(
ÁÁ4 5
)
ÁÁ5 6
;
ÁÁ6 7
if
ËË 
(
ËË 
name
ËË 
.
ËË 
Contains
ËË !
(
ËË! "
p
ËË" #
)
ËË# $
)
ËË$ %
score
ÈÈ 
+=
ÈÈ 
$num
ÈÈ 
;
ÈÈ 
}
ÍÍ 
if
ÏÏ 
(
ÏÏ 
!
ÏÏ 
string
ÏÏ 
.
ÏÏ  
IsNullOrWhiteSpace
ÏÏ *
(
ÏÏ* +
activeIngredient
ÏÏ+ ;
)
ÏÏ; <
)
ÏÏ< =
{
ÌÌ 
var
ÔÔ 
ingredients
ÔÔ 
=
ÔÔ  !
activeIngredient
ÔÔ" 2
.
 
ToLowerInvariant
 %
(
% &
)
& '
.
ÒÒ 
Split
ÒÒ 
(
ÒÒ 
new
ÒÒ 
[
ÒÒ 
]
ÒÒ  
{
ÒÒ! "
$char
ÒÒ# &
,
ÒÒ& '
$char
ÒÒ( +
,
ÒÒ+ ,
$char
ÒÒ- 0
}
ÒÒ1 2
,
ÒÒ2 3 
StringSplitOptions
ÒÒ4 F
.
ÒÒF G 
RemoveEmptyEntries
ÒÒG Y
)
ÒÒY Z
.
ÚÚ 
Select
ÚÚ 
(
ÚÚ 
i
ÚÚ 
=>
ÚÚ  
i
ÚÚ! "
.
ÚÚ" #
Trim
ÚÚ# '
(
ÚÚ' (
)
ÚÚ( )
)
ÚÚ) *
.
ÛÛ 
Where
ÛÛ 
(
ÛÛ 
i
ÛÛ 
=>
ÛÛ 
i
ÛÛ  !
.
ÛÛ! "
Length
ÛÛ" (
>
ÛÛ) *
$num
ÛÛ+ ,
)
ÛÛ, -
.
ÙÙ 
ToList
ÙÙ 
(
ÙÙ 
)
ÙÙ 
;
ÙÙ 
foreach
ˆˆ 
(
ˆˆ 
var
ˆˆ 
ing
ˆˆ  
in
ˆˆ! #
ingredients
ˆˆ$ /
)
ˆˆ/ 0
{
˜˜ 
if
˘˘ 
(
˘˘ 
	substance
˘˘ !
.
˘˘! "
Contains
˘˘" *
(
˘˘* +
ing
˘˘+ .
)
˘˘. /
)
˘˘/ 0
{
˙˙ 
score
˚˚ 
+=
˚˚  
$num
˚˚! "
;
˚˚" #
continue
¸¸  
;
¸¸  !
}
˝˝ 
var
ÇÇ 
stem
ÇÇ 
=
ÇÇ 
ing
ÇÇ "
.
ÇÇ" #
Length
ÇÇ# )
>=
ÇÇ* ,
$num
ÇÇ- .
?
ÇÇ/ 0
ing
ÇÇ1 4
.
ÇÇ4 5
	Substring
ÇÇ5 >
(
ÇÇ> ?
$num
ÇÇ? @
,
ÇÇ@ A
$num
ÇÇB C
)
ÇÇC D
:
ÇÇE F
ing
ÇÇG J
;
ÇÇJ K
if
ÉÉ 
(
ÉÉ 
	substance
ÉÉ !
.
ÉÉ! "
Contains
ÉÉ" *
(
ÉÉ* +
stem
ÉÉ+ /
)
ÉÉ/ 0
)
ÉÉ0 1
{
ÑÑ 
score
ÖÖ 
+=
ÖÖ  
$num
ÖÖ! "
;
ÖÖ" #
continue
ÜÜ  
;
ÜÜ  !
}
áá 
var
ãã 
substanceWords
ãã &
=
ãã' (
	substance
ãã) 2
.
åå 
Split
åå 
(
åå 
new
åå "
[
åå" #
]
åå# $
{
åå% &
$char
åå' *
,
åå* +
$char
åå, /
,
åå/ 0
$char
åå1 4
,
åå4 5
$char
åå6 9
}
åå: ;
,
åå; < 
StringSplitOptions
åå= O
.
ååO P 
RemoveEmptyEntries
ååP b
)
ååb c
.
çç 
Where
çç 
(
çç 
w
çç  
=>
çç! #
w
çç$ %
.
çç% &
Length
çç& ,
>
çç- .
$num
çç/ 0
)
çç0 1
;
çç1 2
foreach
èè 
(
èè 
var
èè  
sw
èè! #
in
èè$ &
substanceWords
èè' 5
)
èè5 6
{
êê 
if
ëë 
(
ëë 
ing
ëë 
.
ëë  
Contains
ëë  (
(
ëë( )
sw
ëë) +
)
ëë+ ,
||
ëë- /
sw
ëë0 2
.
ëë2 3
Contains
ëë3 ;
(
ëë; <
ing
ëë< ?
.
ëë? @
Length
ëë@ F
>=
ëëG I
$num
ëëJ K
?
ëëL M
ing
ëëN Q
.
ëëQ R
	Substring
ëëR [
(
ëë[ \
$num
ëë\ ]
,
ëë] ^
$num
ëë_ `
)
ëë` a
:
ëëb c
ing
ëëd g
)
ëëg h
)
ëëh i
{
íí 
score
ìì !
+=
ìì" $
$num
ìì% &
;
ìì& '
break
îî !
;
îî! "
}
ïï 
}
ññ 
}
óó 
}
òò 
if
öö 
(
öö 
!
öö 
string
öö 
.
öö  
IsNullOrWhiteSpace
öö *
(
öö* +
dosage
öö+ 1
)
öö1 2
)
öö2 3
{
õõ 
var
úú 
d
úú 
=
úú 
dosage
úú 
.
úú 
ToLowerInvariant
úú /
(
úú/ 0
)
úú0 1
;
úú1 2
if
ùù 
(
ùù 
dbDosage
ùù 
.
ùù 
Contains
ùù %
(
ùù% &
d
ùù& '
)
ùù' (
||
ùù) +
name
ùù, 0
.
ùù0 1
Contains
ùù1 9
(
ùù9 :
d
ùù: ;
)
ùù; <
)
ùù< =
score
ûû 
+=
ûû 
$num
ûû 
;
ûû 
}
üü 
if
°° 
(
°° 
!
°° 
string
°° 
.
°°  
IsNullOrWhiteSpace
°° *
(
°°* +
form
°°+ /
)
°°/ 0
)
°°0 1
{
¢¢ 
var
££ 
f
££ 
=
££ 
form
££ 
.
££ 
ToLowerInvariant
££ -
(
££- .
)
££. /
;
££/ 0
var
§§ 
formVariants
§§  
=
§§! "
f
§§# $
.
§§$ %
Contains
§§% -
(
§§- .
$str
§§. =
)
§§= >
?
•• 
new
•• 
[
•• 
]
•• 
{
•• 
f
•• 
,
••  
$str
••! ,
}
••- .
:
¶¶ 
f
¶¶ 
.
¶¶ 
Contains
¶¶  
(
¶¶  !
$str
¶¶! ,
)
¶¶, -
&&
¶¶. 0
!
¶¶1 2
f
¶¶2 3
.
¶¶3 4
Contains
¶¶4 <
(
¶¶< =
$str
¶¶= C
)
¶¶C D
?
ßß 
new
ßß 
[
ßß 
]
ßß 
{
ßß  !
f
ßß" #
,
ßß# $
$str
ßß% 4
}
ßß5 6
:
®® 
new
®® 
[
®® 
]
®® 
{
®®  !
f
®®" #
}
®®$ %
;
®®% &
if
™™ 
(
™™ 
formVariants
™™  
.
™™  !
Any
™™! $
(
™™$ %
fv
™™% '
=>
™™( *
name
™™+ /
.
™™/ 0
Contains
™™0 8
(
™™8 9
fv
™™9 ;
)
™™; <
)
™™< =
)
™™= >
score
´´ 
+=
´´ 
$num
´´ 
;
´´ 
}
¨¨ 
return
ÆÆ 
score
ÆÆ 
;
ÆÆ 
}
ØØ 	
}
∞∞ 
}±± ñ!
jC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlMedicalHistoryEntryRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class .
"MySqlMedicalHistoryEntryRepository 3
:4 5*
IMedicalHistoryEntryRepository6 T
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public .
"MySqlMedicalHistoryEntryRepository 1
(1 2
MySqlDbContext2 @
contextA H
)H I
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
MedicalHistoryEntry -
>- .
AddAsync/ 7
(7 8
MedicalHistoryEntry8 K
entityL R
)R S
{ 	
_context 
. !
MedicalHistoryEntries *
.* +
Add+ .
(. /
entity/ 5
)5 6
;6 7
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
MedicalHistoryEntry -
>- .
DeleteAsync/ :
(: ;
MedicalHistoryEntry; N
entityO U
)U V
{ 	
_context 
. !
MedicalHistoryEntries *
.* +
Remove+ 1
(1 2
entity2 8
)8 9
;9 :
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public   
async   
Task   
<   
List   
<   
MedicalHistoryEntry   2
>  2 3
>  3 4
FindAllAsync  5 A
(  A B
)  B C
{!! 	
return"" 
await"" 
_context"" !
.""! "!
MedicalHistoryEntries""" 7
.""7 8
ToListAsync""8 C
(""C D
)""D E
;""E F
}## 	
public%% 
async%% 
Task%% 
<%% 
IEnumerable%% %
<%%% &
MedicalHistoryEntry%%& 9
>%%9 :
>%%: ;#
FindAllByPatientIdAsync%%< S
(%%S T
int%%T W
	patientId%%X a
)%%a b
{&& 	
return'' 
await'' 
_context'' !
.''! "!
MedicalHistoryEntries''" 7
.(( 
Where(( 
((( 
m(( 
=>(( 
m(( 
.(( 
	PatientId(( '
==((( *
	patientId((+ 4
)((4 5
.)) 
ToListAsync)) 
()) 
))) 
;)) 
}** 	
public,, 
async,, 
Task,, 
<,, 
MedicalHistoryEntry,, -
?,,- .
>,,. /
FindByIdAsync,,0 =
(,,= >
int,,> A
id,,B D
),,D E
{-- 	
return.. 
await.. 
_context.. !
...! "!
MedicalHistoryEntries.." 7
...7 8
	FindAsync..8 A
(..A B
id..B D
)..D E
;..E F
}// 	
public11 
async11 
Task11 
<11 
MedicalHistoryEntry11 -
>11- .
UpdateAsync11/ :
(11: ;
MedicalHistoryEntry11; N
entity11O U
)11U V
{22 	
_context33 
.33 !
MedicalHistoryEntries33 *
.33* +
Update33+ 1
(331 2
entity332 8
)338 9
;339 :
await44 
_context44 
.44 
SaveChangesAsync44 +
(44+ ,
)44, -
;44- .
return66 
entity66 
;66 
}77 	
}88 
}99 ≥–
fC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlDrugInteractionRepository.cs
	namespace

 	
Backend


 
.

 
Infrastructure

  
.

  !
Repositories

! -
{ 
public 

class *
MySqlDrugInteractionRepository /
:0 1&
IDrugInteractionRepository2 L
{ 
private 
readonly 
MySqlDbContext '
_context( 0
;0 1
public *
MySqlDrugInteractionRepository -
(- .
MySqlDbContext. <
context= D
)D E
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
string  
?  !
>! "'
GetDrugBankIdByAtcCodeAsync# >
(> ?
string? E
atcCodeF M
)M N
{ 	
return 
await 
_context !
.! "
AtcDrugMappings" 1
. 
Where 
( 
m 
=> 
m 
. 
AtcCode %
==& (
atcCode) 0
)0 1
. 
Select 
( 
m 
=> 
m 
. 

DrugBankId )
)) *
. 
FirstOrDefaultAsync $
($ %
)% &
;& '
} 	
public 
async 
Task 
< 
List 
< 
string %
>% &
>& ')
GetDrugBankIdsByAtcCodesAsync( E
(E F
ListF J
<J K
stringK Q
>Q R
atcCodeS Z
)Z [
{ 	
if 
( 
atcCode 
== 
null 
||  "
!# $
atcCode$ +
.+ ,
Any, /
(/ 0
)0 1
)1 2
{   
return!! 
new!! 
List!! 
<!!  
string!!  &
>!!& '
(!!' (
)!!( )
;!!) *
}"" 
var$$ 
drugBankIds$$ 
=$$ 
new$$ !
List$$" &
<$$& '
string$$' -
>$$- .
($$. /
)$$/ 0
;$$0 1
var%% 
connectionString%%  
=%%! "
_context%%# +
.%%+ ,
Database%%, 4
.%%4 5
GetConnectionString%%5 H
(%%H I
)%%I J
!%%J K
;%%K L
await'' 
using'' 
var'' 
conn''  
=''! "
new''# &
MySqlConnection''' 6
(''6 7
connectionString''7 G
)''G H
;''H I
await(( 
conn(( 
.(( 
	OpenAsync((  
(((  !
)((! "
;((" #
var** 
sb** 
=** 
new** 
System** 
.**  
Text**  $
.**$ %
StringBuilder**% 2
(**2 3
$str**3 w
)**w x
;**x y
var++ 

parameters++ 
=++ 
new++  
List++! %
<++% &
MySqlParameter++& 4
>++4 5
(++5 6
)++6 7
;++7 8
for-- 
(-- 
int-- 
i-- 
=-- 
$num-- 
;-- 
i-- 
<-- 
atcCode--  '
.--' (
Count--( -
;--- .
i--/ 0
++--0 2
)--2 3
{.. 
sb// 
.// 
Append// 
(// 
i// 
==// 
$num//  
?//! "
$str//# %
://& '
$str//( +
)//+ ,
;//, -
sb00 
.00 
Append00 
(00 
$"00 
$str00 
{00 
i00  
}00  !
"00! "
)00" #
;00# $

parameters11 
.11 
Add11 
(11 
new11 "
MySqlParameter11# 1
(111 2
$"112 4
$str114 6
{116 7
i117 8
}118 9
"119 :
,11: ;
atcCode11< C
[11C D
i11D E
]11E F
)11F G
)11G H
;11H I
}22 
sb33 
.33 
Append33 
(33 
$str33 
)33 
;33 
await55 
using55 
var55 
cmd55 
=55  !
new55" %
MySqlCommand55& 2
(552 3
sb553 5
.555 6
ToString556 >
(55> ?
)55? @
,55@ A
conn55B F
)55F G
;55G H
cmd66 
.66 

Parameters66 
.66 
AddRange66 #
(66# $

parameters66$ .
.66. /
ToArray66/ 6
(666 7
)667 8
)668 9
;669 :
await88 
using88 
var88 
reader88 "
=88# $
await88% *
cmd88+ .
.88. /
ExecuteReaderAsync88/ A
(88A B
)88B C
;88C D
while99 
(99 
await99 
reader99 
.99  
	ReadAsync99  )
(99) *
)99* +
)99+ ,
{:: 
drugBankIds;; 
.;; 
Add;; 
(;;  
reader;;  &
.;;& '
	GetString;;' 0
(;;0 1
$num;;1 2
);;2 3
);;3 4
;;;4 5
}<< 
return>> 
drugBankIds>> 
;>> 
}?? 	
publicAA 
asyncAA 
TaskAA 
<AA 
ListAA 
<AA 
DrugInteractionAA .
>AA. /
>AA/ 0 
GetInteractionsAsyncAA1 E
(AAE F
stringAAF L
newDrugBankIdAAM Z
,AAZ [
ListAA\ `
<AA` a
stringAAa g
>AAg h
existingDrugBankIdsAAi |
)AA| }
{BB 	
ifCC 
(CC 
existingDrugBankIdsCC #
==CC$ &
nullCC' +
||CC, .
!CC/ 0
existingDrugBankIdsCC0 C
.CCC D
AnyCCD G
(CCG H
)CCH I
)CCI J
{DD 
returnEE 
newEE 
ListEE 
<EE  
DrugInteractionEE  /
>EE/ 0
(EE0 1
)EE1 2
;EE2 3
}FF 
varHH 
interactionsHH 
=HH 
newHH "
ListHH# '
<HH' (
DrugInteractionHH( 7
>HH7 8
(HH8 9
)HH9 :
;HH: ;
varII 
connectionStringII  
=II! "
_contextII# +
.II+ ,
DatabaseII, 4
.II4 5
GetConnectionStringII5 H
(IIH I
)III J
!IIJ K
;IIK L
awaitKK 
usingKK 
varKK 
connKK  
=KK! "
newKK# &
MySqlConnectionKK' 6
(KK6 7
connectionStringKK7 G
)KKG H
;KKH I
awaitLL 
connLL 
.LL 
	OpenAsyncLL  
(LL  !
)LL! "
;LL" #
varNN 
inClauseBuilderNN 
=NN  !
newNN" %
SystemNN& ,
.NN, -
TextNN- 1
.NN1 2
StringBuilderNN2 ?
(NN? @
$strNN@ C
)NNC D
;NND E
varOO 

parametersOO 
=OO 
newOO  
ListOO! %
<OO% &
MySqlParameterOO& 4
>OO4 5
{PP 
newQQ 
MySqlParameterQQ "
(QQ" #
$strQQ# +
,QQ+ ,
newDrugBankIdQQ- :
)QQ: ;
}RR 
;RR 
forTT 
(TT 
intTT 
iTT 
=TT 
$numTT 
;TT 
iTT 
<TT 
existingDrugBankIdsTT  3
.TT3 4
CountTT4 9
;TT9 :
iTT; <
++TT< >
)TT> ?
{UU 
inClauseBuilderVV 
.VV  
AppendVV  &
(VV& '
iVV' (
==VV) +
$numVV, -
?VV. /
$strVV0 2
:VV3 4
$strVV5 8
)VV8 9
;VV9 :
inClauseBuilderWW 
.WW  
AppendWW  &
(WW& '
$"WW' )
$strWW) +
{WW+ ,
iWW, -
}WW- .
"WW. /
)WW/ 0
;WW0 1

parametersXX 
.XX 
AddXX 
(XX 
newXX "
MySqlParameterXX# 1
(XX1 2
$"XX2 4
$strXX4 6
{XX6 7
iXX7 8
}XX8 9
"XX9 :
,XX: ;
existingDrugBankIdsXX< O
[XXO P
iXXP Q
]XXQ R
)XXR S
)XXS T
;XXT U
}YY 
inClauseBuilderZZ 
.ZZ 
AppendZZ "
(ZZ" #
$strZZ# &
)ZZ& '
;ZZ' (
var\\ 
inClause\\ 
=\\ 
inClauseBuilder\\ *
.\\* +
ToString\\+ 3
(\\3 4
)\\4 5
;\\5 6
var^^ 
sql^^ 
=^^ 
$@"^^ 
$str^a I
{aaI J
inClauseaaJ R
}aaR S
$strabS +
{bb+ ,
inClausebb, 4
}bb4 5
$strbb5 T
"bbT U
;bbU V
awaitdd 
usingdd 
vardd 
cmddd 
=dd  !
newdd" %
MySqlCommanddd& 2
(dd2 3
sqldd3 6
,dd6 7
conndd8 <
)dd< =
;dd= >
cmdee 
.ee 

Parametersee 
.ee 
AddRangeee #
(ee# $

parametersee$ .
.ee. /
ToArrayee/ 6
(ee6 7
)ee7 8
)ee8 9
;ee9 :
awaitgg 
usinggg 
vargg 
readergg "
=gg# $
awaitgg% *
cmdgg+ .
.gg. /
ExecuteReaderAsyncgg/ A
(ggA B
)ggB C
;ggC D
whileii 
(ii 
awaitii 
readerii 
.ii  
	ReadAsyncii  )
(ii) *
)ii* +
)ii+ ,
{jj 
interactionskk 
.kk 
Addkk  
(kk  !
newkk! $
DrugInteractionkk% 4
{ll 
Idmm 
=mm 
readermm 
.mm  
GetInt32mm  (
(mm( )
readermm) /
.mm/ 0

GetOrdinalmm0 :
(mm: ;
$strmm; ?
)mm? @
)mm@ A
,mmA B
SourceDrugBankIdnn $
=nn% &
readernn' -
.nn- .
	GetStringnn. 7
(nn7 8
readernn8 >
.nn> ?

GetOrdinalnn? I
(nnI J
$strnnJ \
)nn\ ]
)nn] ^
,nn^ _
TargetDrugBankIdoo $
=oo% &
readeroo' -
.oo- .
	GetStringoo. 7
(oo7 8
readeroo8 >
.oo> ?

GetOrdinaloo? I
(ooI J
$strooJ \
)oo\ ]
)oo] ^
,oo^ _

TargetNameqq 
=qq  
readerqq! '
.qq' (
IsDBNullqq( 0
(qq0 1
readerqq1 7
.qq7 8

GetOrdinalqq8 B
(qqB C
$strqqC O
)qqO P
)qqP Q
?rr! "
stringrr# )
.rr) *
Emptyrr* /
:ss! "
readerss# )
.ss) *
	GetStringss* 3
(ss3 4
readerss4 :
.ss: ;

GetOrdinalss; E
(ssE F
$strssF R
)ssR S
)ssS T
,ssT U
Descriptionuu 
=uu  !
readeruu" (
.uu( )
IsDBNulluu) 1
(uu1 2
readeruu2 8
.uu8 9

GetOrdinaluu9 C
(uuC D
$struuD Q
)uuQ R
)uuR S
?vv" #
stringvv$ *
.vv* +
Emptyvv+ 0
:ww" #
readerww$ *
.ww* +
	GetStringww+ 4
(ww4 5
readerww5 ;
.ww; <

GetOrdinalww< F
(wwF G
$strwwG T
)wwT U
)wwU V
}xx 
)xx 
;xx 
}yy 
return{{ 
interactions{{ 
;{{  
}|| 	
public~~ 
async~~ 
Task~~ 
RebuildFromXmlAsync~~ -
(~~- .
string~~. 4
xmlPath~~5 <
)~~< =
{ 	
var
ÄÄ 
connectionString
ÄÄ  
=
ÄÄ! "
_context
ÄÄ# +
.
ÄÄ+ ,
Database
ÄÄ, 4
.
ÄÄ4 5!
GetConnectionString
ÄÄ5 H
(
ÄÄH I
)
ÄÄI J
!
ÄÄJ K
;
ÄÄK L
_context
ÅÅ 
.
ÅÅ 
ChangeTracker
ÅÅ "
.
ÅÅ" #&
AutoDetectChangesEnabled
ÅÅ# ;
=
ÅÅ< =
false
ÅÅ> C
;
ÅÅC D
try
ÉÉ 
{
ÑÑ 
await
ÖÖ 
using
ÖÖ 
var
ÖÖ 
transaction
ÖÖ  +
=
ÖÖ, -
await
ÖÖ. 3
_context
ÖÖ4 <
.
ÖÖ< =
Database
ÖÖ= E
.
ÖÖE F#
BeginTransactionAsync
ÖÖF [
(
ÖÖ[ \
)
ÖÖ\ ]
;
ÖÖ] ^
try
áá 
{
àà 
await
ää 
using
ää 
var
ää  #
conn
ää$ (
=
ää) *
new
ää+ .
MySqlConnection
ää/ >
(
ää> ?
connectionString
ää? O
)
ääO P
;
ääP Q
await
ãã 
conn
ãã 
.
ãã 
	OpenAsync
ãã (
(
ãã( )
)
ãã) *
;
ãã* +
var
çç 
truncateSql
çç #
=
çç$ %
$str
çë& 4
;
ëë4 5
await
ìì 
using
ìì 
var
ìì  #
cmd
ìì$ '
=
ìì( )
new
ìì* -
MySqlCommand
ìì. :
(
ìì: ;
truncateSql
ìì; F
,
ììF G
conn
ììH L
)
ììL M
;
ììM N
await
îî 
cmd
îî 
.
îî "
ExecuteNonQueryAsync
îî 2
(
îî2 3
)
îî3 4
;
îî4 5
_context
ïï 
.
ïï 
ChangeTracker
ïï *
.
ïï* +
Clear
ïï+ 0
(
ïï0 1
)
ïï1 2
;
ïï2 3
var
óó #
processedInteractions
óó -
=
óó. /
new
óó0 3
HashSet
óó4 ;
<
óó; <
string
óó< B
>
óóB C
(
óóC D
)
óóD E
;
óóE F
var
òò 
mappingsBatch
òò %
=
òò& '
new
òò( +
List
òò, 0
<
òò0 1
AtcDrugMapping
òò1 ?
>
òò? @
(
òò@ A
)
òòA B
;
òòB C
var
ôô 
interactionsBatch
ôô )
=
ôô* +
new
ôô, /
List
ôô0 4
<
ôô4 5
DrugInteraction
ôô5 D
>
ôôD E
(
ôôE F
)
ôôF G
;
ôôG H
var
öö 
detailsBatch
öö $
=
öö% &
new
öö' *
List
öö+ /
<
öö/ 0

DrugDetail
öö0 :
>
öö: ;
(
öö; <
)
öö< =
;
öö= >
const
úú 
int
úú 
	batchSize
úú '
=
úú( )
$num
úú* /
;
úú/ 0
const
ùù 
int
ùù 
detailsBatchSize
ùù .
=
ùù/ 0
$num
ùù1 4
;
ùù4 5
using
üü 
var
üü 
reader
üü $
=
üü% &
	XmlReader
üü' 0
.
üü0 1
Create
üü1 7
(
üü7 8
xmlPath
üü8 ?
)
üü? @
;
üü@ A
reader
†† 
.
†† 
MoveToContent
†† (
(
††( )
)
††) *
;
††* +
while
¢¢ 
(
¢¢ 
reader
¢¢ !
.
¢¢! "
Read
¢¢" &
(
¢¢& '
)
¢¢' (
)
¢¢( )
{
££ 
if
§§ 
(
§§ 
reader
§§ "
.
§§" #
NodeType
§§# +
==
§§, .
XmlNodeType
§§/ :
.
§§: ;
Element
§§; B
&&
§§C E
reader
§§F L
.
§§L M
Name
§§M Q
==
§§R T
$str
§§U [
)
§§[ \
{
•• 
using
¶¶ !
var
¶¶" %

drugReader
¶¶& 0
=
¶¶1 2
reader
¶¶3 9
.
¶¶9 :
ReadSubtree
¶¶: E
(
¶¶E F
)
¶¶F G
;
¶¶G H
var
ßß 
drugXml
ßß  '
=
ßß( )
XElement
ßß* 2
.
ßß2 3
Load
ßß3 7
(
ßß7 8

drugReader
ßß8 B
)
ßßB C
;
ßßC D
var
®® 
ns
®®  "
=
®®# $
drugXml
®®% ,
.
®®, -
Name
®®- 1
.
®®1 2
	Namespace
®®2 ;
;
®®; <
var
™™ 
	primaryId
™™  )
=
™™* +
drugXml
™™, 3
.
´´  !
Elements
´´! )
(
´´) *
ns
´´* ,
+
´´- .
$str
´´/ <
)
´´< =
.
¨¨  !
FirstOrDefault
¨¨! /
(
¨¨/ 0
e
¨¨0 1
=>
¨¨2 4
(
¨¨5 6
string
¨¨6 <
?
¨¨< =
)
¨¨= >
e
¨¨> ?
.
¨¨? @
	Attribute
¨¨@ I
(
¨¨I J
$str
¨¨J S
)
¨¨S T
==
¨¨U W
$str
¨¨X ^
)
¨¨^ _
?
¨¨_ `
.
¨¨` a
Value
¨¨a f
;
¨¨f g
var
ÆÆ 
drugName
ÆÆ  (
=
ÆÆ) *
drugXml
ÆÆ+ 2
.
ÆÆ2 3
Element
ÆÆ3 :
(
ÆÆ: ;
ns
ÆÆ; =
+
ÆÆ> ?
$str
ÆÆ@ F
)
ÆÆF G
?
ÆÆG H
.
ÆÆH I
Value
ÆÆI N
;
ÆÆN O
if
∞∞ 
(
∞∞  
string
∞∞  &
.
∞∞& '
IsNullOrEmpty
∞∞' 4
(
∞∞4 5
	primaryId
∞∞5 >
)
∞∞> ?
)
∞∞? @
continue
∞∞A I
;
∞∞I J
var
≤≤ 
toxicity
≤≤  (
=
≤≤) *
drugXml
≤≤+ 2
.
≤≤2 3
Element
≤≤3 :
(
≤≤: ;
ns
≤≤; =
+
≤≤> ?
$str
≤≤@ J
)
≤≤J K
?
≤≤K L
.
≤≤L M
Value
≤≤M R
;
≤≤R S
var
≥≥ 
pharmacodynamics
≥≥  0
=
≥≥1 2
drugXml
≥≥3 :
.
≥≥: ;
Element
≥≥; B
(
≥≥B C
ns
≥≥C E
+
≥≥F G
$str
≥≥H Z
)
≥≥Z [
?
≥≥[ \
.
≥≥\ ]
Value
≥≥] b
;
≥≥b c
var
¥¥ 
snpReactions
¥¥  ,
=
¥¥- .
drugXml
¥¥/ 6
.
¥¥6 7
Element
¥¥7 >
(
¥¥> ?
ns
¥¥? A
+
¥¥B C
$str
¥¥D `
)
¥¥` a
?
¥¥a b
.
¥¥b c
Value
¥¥c h
;
¥¥h i
if
∂∂ 
(
∂∂  
!
∂∂  !
string
∂∂! '
.
∂∂' ( 
IsNullOrWhiteSpace
∂∂( :
(
∂∂: ;
toxicity
∂∂; C
)
∂∂C D
||
∂∂E G
!
∑∑  !
string
∑∑! '
.
∑∑' ( 
IsNullOrWhiteSpace
∑∑( :
(
∑∑: ;
pharmacodynamics
∑∑; K
)
∑∑K L
||
∑∑M O
!
∏∏  !
string
∏∏! '
.
∏∏' ( 
IsNullOrWhiteSpace
∏∏( :
(
∏∏: ;
snpReactions
∏∏; G
)
∏∏G H
)
∏∏H I
{
ππ 
detailsBatch
∫∫  ,
.
∫∫, -
Add
∫∫- 0
(
∫∫0 1
new
∫∫1 4

DrugDetail
∫∫5 ?
{
ªª  !

DrugBankId
ºº$ .
=
ºº/ 0
	primaryId
ºº1 :
,
ºº: ;
Toxicity
ΩΩ$ ,
=
ΩΩ- .
toxicity
ΩΩ/ 7
?
ΩΩ7 8
.
ΩΩ8 9
Trim
ΩΩ9 =
(
ΩΩ= >
)
ΩΩ> ?
,
ΩΩ? @
Pharmacodynamics
ææ$ 4
=
ææ5 6
pharmacodynamics
ææ7 G
?
ææG H
.
ææH I
Trim
ææI M
(
ææM N
)
ææN O
,
ææO P!
SnpAdverseReactions
øø$ 7
=
øø8 9
snpReactions
øø: F
?
øøF G
.
øøG H
Trim
øøH L
(
øøL M
)
øøM N
}
¿¿  !
)
¿¿! "
;
¿¿" #
}
¡¡ 
foreach
ƒƒ #
(
ƒƒ$ %
var
ƒƒ% (
atc
ƒƒ) ,
in
ƒƒ- /
drugXml
ƒƒ0 7
.
ƒƒ7 8
Descendants
ƒƒ8 C
(
ƒƒC D
ns
ƒƒD F
+
ƒƒG H
$str
ƒƒI S
)
ƒƒS T
)
ƒƒT U
{
≈≈ 
var
∆∆  #
code
∆∆$ (
=
∆∆) *
atc
∆∆+ .
.
∆∆. /
	Attribute
∆∆/ 8
(
∆∆8 9
$str
∆∆9 ?
)
∆∆? @
?
∆∆@ A
.
∆∆A B
Value
∆∆B G
;
∆∆G H
if
««  "
(
««# $
!
««$ %
string
««% +
.
««+ ,
IsNullOrEmpty
««, 9
(
««9 :
code
««: >
)
««> ?
)
««? @
{
»»  !
mappingsBatch
……$ 1
.
……1 2
Add
……2 5
(
……5 6
new
……6 9
AtcDrugMapping
……: H
{
  $ %
AtcCode
ÀÀ( /
=
ÀÀ0 1
code
ÀÀ2 6
,
ÀÀ6 7

DrugBankId
ÃÃ( 2
=
ÃÃ3 4
	primaryId
ÃÃ5 >
,
ÃÃ> ?
DrugName
ÕÕ( 0
=
ÕÕ1 2
drugName
ÕÕ3 ;
??
ÕÕ< >
$str
ÕÕ? J
}
ŒŒ$ %
)
ŒŒ% &
;
ŒŒ& '
}
œœ  !
}
–– 
foreach
““ #
(
““$ %
var
““% (
inter
““) .
in
““/ 1
drugXml
““2 9
.
““9 :
Descendants
““: E
(
““E F
ns
““F H
+
““I J
$str
““K ]
)
““] ^
)
““^ _
{
”” 
var
‘‘  #
targetId
‘‘$ ,
=
‘‘- .
inter
‘‘/ 4
.
‘‘4 5
Element
‘‘5 <
(
‘‘< =
ns
‘‘= ?
+
‘‘@ A
$str
‘‘B O
)
‘‘O P
?
‘‘P Q
.
‘‘Q R
Value
‘‘R W
;
‘‘W X
if
’’  "
(
’’# $
!
’’$ %
string
’’% +
.
’’+ ,
IsNullOrEmpty
’’, 9
(
’’9 :
targetId
’’: B
)
’’B C
)
’’C D
{
÷÷  !
var
◊◊$ '
key
◊◊( +
=
◊◊, -
string
◊◊. 4
.
◊◊4 5
Compare
◊◊5 <
(
◊◊< =
	primaryId
◊◊= F
,
◊◊F G
targetId
◊◊H P
)
◊◊P Q
<
◊◊R S
$num
◊◊T U
?
ÿÿ( )
$"
ÿÿ* ,
{
ÿÿ, -
	primaryId
ÿÿ- 6
}
ÿÿ6 7
$str
ÿÿ7 8
{
ÿÿ8 9
targetId
ÿÿ9 A
}
ÿÿA B
"
ÿÿB C
:
ŸŸ( )
$"
ŸŸ* ,
{
ŸŸ, -
targetId
ŸŸ- 5
}
ŸŸ5 6
$str
ŸŸ6 7
{
ŸŸ7 8
	primaryId
ŸŸ8 A
}
ŸŸA B
"
ŸŸB C
;
ŸŸC D
if
€€$ &
(
€€' (#
processedInteractions
€€( =
.
€€= >
Add
€€> A
(
€€A B
key
€€B E
)
€€E F
)
€€F G
{
‹‹$ %
interactionsBatch
››( 9
.
››9 :
Add
››: =
(
››= >
new
››> A
DrugInteraction
››B Q
{
ﬁﬁ( )
SourceDrugBankId
ﬂﬂ, <
=
ﬂﬂ= >
	primaryId
ﬂﬂ? H
,
ﬂﬂH I
TargetDrugBankId
‡‡, <
=
‡‡= >
targetId
‡‡? G
,
‡‡G H

TargetName
··, 6
=
··7 8
inter
··9 >
.
··> ?
Element
··? F
(
··F G
ns
··G I
+
··J K
$str
··L R
)
··R S
?
··S T
.
··T U
Value
··U Z
??
··[ ]
$str
··^ i
,
··i j
Description
‚‚, 7
=
‚‚8 9
inter
‚‚: ?
.
‚‚? @
Element
‚‚@ G
(
‚‚G H
ns
‚‚H J
+
‚‚K L
$str
‚‚M Z
)
‚‚Z [
?
‚‚[ \
.
‚‚\ ]
Value
‚‚] b
??
‚‚c e
$str
‚‚f h
}
„„( )
)
„„) *
;
„„* +
}
‰‰$ %
}
ÂÂ  !
}
ÊÊ 
if
ËË 
(
ËË  
mappingsBatch
ËË  -
.
ËË- .
Count
ËË. 3
>=
ËË4 6
	batchSize
ËË7 @
)
ËË@ A
await
ÈÈ  % 
FlushMappingsAsync
ÈÈ& 8
(
ÈÈ8 9
connectionString
ÈÈ9 I
,
ÈÈI J
mappingsBatch
ÈÈK X
)
ÈÈX Y
;
ÈÈY Z
if
ÎÎ 
(
ÎÎ  
interactionsBatch
ÎÎ  1
.
ÎÎ1 2
Count
ÎÎ2 7
>=
ÎÎ8 :
	batchSize
ÎÎ; D
)
ÎÎD E
await
ÏÏ  %$
FlushInteractionsAsync
ÏÏ& <
(
ÏÏ< =
connectionString
ÏÏ= M
,
ÏÏM N
interactionsBatch
ÏÏO `
)
ÏÏ` a
;
ÏÏa b
if
ÓÓ 
(
ÓÓ  
detailsBatch
ÓÓ  ,
.
ÓÓ, -
Count
ÓÓ- 2
>=
ÓÓ3 5
detailsBatchSize
ÓÓ6 F
)
ÓÓF G
await
ÔÔ  %
FlushDetailsAsync
ÔÔ& 7
(
ÔÔ7 8
connectionString
ÔÔ8 H
,
ÔÔH I
detailsBatch
ÔÔJ V
)
ÔÔV W
;
ÔÔW X
}
 
}
ÒÒ 
await
ÛÛ  
FlushMappingsAsync
ÛÛ ,
(
ÛÛ, -
connectionString
ÛÛ- =
,
ÛÛ= >
mappingsBatch
ÛÛ> K
)
ÛÛK L
;
ÛÛL M
await
ÙÙ $
FlushInteractionsAsync
ÙÙ 0
(
ÙÙ0 1
connectionString
ÙÙ1 A
,
ÙÙA B
interactionsBatch
ÙÙB S
)
ÙÙS T
;
ÙÙT U
await
ıı 
FlushDetailsAsync
ıı +
(
ıı+ ,
connectionString
ıı, <
,
ıı< =
detailsBatch
ıı> J
)
ııJ K
;
ııK L#
processedInteractions
˜˜ )
.
˜˜) *
Clear
˜˜* /
(
˜˜/ 0
)
˜˜0 1
;
˜˜1 2
await
˘˘ 
transaction
˘˘ %
.
˘˘% &
CommitAsync
˘˘& 1
(
˘˘1 2
)
˘˘2 3
;
˘˘3 4
}
˙˙ 
catch
˚˚ 
{
¸¸ 
await
˝˝ 
transaction
˝˝ %
.
˝˝% &
RollbackAsync
˝˝& 3
(
˝˝3 4
)
˝˝4 5
;
˝˝5 6
throw
˛˛ 
;
˛˛ 
}
ˇˇ 
}
ÄÄ 
finally
ÅÅ 
{
ÇÇ 
_context
ÉÉ 
.
ÉÉ 
ChangeTracker
ÉÉ &
.
ÉÉ& '&
AutoDetectChangesEnabled
ÉÉ' ?
=
ÉÉ@ A
true
ÉÉB F
;
ÉÉF G
}
ÑÑ 
}
ÖÖ 	
private
ÜÜ 
static
ÜÜ 
async
ÜÜ 
Task
ÜÜ ! 
FlushMappingsAsync
ÜÜ" 4
(
ÜÜ4 5
string
ÜÜ5 ;
connectionString
ÜÜ< L
,
ÜÜL M
List
ÜÜN R
<
ÜÜR S
AtcDrugMapping
ÜÜS a
>
ÜÜa b
mappings
ÜÜc k
)
ÜÜk l
{
áá 	
if
àà 
(
àà 
!
àà 
mappings
àà 
.
àà 
Any
àà 
(
àà 
)
àà 
)
àà  
return
àà! '
;
àà' (
await
ää 
using
ää 
var
ää 
conn
ää  
=
ää! "
new
ää# &
MySqlConnection
ää' 6
(
ää6 7
connectionString
ää7 G
)
ääG H
;
ääH I
await
ãã 
conn
ãã 
.
ãã 
	OpenAsync
ãã  
(
ãã  !
)
ãã! "
;
ãã" #
const
çç 
int
çç 
	chunkSize
çç 
=
çç  !
$num
çç" &
;
çç& '
for
éé 
(
éé 
int
éé 
i
éé 
=
éé 
$num
éé 
;
éé 
i
éé 
<
éé 
mappings
éé  (
.
éé( )
Count
éé) .
;
éé. /
i
éé0 1
+=
éé2 4
	chunkSize
éé5 >
)
éé> ?
{
èè 
var
êê 
chunk
êê 
=
êê 
mappings
êê $
.
êê$ %
Skip
êê% )
(
êê) *
i
êê* +
)
êê+ ,
.
êê, -
Take
êê- 1
(
êê1 2
	chunkSize
êê2 ;
)
êê; <
.
êê< =
ToList
êê= C
(
êêC D
)
êêD E
;
êêE F
var
ëë 
values
ëë 
=
ëë 
string
ëë #
.
ëë# $
Join
ëë$ (
(
ëë( )
$str
ëë) ,
,
ëë, -
chunk
ëë. 3
.
ëë3 4
Select
ëë4 :
(
ëë: ;
_
ëë; <
=>
ëë= ?
$str
ëë@ O
.
ëëO P
Replace
ëëP W
(
ëëW X
$str
ëëX \
,
ëë\ ]
$"
ëë^ `
$str
ëë` b
{
ëëb c
i
ëëc d
}
ëëd e
"
ëëe f
)
ëëf g
.
ëëg h
Replace
ëëh o
(
ëëo p
$str
ëëp t
,
ëët u
$"
ëëv x
$str
ëëx z
{
ëëz {
i
ëë{ |
}
ëë| }
"
ëë} ~
)
ëë~ 
.ëë Ä
ReplaceëëÄ á
(ëëá à
$strëëà å
,ëëå ç
$"ëëé ê
$strëëê í
{ëëí ì
iëëì î
}ëëî ï
"ëëï ñ
)ëëñ ó
)ëëó ò
)ëëò ô
;ëëô ö
var
îî 
sb
îî 
=
îî 
new
îî 
System
îî #
.
îî# $
Text
îî$ (
.
îî( )
StringBuilder
îî) 6
(
îî6 7
$str
îî7 |
)
îî| }
;
îî} ~
var
ïï 

parameters
ïï 
=
ïï  
new
ïï! $
List
ïï% )
<
ïï) *
MySqlParameter
ïï* 8
>
ïï8 9
(
ïï9 :
)
ïï: ;
;
ïï; <
for
óó 
(
óó 
int
óó 
j
óó 
=
óó 
$num
óó 
;
óó 
j
óó  !
<
óó" #
chunk
óó$ )
.
óó) *
Count
óó* /
;
óó/ 0
j
óó1 2
++
óó2 4
)
óó4 5
{
òò 
sb
ôô 
.
ôô 
Append
ôô 
(
ôô 
j
ôô 
==
ôô  "
$num
ôô# $
?
ôô% &
$str
ôô' )
:
ôô* +
$str
ôô, /
)
ôô/ 0
;
ôô0 1
sb
öö 
.
öö 
Append
öö 
(
öö 
$"
öö  
$str
öö  $
{
öö$ %
j
öö% &
}
öö& '
$str
öö' +
{
öö+ ,
j
öö, -
}
öö- .
$str
öö. 2
{
öö2 3
j
öö3 4
}
öö4 5
$str
öö5 6
"
öö6 7
)
öö7 8
;
öö8 9

parameters
õõ 
.
õõ 
Add
õõ "
(
õõ" #
new
õõ# &
MySqlParameter
õõ' 5
(
õõ5 6
$"
õõ6 8
$str
õõ8 ;
{
õõ; <
j
õõ< =
}
õõ= >
"
õõ> ?
,
õõ? @
chunk
õõA F
[
õõF G
j
õõG H
]
õõH I
.
õõI J
AtcCode
õõJ Q
)
õõQ R
)
õõR S
;
õõS T

parameters
úú 
.
úú 
Add
úú "
(
úú" #
new
úú# &
MySqlParameter
úú' 5
(
úú5 6
$"
úú6 8
$str
úú8 ;
{
úú; <
j
úú< =
}
úú= >
"
úú> ?
,
úú? @
chunk
úúA F
[
úúF G
j
úúG H
]
úúH I
.
úúI J

DrugBankId
úúJ T
)
úúT U
)
úúU V
;
úúV W

parameters
ùù 
.
ùù 
Add
ùù "
(
ùù" #
new
ùù# &
MySqlParameter
ùù' 5
(
ùù5 6
$"
ùù6 8
$str
ùù8 ;
{
ùù; <
j
ùù< =
}
ùù= >
"
ùù> ?
,
ùù? @
chunk
ùùA F
[
ùùF G
j
ùùG H
]
ùùH I
.
ùùI J
DrugName
ùùJ R
)
ùùR S
)
ùùS T
;
ùùT U
}
ûû 
await
†† 
using
†† 
var
†† 
cmd
††  #
=
††$ %
new
††& )
MySqlCommand
††* 6
(
††6 7
sb
††7 9
.
††9 :
ToString
††: B
(
††B C
)
††C D
,
††D E
conn
††F J
)
††J K
;
††K L
cmd
°° 
.
°° 

Parameters
°° 
.
°° 
AddRange
°° '
(
°°' (

parameters
°°( 2
.
°°2 3
ToArray
°°3 :
(
°°: ;
)
°°; <
)
°°< =
;
°°= >
await
¢¢ 
cmd
¢¢ 
.
¢¢ "
ExecuteNonQueryAsync
¢¢ .
(
¢¢. /
)
¢¢/ 0
;
¢¢0 1
}
££ 
mappings
•• 
.
•• 
Clear
•• 
(
•• 
)
•• 
;
•• 
}
¶¶ 	
private
®® 
static
®® 
async
®® 
Task
®® !$
FlushInteractionsAsync
®®" 8
(
®®8 9
string
®®9 ?
connectionString
®®@ P
,
®®P Q
List
®®R V
<
®®V W
DrugInteraction
®®W f
>
®®f g
interactions
®®h t
)
®®t u
{
©© 	
if
™™ 
(
™™ 
!
™™ 
interactions
™™ 
.
™™ 
Any
™™ !
(
™™! "
)
™™" #
)
™™# $
return
™™% +
;
™™+ ,
await
¨¨ 
using
¨¨ 
var
¨¨ 
conn
¨¨  
=
¨¨! "
new
¨¨# &
MySqlConnection
¨¨' 6
(
¨¨6 7
connectionString
¨¨7 G
)
¨¨G H
;
¨¨H I
await
≠≠ 
conn
≠≠ 
.
≠≠ 
	OpenAsync
≠≠  
(
≠≠  !
)
≠≠! "
;
≠≠" #
const
ØØ 
int
ØØ 
	chunkSize
ØØ 
=
ØØ  !
$num
ØØ" &
;
ØØ& '
for
∞∞ 
(
∞∞ 
int
∞∞ 
i
∞∞ 
=
∞∞ 
$num
∞∞ 
;
∞∞ 
i
∞∞ 
<
∞∞ 
interactions
∞∞  ,
.
∞∞, -
Count
∞∞- 2
;
∞∞2 3
i
∞∞4 5
+=
∞∞6 8
	chunkSize
∞∞9 B
)
∞∞B C
{
±± 
var
≤≤ 
chunk
≤≤ 
=
≤≤ 
interactions
≤≤ (
.
≤≤( )
Skip
≤≤) -
(
≤≤- .
i
≤≤. /
)
≤≤/ 0
.
≤≤0 1
Take
≤≤1 5
(
≤≤5 6
	chunkSize
≤≤6 ?
)
≤≤? @
.
≤≤@ A
ToList
≤≤A G
(
≤≤G H
)
≤≤H I
;
≤≤I J
var
¥¥ 
sb
¥¥ 
=
¥¥ 
new
¥¥ 
System
¥¥ #
.
¥¥# $
Text
¥¥$ (
.
¥¥( )
StringBuilder
¥¥) 6
(
¥¥6 7
$str¥¥7 õ
)¥¥õ ú
;¥¥ú ù
var
µµ 

parameters
µµ 
=
µµ  
new
µµ! $
List
µµ% )
<
µµ) *
MySqlParameter
µµ* 8
>
µµ8 9
(
µµ9 :
)
µµ: ;
;
µµ; <
for
∑∑ 
(
∑∑ 
int
∑∑ 
j
∑∑ 
=
∑∑ 
$num
∑∑ 
;
∑∑ 
j
∑∑  !
<
∑∑" #
chunk
∑∑$ )
.
∑∑) *
Count
∑∑* /
;
∑∑/ 0
j
∑∑1 2
++
∑∑2 4
)
∑∑4 5
{
∏∏ 
sb
ππ 
.
ππ 
Append
ππ 
(
ππ 
j
ππ 
==
ππ  "
$num
ππ# $
?
ππ% &
$str
ππ' )
:
ππ* +
$str
ππ, /
)
ππ/ 0
;
ππ0 1
sb
∫∫ 
.
∫∫ 
Append
∫∫ 
(
∫∫ 
$"
∫∫  
$str
∫∫  #
{
∫∫# $
j
∫∫$ %
}
∫∫% &
$str
∫∫& )
{
∫∫) *
j
∫∫* +
}
∫∫+ ,
$str
∫∫, 0
{
∫∫0 1
j
∫∫1 2
}
∫∫2 3
$str
∫∫3 6
{
∫∫6 7
j
∫∫7 8
}
∫∫8 9
$str
∫∫9 :
"
∫∫: ;
)
∫∫; <
;
∫∫< =

parameters
ªª 
.
ªª 
Add
ªª "
(
ªª" #
new
ªª# &
MySqlParameter
ªª' 5
(
ªª5 6
$"
ªª6 8
$str
ªª8 :
{
ªª: ;
j
ªª; <
}
ªª< =
"
ªª= >
,
ªª> ?
chunk
ªª@ E
[
ªªE F
j
ªªF G
]
ªªG H
.
ªªH I
SourceDrugBankId
ªªI Y
)
ªªY Z
)
ªªZ [
;
ªª[ \

parameters
ºº 
.
ºº 
Add
ºº "
(
ºº" #
new
ºº# &
MySqlParameter
ºº' 5
(
ºº5 6
$"
ºº6 8
$str
ºº8 :
{
ºº: ;
j
ºº; <
}
ºº< =
"
ºº= >
,
ºº> ?
chunk
ºº@ E
[
ººE F
j
ººF G
]
ººG H
.
ººH I
TargetDrugBankId
ººI Y
)
ººY Z
)
ººZ [
;
ºº[ \

parameters
ΩΩ 
.
ΩΩ 
Add
ΩΩ "
(
ΩΩ" #
new
ΩΩ# &
MySqlParameter
ΩΩ' 5
(
ΩΩ5 6
$"
ΩΩ6 8
$str
ΩΩ8 ;
{
ΩΩ; <
j
ΩΩ< =
}
ΩΩ= >
"
ΩΩ> ?
,
ΩΩ? @
chunk
ΩΩA F
[
ΩΩF G
j
ΩΩG H
]
ΩΩH I
.
ΩΩI J

TargetName
ΩΩJ T
)
ΩΩT U
)
ΩΩU V
;
ΩΩV W

parameters
ææ 
.
ææ 
Add
ææ "
(
ææ" #
new
ææ# &
MySqlParameter
ææ' 5
(
ææ5 6
$"
ææ6 8
$str
ææ8 :
{
ææ: ;
j
ææ; <
}
ææ< =
"
ææ= >
,
ææ> ?
chunk
ææ@ E
[
ææE F
j
ææF G
]
ææG H
.
ææH I
Description
ææI T
)
ææT U
)
ææU V
;
ææV W
}
øø 
await
¡¡ 
using
¡¡ 
var
¡¡ 
cmd
¡¡  #
=
¡¡$ %
new
¡¡& )
MySqlCommand
¡¡* 6
(
¡¡6 7
sb
¡¡7 9
.
¡¡9 :
ToString
¡¡: B
(
¡¡B C
)
¡¡C D
,
¡¡D E
conn
¡¡F J
)
¡¡J K
;
¡¡K L
cmd
¬¬ 
.
¬¬ 

Parameters
¬¬ 
.
¬¬ 
AddRange
¬¬ '
(
¬¬' (

parameters
¬¬( 2
.
¬¬2 3
ToArray
¬¬3 :
(
¬¬: ;
)
¬¬; <
)
¬¬< =
;
¬¬= >
await
√√ 
cmd
√√ 
.
√√ "
ExecuteNonQueryAsync
√√ .
(
√√. /
)
√√/ 0
;
√√0 1
}
ƒƒ 
interactions
∆∆ 
.
∆∆ 
Clear
∆∆ 
(
∆∆ 
)
∆∆  
;
∆∆  !
}
«« 	
private
…… 
static
…… 
async
…… 
Task
…… !
FlushDetailsAsync
……" 3
(
……3 4
string
……4 :
connectionString
……; K
,
……K L
List
……M Q
<
……Q R

DrugDetail
……R \
>
……\ ]
details
……^ e
)
……e f
{
   	
if
ÀÀ 
(
ÀÀ 
!
ÀÀ 
details
ÀÀ 
.
ÀÀ 
Any
ÀÀ 
(
ÀÀ 
)
ÀÀ 
)
ÀÀ 
return
ÀÀ  &
;
ÀÀ& '
await
ÕÕ 
using
ÕÕ 
var
ÕÕ 
conn
ÕÕ  
=
ÕÕ! "
new
ÕÕ# &
MySqlConnection
ÕÕ' 6
(
ÕÕ6 7
connectionString
ÕÕ7 G
)
ÕÕG H
;
ÕÕH I
await
ŒŒ 
conn
ŒŒ 
.
ŒŒ 
	OpenAsync
ŒŒ  
(
ŒŒ  !
)
ŒŒ! "
;
ŒŒ" #
const
–– 
int
–– 
	chunkSize
–– 
=
––  !
$num
––" %
;
––% &
for
—— 
(
—— 
int
—— 
i
—— 
=
—— 
$num
—— 
;
—— 
i
—— 
<
—— 
details
——  '
.
——' (
Count
——( -
;
——- .
i
——/ 0
+=
——1 3
	chunkSize
——4 =
)
——= >
{
““ 
var
”” 
chunk
”” 
=
”” 
details
”” #
.
””# $
Skip
””$ (
(
””( )
i
””) *
)
””* +
.
””+ ,
Take
””, 0
(
””0 1
	chunkSize
””1 :
)
””: ;
.
””; <
ToList
””< B
(
””B C
)
””C D
;
””D E
var
’’ 
sb
’’ 
=
’’ 
new
’’ 
System
’’ #
.
’’# $
Text
’’$ (
.
’’( )
StringBuilder
’’) 6
(
’’6 7
$str’’7 ñ
)’’ñ ó
;’’ó ò
var
÷÷ 

parameters
÷÷ 
=
÷÷  
new
÷÷! $
List
÷÷% )
<
÷÷) *
MySqlParameter
÷÷* 8
>
÷÷8 9
(
÷÷9 :
)
÷÷: ;
;
÷÷; <
for
ÿÿ 
(
ÿÿ 
int
ÿÿ 
j
ÿÿ 
=
ÿÿ 
$num
ÿÿ 
;
ÿÿ 
j
ÿÿ  !
<
ÿÿ" #
chunk
ÿÿ$ )
.
ÿÿ) *
Count
ÿÿ* /
;
ÿÿ/ 0
j
ÿÿ1 2
++
ÿÿ2 4
)
ÿÿ4 5
{
ŸŸ 
sb
⁄⁄ 
.
⁄⁄ 
Append
⁄⁄ 
(
⁄⁄ 
j
⁄⁄ 
==
⁄⁄  "
$num
⁄⁄# $
?
⁄⁄% &
$str
⁄⁄' )
:
⁄⁄* +
$str
⁄⁄, /
)
⁄⁄/ 0
;
⁄⁄0 1
sb
€€ 
.
€€ 
Append
€€ 
(
€€ 
$"
€€  
$str
€€  $
{
€€$ %
j
€€% &
}
€€& '
$str
€€' +
{
€€+ ,
j
€€, -
}
€€- .
$str
€€. 2
{
€€2 3
j
€€3 4
}
€€4 5
$str
€€5 9
{
€€9 :
j
€€: ;
}
€€; <
$str
€€< =
"
€€= >
)
€€> ?
;
€€? @

parameters
›› 
.
›› 
Add
›› "
(
››" #
new
››# &
MySqlParameter
››' 5
(
››5 6
$"
››6 8
$str
››8 ;
{
››; <
j
››< =
}
››= >
"
››> ?
,
››? @
chunk
››A F
[
››F G
j
››G H
]
››H I
.
››I J

DrugBankId
››J T
)
››T U
)
››U V
;
››V W

parameters
ﬁﬁ 
.
ﬁﬁ 
Add
ﬁﬁ "
(
ﬁﬁ" #
new
ﬁﬁ# &
MySqlParameter
ﬁﬁ' 5
(
ﬁﬁ5 6
$"
ﬁﬁ6 8
$str
ﬁﬁ8 ;
{
ﬁﬁ; <
j
ﬁﬁ< =
}
ﬁﬁ= >
"
ﬁﬁ> ?
,
ﬁﬁ? @
chunk
ﬁﬁA F
[
ﬁﬁF G
j
ﬁﬁG H
]
ﬁﬁH I
.
ﬁﬁI J
Toxicity
ﬁﬁJ R
??
ﬁﬁS U
(
ﬁﬁV W
object
ﬁﬁW ]
)
ﬁﬁ] ^
DBNull
ﬁﬁ^ d
.
ﬁﬁd e
Value
ﬁﬁe j
)
ﬁﬁj k
)
ﬁﬁk l
;
ﬁﬁl m

parameters
ﬂﬂ 
.
ﬂﬂ 
Add
ﬂﬂ "
(
ﬂﬂ" #
new
ﬂﬂ# &
MySqlParameter
ﬂﬂ' 5
(
ﬂﬂ5 6
$"
ﬂﬂ6 8
$str
ﬂﬂ8 ;
{
ﬂﬂ; <
j
ﬂﬂ< =
}
ﬂﬂ= >
"
ﬂﬂ> ?
,
ﬂﬂ? @
chunk
ﬂﬂA F
[
ﬂﬂF G
j
ﬂﬂG H
]
ﬂﬂH I
.
ﬂﬂI J
Pharmacodynamics
ﬂﬂJ Z
??
ﬂﬂ[ ]
(
ﬂﬂ^ _
object
ﬂﬂ_ e
)
ﬂﬂe f
DBNull
ﬂﬂf l
.
ﬂﬂl m
Value
ﬂﬂm r
)
ﬂﬂr s
)
ﬂﬂs t
;
ﬂﬂt u

parameters
‡‡ 
.
‡‡ 
Add
‡‡ "
(
‡‡" #
new
‡‡# &
MySqlParameter
‡‡' 5
(
‡‡5 6
$"
‡‡6 8
$str
‡‡8 ;
{
‡‡; <
j
‡‡< =
}
‡‡= >
"
‡‡> ?
,
‡‡? @
chunk
‡‡A F
[
‡‡F G
j
‡‡G H
]
‡‡H I
.
‡‡I J!
SnpAdverseReactions
‡‡J ]
??
‡‡^ `
(
‡‡a b
object
‡‡b h
)
‡‡h i
DBNull
‡‡i o
.
‡‡o p
Value
‡‡p u
)
‡‡u v
)
‡‡v w
;
‡‡w x
}
·· 
await
„„ 
using
„„ 
var
„„ 
cmd
„„  #
=
„„$ %
new
„„& )
MySqlCommand
„„* 6
(
„„6 7
sb
„„7 9
.
„„9 :
ToString
„„: B
(
„„B C
)
„„C D
,
„„D E
conn
„„F J
)
„„J K
;
„„K L
cmd
‰‰ 
.
‰‰ 

Parameters
‰‰ 
.
‰‰ 
AddRange
‰‰ '
(
‰‰' (

parameters
‰‰( 2
.
‰‰2 3
ToArray
‰‰3 :
(
‰‰: ;
)
‰‰; <
)
‰‰< =
;
‰‰= >
await
ÂÂ 
cmd
ÂÂ 
.
ÂÂ "
ExecuteNonQueryAsync
ÂÂ .
(
ÂÂ. /
)
ÂÂ/ 0
;
ÂÂ0 1
}
ÊÊ 
details
ËË 
.
ËË 
Clear
ËË 
(
ËË 
)
ËË 
;
ËË 
}
ÈÈ 	
public
ÎÎ 
async
ÎÎ 
Task
ÎÎ 
<
ÎÎ 
List
ÎÎ 
<
ÎÎ 
DrugInteraction
ÎÎ .
>
ÎÎ. /
>
ÎÎ/ 0'
GetInteractionsAmongAsync
ÎÎ1 J
(
ÎÎJ K
List
ÎÎK O
<
ÎÎO P
string
ÎÎP V
>
ÎÎV W
drugBankIds
ÎÎX c
)
ÎÎc d
{
ÏÏ 	
if
ÌÌ 
(
ÌÌ 
drugBankIds
ÌÌ 
==
ÌÌ 
null
ÌÌ #
||
ÌÌ$ &
drugBankIds
ÌÌ' 2
.
ÌÌ2 3
Count
ÌÌ3 8
<
ÌÌ9 :
$num
ÌÌ; <
)
ÌÌ< =
return
ÌÌ> D
new
ÌÌE H
List
ÌÌI M
<
ÌÌM N
DrugInteraction
ÌÌN ]
>
ÌÌ] ^
(
ÌÌ^ _
)
ÌÌ_ `
;
ÌÌ` a
var
ÔÔ 
interactions
ÔÔ 
=
ÔÔ 
new
ÔÔ "
List
ÔÔ# '
<
ÔÔ' (
DrugInteraction
ÔÔ( 7
>
ÔÔ7 8
(
ÔÔ8 9
)
ÔÔ9 :
;
ÔÔ: ;
var
 
connectionString
  
=
! "
_context
# +
.
+ ,
Database
, 4
.
4 5!
GetConnectionString
5 H
(
H I
)
I J
!
J K
;
K L
await
ÒÒ 
using
ÒÒ 
var
ÒÒ 
conn
ÒÒ  
=
ÒÒ! "
new
ÒÒ# &
MySqlConnection
ÒÒ' 6
(
ÒÒ6 7
connectionString
ÒÒ7 G
)
ÒÒG H
;
ÒÒH I
await
ÚÚ 
conn
ÚÚ 
.
ÚÚ 
	OpenAsync
ÚÚ  
(
ÚÚ  !
)
ÚÚ! "
;
ÚÚ" #
var
ÙÙ 
inClauseBuilder
ÙÙ 
=
ÙÙ  !
new
ÙÙ" %
System
ÙÙ& ,
.
ÙÙ, -
Text
ÙÙ- 1
.
ÙÙ1 2
StringBuilder
ÙÙ2 ?
(
ÙÙ? @
$str
ÙÙ@ C
)
ÙÙC D
;
ÙÙD E
var
ıı 

parameters
ıı 
=
ıı 
new
ıı  
List
ıı! %
<
ıı% &
MySqlParameter
ıı& 4
>
ıı4 5
(
ıı5 6
)
ıı6 7
;
ıı7 8
for
ˆˆ 
(
ˆˆ 
int
ˆˆ 
i
ˆˆ 
=
ˆˆ 
$num
ˆˆ 
;
ˆˆ 
i
ˆˆ 
<
ˆˆ 
drugBankIds
ˆˆ  +
.
ˆˆ+ ,
Count
ˆˆ, 1
;
ˆˆ1 2
i
ˆˆ3 4
++
ˆˆ4 6
)
ˆˆ6 7
{
˜˜ 
inClauseBuilder
¯¯ 
.
¯¯  
Append
¯¯  &
(
¯¯& '
i
¯¯' (
==
¯¯) +
$num
¯¯, -
?
¯¯. /
$str
¯¯0 2
:
¯¯3 4
$str
¯¯5 8
)
¯¯8 9
;
¯¯9 :
inClauseBuilder
˘˘ 
.
˘˘  
Append
˘˘  &
(
˘˘& '
$"
˘˘' )
$str
˘˘) +
{
˘˘+ ,
i
˘˘, -
}
˘˘- .
"
˘˘. /
)
˘˘/ 0
;
˘˘0 1

parameters
˙˙ 
.
˙˙ 
Add
˙˙ 
(
˙˙ 
new
˙˙ "
MySqlParameter
˙˙# 1
(
˙˙1 2
$"
˙˙2 4
$str
˙˙4 6
{
˙˙6 7
i
˙˙7 8
}
˙˙8 9
"
˙˙9 :
,
˙˙: ;
drugBankIds
˙˙< G
[
˙˙G H
i
˙˙H I
]
˙˙I J
)
˙˙J K
)
˙˙K L
;
˙˙L M
}
˚˚ 
inClauseBuilder
¸¸ 
.
¸¸ 
Append
¸¸ "
(
¸¸" #
$str
¸¸# &
)
¸¸& '
;
¸¸' (
var
˝˝ 
inClause
˝˝ 
=
˝˝ 
inClauseBuilder
˝˝ *
.
˝˝* +
ToString
˝˝+ 3
(
˝˝3 4
)
˝˝4 5
;
˝˝5 6
var
ˇˇ 
sql
ˇˇ 
=
ˇˇ 
$@"
ˇˇ 
$str
ˇÇ *
{
ÇÇ* +
inClause
ÇÇ+ 3
}
ÇÇ3 4
$str
ÇÇ4 M
{
ÇÇM N
inClause
ÇÇN V
}
ÇÇV W
"
ÇÇW X
;
ÇÇX Y
await
ÑÑ 
using
ÑÑ 
var
ÑÑ 
cmd
ÑÑ 
=
ÑÑ  !
new
ÑÑ" %
MySqlCommand
ÑÑ& 2
(
ÑÑ2 3
sql
ÑÑ3 6
,
ÑÑ6 7
conn
ÑÑ8 <
)
ÑÑ< =
;
ÑÑ= >
cmd
ÖÖ 
.
ÖÖ 

Parameters
ÖÖ 
.
ÖÖ 
AddRange
ÖÖ #
(
ÖÖ# $

parameters
ÖÖ$ .
.
ÖÖ. /
ToArray
ÖÖ/ 6
(
ÖÖ6 7
)
ÖÖ7 8
)
ÖÖ8 9
;
ÖÖ9 :
await
áá 
using
áá 
var
áá 
reader
áá "
=
áá# $
await
áá% *
cmd
áá+ .
.
áá. / 
ExecuteReaderAsync
áá/ A
(
ááA B
)
ááB C
;
ááC D
while
àà 
(
àà 
await
àà 
reader
àà 
.
àà  
	ReadAsync
àà  )
(
àà) *
)
àà* +
)
àà+ ,
{
ââ 
interactions
ää 
.
ää 
Add
ää  
(
ää  !
new
ää! $
DrugInteraction
ää% 4
{
ãã 
Id
åå 
=
åå 
reader
åå 
.
åå  
GetInt32
åå  (
(
åå( )
reader
åå) /
.
åå/ 0

GetOrdinal
åå0 :
(
åå: ;
$str
åå; ?
)
åå? @
)
åå@ A
,
ååA B
SourceDrugBankId
çç $
=
çç% &
reader
çç' -
.
çç- .
	GetString
çç. 7
(
çç7 8
reader
çç8 >
.
çç> ?

GetOrdinal
çç? I
(
ççI J
$str
ççJ \
)
çç\ ]
)
çç] ^
,
çç^ _
TargetDrugBankId
éé $
=
éé% &
reader
éé' -
.
éé- .
	GetString
éé. 7
(
éé7 8
reader
éé8 >
.
éé> ?

GetOrdinal
éé? I
(
ééI J
$str
ééJ \
)
éé\ ]
)
éé] ^
,
éé^ _

TargetName
èè 
=
èè  
reader
èè! '
.
èè' (
IsDBNull
èè( 0
(
èè0 1
reader
èè1 7
.
èè7 8

GetOrdinal
èè8 B
(
èèB C
$str
èèC O
)
èèO P
)
èèP Q
?
èèR S
$str
èèT V
:
èèW X
reader
èèY _
.
èè_ `
	GetString
èè` i
(
èèi j
reader
èèj p
.
èèp q

GetOrdinal
èèq {
(
èè{ |
$strèè| à
)èèà â
)èèâ ä
,èèä ã
Description
êê 
=
êê  !
reader
êê" (
.
êê( )
IsDBNull
êê) 1
(
êê1 2
reader
êê2 8
.
êê8 9

GetOrdinal
êê9 C
(
êêC D
$str
êêD Q
)
êêQ R
)
êêR S
?
êêT U
$str
êêV X
:
êêY Z
reader
êê[ a
.
êêa b
	GetString
êêb k
(
êêk l
reader
êêl r
.
êêr s

GetOrdinal
êês }
(
êê} ~
$strêê~ ã
)êêã å
)êêå ç
}
ëë 
)
ëë 
;
ëë 
}
íí 
return
îî 
interactions
îî 
;
îî  
}
ïï 	
public
óó 
async
óó 
Task
óó 
<
óó 
List
óó 
<
óó 

DrugDetail
óó )
>
óó) *
>
óó* +!
GetDrugDetailsAsync
óó, ?
(
óó? @
List
óó@ D
<
óóD E
string
óóE K
>
óóK L
drugBankIds
óóM X
)
óóX Y
{
òò 	
if
ôô 
(
ôô 
drugBankIds
ôô 
==
ôô 
null
ôô #
||
ôô$ &
!
ôô' (
drugBankIds
ôô( 3
.
ôô3 4
Any
ôô4 7
(
ôô7 8
)
ôô8 9
)
ôô9 :
return
ôô; A
new
ôôB E
List
ôôF J
<
ôôJ K

DrugDetail
ôôK U
>
ôôU V
(
ôôV W
)
ôôW X
;
ôôX Y
var
õõ 
details
õõ 
=
õõ 
new
õõ 
List
õõ "
<
õõ" #

DrugDetail
õõ# -
>
õõ- .
(
õõ. /
)
õõ/ 0
;
õõ0 1
var
úú 
connectionString
úú  
=
úú! "
_context
úú# +
.
úú+ ,
Database
úú, 4
.
úú4 5!
GetConnectionString
úú5 H
(
úúH I
)
úúI J
!
úúJ K
;
úúK L
await
ùù 
using
ùù 
var
ùù 
conn
ùù  
=
ùù! "
new
ùù# &
MySqlConnection
ùù' 6
(
ùù6 7
connectionString
ùù7 G
)
ùùG H
;
ùùH I
await
ûû 
conn
ûû 
.
ûû 
	OpenAsync
ûû  
(
ûû  !
)
ûû! "
;
ûû" #
var
†† 
inClauseBuilder
†† 
=
††  !
new
††" %
System
††& ,
.
††, -
Text
††- 1
.
††1 2
StringBuilder
††2 ?
(
††? @
$str
††@ C
)
††C D
;
††D E
var
°° 

parameters
°° 
=
°° 
new
°°  
List
°°! %
<
°°% &
MySqlParameter
°°& 4
>
°°4 5
(
°°5 6
)
°°6 7
;
°°7 8
for
¢¢ 
(
¢¢ 
int
¢¢ 
i
¢¢ 
=
¢¢ 
$num
¢¢ 
;
¢¢ 
i
¢¢ 
<
¢¢ 
drugBankIds
¢¢  +
.
¢¢+ ,
Count
¢¢, 1
;
¢¢1 2
i
¢¢3 4
++
¢¢4 6
)
¢¢6 7
{
££ 
inClauseBuilder
§§ 
.
§§  
Append
§§  &
(
§§& '
i
§§' (
==
§§) +
$num
§§, -
?
§§. /
$str
§§0 2
:
§§3 4
$str
§§5 8
)
§§8 9
;
§§9 :
inClauseBuilder
•• 
.
••  
Append
••  &
(
••& '
$"
••' )
$str
••) +
{
••+ ,
i
••, -
}
••- .
"
••. /
)
••/ 0
;
••0 1

parameters
¶¶ 
.
¶¶ 
Add
¶¶ 
(
¶¶ 
new
¶¶ "
MySqlParameter
¶¶# 1
(
¶¶1 2
$"
¶¶2 4
$str
¶¶4 6
{
¶¶6 7
i
¶¶7 8
}
¶¶8 9
"
¶¶9 :
,
¶¶: ;
drugBankIds
¶¶< G
[
¶¶G H
i
¶¶H I
]
¶¶I J
)
¶¶J K
)
¶¶K L
;
¶¶L M
}
ßß 
inClauseBuilder
®® 
.
®® 
Append
®® "
(
®®" #
$str
®®# &
)
®®& '
;
®®' (
var
©© 
inClause
©© 
=
©© 
inClauseBuilder
©© *
.
©©* +
ToString
©©+ 3
(
©©3 4
)
©©4 5
;
©©5 6
var
´´ 
sql
´´ 
=
´´ 
$"
´´ 
$str´´ Ñ
{´´Ñ Ö
inClause´´Ö ç
}´´ç é
"´´é è
;´´è ê
await
≠≠ 
using
≠≠ 
var
≠≠ 
cmd
≠≠ 
=
≠≠  !
new
≠≠" %
MySqlCommand
≠≠& 2
(
≠≠2 3
sql
≠≠3 6
,
≠≠6 7
conn
≠≠8 <
)
≠≠< =
;
≠≠= >
cmd
ÆÆ 
.
ÆÆ 

Parameters
ÆÆ 
.
ÆÆ 
AddRange
ÆÆ #
(
ÆÆ# $

parameters
ÆÆ$ .
.
ÆÆ. /
ToArray
ÆÆ/ 6
(
ÆÆ6 7
)
ÆÆ7 8
)
ÆÆ8 9
;
ÆÆ9 :
await
∞∞ 
using
∞∞ 
var
∞∞ 
reader
∞∞ "
=
∞∞# $
await
∞∞% *
cmd
∞∞+ .
.
∞∞. / 
ExecuteReaderAsync
∞∞/ A
(
∞∞A B
)
∞∞B C
;
∞∞C D
while
±± 
(
±± 
await
±± 
reader
±± 
.
±±  
	ReadAsync
±±  )
(
±±) *
)
±±* +
)
±±+ ,
{
≤≤ 
details
≥≥ 
.
≥≥ 
Add
≥≥ 
(
≥≥ 
new
≥≥ 

DrugDetail
≥≥  *
{
¥¥ 
Id
µµ 
=
µµ 
reader
µµ 
.
µµ  
GetInt32
µµ  (
(
µµ( )
reader
µµ) /
.
µµ/ 0

GetOrdinal
µµ0 :
(
µµ: ;
$str
µµ; ?
)
µµ? @
)
µµ@ A
,
µµA B

DrugBankId
∂∂ 
=
∂∂  
reader
∂∂! '
.
∂∂' (
	GetString
∂∂( 1
(
∂∂1 2
reader
∂∂2 8
.
∂∂8 9

GetOrdinal
∂∂9 C
(
∂∂C D
$str
∂∂D P
)
∂∂P Q
)
∂∂Q R
,
∂∂R S
Toxicity
∑∑ 
=
∑∑ 
reader
∑∑ %
.
∑∑% &
IsDBNull
∑∑& .
(
∑∑. /
reader
∑∑/ 5
.
∑∑5 6

GetOrdinal
∑∑6 @
(
∑∑@ A
$str
∑∑A K
)
∑∑K L
)
∑∑L M
?
∑∑N O
null
∑∑P T
:
∑∑U V
reader
∑∑W ]
.
∑∑] ^
	GetString
∑∑^ g
(
∑∑g h
reader
∑∑h n
.
∑∑n o

GetOrdinal
∑∑o y
(
∑∑y z
$str∑∑z Ñ
)∑∑Ñ Ö
)∑∑Ö Ü
,∑∑Ü á
Pharmacodynamics
∏∏ $
=
∏∏% &
reader
∏∏' -
.
∏∏- .
IsDBNull
∏∏. 6
(
∏∏6 7
reader
∏∏7 =
.
∏∏= >

GetOrdinal
∏∏> H
(
∏∏H I
$str
∏∏I [
)
∏∏[ \
)
∏∏\ ]
?
∏∏^ _
null
∏∏` d
:
∏∏e f
reader
∏∏g m
.
∏∏m n
	GetString
∏∏n w
(
∏∏w x
reader
∏∏x ~
.
∏∏~ 

GetOrdinal∏∏ â
(∏∏â ä
$str∏∏ä ú
)∏∏ú ù
)∏∏ù û
,∏∏û ü!
SnpAdverseReactions
ππ '
=
ππ( )
reader
ππ* 0
.
ππ0 1
IsDBNull
ππ1 9
(
ππ9 :
reader
ππ: @
.
ππ@ A

GetOrdinal
ππA K
(
ππK L
$str
ππL a
)
ππa b
)
ππb c
?
ππd e
null
ππf j
:
ππk l
reader
ππm s
.
ππs t
	GetString
ππt }
(
ππ} ~
readerππ~ Ñ
.ππÑ Ö

GetOrdinalππÖ è
(ππè ê
$strππê •
)ππ• ¶
)ππ¶ ß
}
∫∫ 
)
∫∫ 
;
∫∫ 
}
ªª 
return
ΩΩ 
details
ΩΩ 
;
ΩΩ 
}
ææ 	
}
øø 
}¿¿ ‰
`C:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlDiagnosisRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class $
MySqlDiagnosisRepository )
:* + 
IDiagnosisRepository, @
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public $
MySqlDiagnosisRepository '
(' (
MySqlDbContext( 6
context7 >
)> ?
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
	Diagnosis #
># $
AddAsync% -
(- .
	Diagnosis. 7
entity8 >
)> ?
{ 	
await 
_context 
. 
	Diagnoses $
.$ %
AddAsync% -
(- .
entity. 4
)4 5
;5 6
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
	Diagnosis #
># $
DeleteAsync% 0
(0 1
	Diagnosis1 :
entity; A
)A B
{ 	
_context 
. 
	Diagnoses 
. 
Remove %
(% &
entity& ,
), -
;- .
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
entity 
; 
} 	
public 
async 
Task 
< 
List 
< 
	Diagnosis (
>( )
>) *
FindAllAsync+ 7
(7 8
)8 9
{ 	
return   
await   
_context   !
.  ! "
	Diagnoses  " +
.  + ,
ToListAsync  , 7
(  7 8
)  8 9
;  9 :
}!! 	
public## 
async## 
Task## 
<## 
	Diagnosis## #
?### $
>##$ %
FindByIdAsync##& 3
(##3 4
int##4 7
id##8 :
)##: ;
{$$ 	
return%% 
await%% 
_context%% !
.%%! "
	Diagnoses%%" +
.%%+ ,
	FindAsync%%, 5
(%%5 6
id%%6 8
)%%8 9
;%%9 :
}&& 	
public(( 
async(( 
Task(( 
<(( 
IEnumerable(( %
<((% &
	Diagnosis((& /
>((/ 0
>((0 1#
FindAllByPatientIdAsync((2 I
(((I J
int((J M
	patientId((N W
)((W X
{)) 	
return** 
await** 
_context** !
.**! "
	Diagnoses**" +
.++ 
Where++ 
(++ 
d++ 
=>++ 
d++ 
.++ 
	PatientId++ '
==++( *
	patientId+++ 4
)++4 5
.,, 
ToListAsync,, 
(,, 
),, 
;,, 
}-- 	
public// 
async// 
Task// 
<// 
	Diagnosis// #
>//# $
UpdateAsync//% 0
(//0 1
	Diagnosis//1 :
entity//; A
)//A B
{00 	
_context11 
.11 
	Diagnoses11 
.11 
Update11 %
(11% &
entity11& ,
)11, -
;11- .
await22 
_context22 
.22 
SaveChangesAsync22 +
(22+ ,
)22, -
;22- .
return33 
entity33 
;33 
}44 	
}55 
}66 ˙e
VC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlDbContext.cs
	namespace		 	
Backend		
 
.		 
Infrastructure		  
.		  !
Repositories		! -
{

 
public 

class 
MySqlDbContext 
:  !
IdentityDbContext" 3
<3 4
ApplicationUser4 C
>C D
{ 
public 
DbSet 
< 
Patient 
> 
Patients &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DbSet 
< 

Medication 
>  
Medications! ,
{- .
get/ 2
;2 3
set4 7
;7 8
}9 :
public 
DbSet 
< 
SymptomDefinition &
>& '
SymptomsDefinition( :
{; <
get= @
;@ A
setB E
;E F
}G H
public 
DbSet 
< 
PatientSymptom #
># $
PatientSymptoms% 4
{5 6
get7 :
;: ;
set< ?
;? @
}A B
public 
DbSet 
< 
MedicalHistoryEntry (
>( )!
MedicalHistoryEntries* ?
{@ A
getB E
;E F
setG J
;J K
}L M
public 
DbSet 
< 
FamilyHistoryEntry '
>' ( 
FamilyHistoryEntries) =
{> ?
get@ C
;C D
setE H
;H I
}J K
public 
DbSet 
< 
KnownMedication $
>$ %
KnownMedications& 6
{7 8
get9 <
;< =
set> A
;A B
}C D
public 
DbSet 
< 
	Diagnosis 
> 
	Diagnoses  )
{* +
get, /
;/ 0
set1 4
;4 5
}6 7
public 
DbSet 
< 
MedicalLetter "
>" #
MedicalLetters$ 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
public 
DbSet 
< 
CommunicationLevel '
>' (
CommunicationLevels) <
{= >
get? B
;B C
setD G
;G H
}I J
public   
DbSet   
<   
AtcDrugMapping   #
>  # $
AtcDrugMappings  % 4
{  5 6
get  7 :
;  : ;
set  < ?
;  ? @
}  A B
public!! 
DbSet!! 
<!! 
DrugInteraction!! $
>!!$ %
DrugInteractions!!& 6
{!!7 8
get!!9 <
;!!< =
set!!> A
;!!A B
}!!C D
public## 
DbSet## 
<## 

DrugDetail## 
>##  
DrugDetails##! ,
{##- .
get##/ 2
;##2 3
set##4 7
;##7 8
}##9 :
public$$ 
MySqlDbContext$$ 
($$ 
DbContextOptions$$ .
<$$. /
MySqlDbContext$$/ =
>$$= >
options$$? F
)$$F G
:$$H I
base$$J N
($$N O
options$$O V
)$$V W
{%% 	
}&& 	
	protected** 
override** 
void** 
OnModelCreating**  /
(**/ 0
ModelBuilder**0 <
modelBuilder**= I
)**I J
{++ 	
base,, 
.,, 
OnModelCreating,,  
(,,  !
modelBuilder,,! -
),,- .
;,,. /
modelBuilder.. 
... 
Entity.. 
<..  
MedicalHistoryEntry..  3
>..3 4
(..4 5
)..5 6
...6 7
ToTable..7 >
(..> ?
$str..? V
)..V W
;..W X
modelBuilder11 
.11 
Entity11 
<11  
AtcDrugMapping11  .
>11. /
(11/ 0
)110 1
.111 2
HasIndex112 :
(11: ;
m11; <
=>11= ?
m11@ A
.11A B
AtcCode11B I
)11I J
;11J K
modelBuilder22 
.22 
Entity22 
<22  
DrugInteraction22  /
>22/ 0
(220 1
)221 2
.222 3
HasIndex223 ;
(22; <
i22< =
=>22> @
i22A B
.22B C
SourceDrugBankId22C S
)22S T
;22T U
modelBuilder33 
.33 
Entity33 
<33  
DrugInteraction33  /
>33/ 0
(330 1
)331 2
.332 3
HasIndex333 ;
(33; <
i33< =
=>33> @
new33A D
{33E F
i33F G
.33G H
SourceDrugBankId33H X
,33X Y
i33Z [
.33[ \
TargetDrugBankId33\ l
}33l m
)33m n
;33n o
var66 
jsonOptions66 
=66 
(66 !
JsonSerializerOptions66 4
?664 5
)665 6
null666 :
;66: ;
modelBuilder99 
.99 
Entity99 
<99  
SymptomDefinition99  1
>991 2
(992 3
)993 4
.:: 
Property:: 
(:: 
s:: 
=>:: 
s::  
.::  !
Aliases::! (
)::( )
.;; 
HasColumnType;; 
(;; 
$str;; %
);;% &
.<< 
HasConversion<< 
(<< 
v== 
=>== 
JsonSerializer== '
.==' (
	Serialize==( 1
(==1 2
v==2 3
,==3 4
jsonOptions==5 @
)==@ A
,==A B
v>> 
=>>> 
JsonSerializer>> '
.>>' (
Deserialize>>( 3
<>>3 4
List>>4 8
<>>8 9
string>>9 ?
>>>? @
>>>@ A
(>>A B
v>>B C
,>>C D
jsonOptions>>E P
)>>P Q
??>>R T
new>>U X
List>>Y ]
<>>] ^
string>>^ d
>>>d e
(>>e f
)>>f g
)?? 
.@@ 
Metadata@@ 
.@@ 
SetValueComparer@@ *
(@@* +
newAA 
ValueComparerAA %
<AA% &
ListAA& *
<AA* +
stringAA+ 1
>AA1 2
>AA2 3
(AA3 4
(BB 
c1BB 
,BB 
c2BB 
)BB  
=>BB! #
c1BB$ &
!BB& '
.BB' (
SequenceEqualBB( 5
(BB5 6
c2BB6 8
!BB8 9
)BB9 :
,BB: ;
cCC 
=>CC 
cCC 
.CC 
	AggregateCC (
(CC( )
$numCC) *
,CC* +
(CC, -
aCC- .
,CC. /
vCC0 1
)CC1 2
=>CC3 5
HashCodeCC6 >
.CC> ?
CombineCC? F
(CCF G
aCCG H
,CCH I
vCCJ K
.CCK L
GetHashCodeCCL W
(CCW X
)CCX Y
)CCY Z
)CCZ [
,CC[ \
cDD 
=>DD 
cDD 
.DD 
ToListDD %
(DD% &
)DD& '
)EE 
)FF 
;FF 
modelBuilderII 
.II 
EntityII 
<II  
SymptomDefinitionII  1
>II1 2
(II2 3
)II3 4
.JJ 
PropertyJJ 
(JJ 
sJJ 
=>JJ 
sJJ  
.JJ  !
FieldsJJ! '
)JJ' (
.KK 
HasColumnTypeKK 
(KK 
$strKK %
)KK% &
.LL 
HasConversionLL 
(LL 
vMM 
=>MM 
JsonSerializerMM '
.MM' (
	SerializeMM( 1
(MM1 2
vMM2 3
,MM3 4
jsonOptionsMM5 @
)MM@ A
,MMA B
vNN 
=>NN 
JsonSerializerNN '
.NN' (
DeserializeNN( 3
<NN3 4
ListNN4 8
<NN8 9
SymptomFieldNN9 E
>NNE F
>NNF G
(NNG H
vNNH I
,NNI J
jsonOptionsNNK V
)NNV W
??NNX Z
newNN[ ^
ListNN_ c
<NNc d
SymptomFieldNNd p
>NNp q
(NNq r
)NNr s
)OO 
.PP 
MetadataPP 
.PP 
SetValueComparerPP *
(PP* +
newQQ 
ValueComparerQQ %
<QQ% &
ListQQ& *
<QQ* +
SymptomFieldQQ+ 7
>QQ7 8
>QQ8 9
(QQ9 :
(RR 
c1RR 
,RR 
c2RR 
)RR  
=>RR! #
JsonSerializerRR$ 2
.RR2 3
	SerializeRR3 <
(RR< =
c1RR= ?
,RR? @
jsonOptionsRRA L
)RRL M
==RRN P
JsonSerializerRRQ _
.RR_ `
	SerializeRR` i
(RRi j
c2RRj l
,RRl m
jsonOptionsRRn y
)RRy z
,RRz {
cSS 
=>SS 
JsonSerializerSS +
.SS+ ,
	SerializeSS, 5
(SS5 6
cSS6 7
,SS7 8
jsonOptionsSS9 D
)SSD E
.SSE F
GetHashCodeSSF Q
(SSQ R
)SSR S
,SSS T
cTT 
=>TT 
JsonSerializerTT +
.TT+ ,
DeserializeTT, 7
<TT7 8
ListTT8 <
<TT< =
SymptomFieldTT= I
>TTI J
>TTJ K
(TTK L
JsonSerializerTTL Z
.TTZ [
	SerializeTT[ d
(TTd e
cTTe f
,TTf g
jsonOptionsTTh s
)TTs t
,TTt u
jsonOptions	TTv Å
)
TTÅ Ç
!
TTÇ É
)UU 
)UU 
;UU 
modelBuilderXX 
.XX 
EntityXX 
<XX  
PatientSymptomXX  .
>XX. /
(XX/ 0
)XX0 1
.YY 
PropertyYY 
(YY 
eYY 
=>YY 
eYY  
.YY  !
DetailsYY! (
)YY( )
.ZZ 
HasColumnTypeZZ 
(ZZ 
$strZZ %
)ZZ% &
.[[ 
HasConversion[[ 
([[ 
v\\ 
=>\\ 
JsonSerializer\\ '
.\\' (
	Serialize\\( 1
(\\1 2
v\\2 3
,\\3 4
jsonOptions\\5 @
)\\@ A
,\\A B
v]] 
=>]] 
JsonSerializer]] '
.]]' (
Deserialize]]( 3
<]]3 4

Dictionary]]4 >
<]]> ?
string]]? E
,]]E F
string]]G M
?]]M N
>]]N O
>]]O P
(]]P Q
v]]Q R
,]]R S
jsonOptions]]T _
)]]_ `
??]]a c
new]]d g

Dictionary]]h r
<]]r s
string]]s y
,]]y z
string	]]{ Å
?
]]Å Ç
>
]]Ç É
(
]]É Ñ
)
]]Ñ Ö
)^^ 
.__ 
Metadata__ 
.__ 
SetValueComparer__ *
(__* +
new`` 
ValueComparer`` %
<``% &

Dictionary``& 0
<``0 1
string``1 7
,``7 8
string``9 ?
?``? @
>``@ A
>``A B
(``B C
(aa 
c1aa 
,aa 
c2aa 
)aa  
=>aa! #
c1aa$ &
!aa& '
.aa' (
Countaa( -
==aa. 0
c2aa1 3
!aa3 4
.aa4 5
Countaa5 :
&&aa; =
!aa> ?
c1aa? A
.aaA B
ExceptaaB H
(aaH I
c2aaI K
)aaK L
.aaL M
AnyaaM P
(aaP Q
)aaQ R
,aaR S
cbb 
=>bb 
cbb 
.bb 
	Aggregatebb (
(bb( )
$numbb) *
,bb* +
(bb, -
abb- .
,bb. /
vbb0 1
)bb1 2
=>bb3 5
HashCodebb6 >
.bb> ?
Combinebb? F
(bbF G
abbG H
,bbH I
vbbJ K
.bbK L
KeybbL O
.bbO P
GetHashCodebbP [
(bb[ \
)bb\ ]
,bb] ^
vbb_ `
.bb` a
Valuebba f
.bbf g
GetHashCodebbg r
(bbr s
)bbs t
)bbt u
)bbu v
,bbv w
ccc 
=>cc 
ccc 
.cc 
ToDictionarycc +
(cc+ ,
kcc, -
=>cc. 0
kcc1 2
.cc2 3
Keycc3 6
,cc6 7
vcc8 9
=>cc: <
vcc= >
.cc> ?
Valuecc? D
)ccD E
)dd 
)dd 
;dd 
}kk 	
}ll 
}mm í
iC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\MySqlCommunicationLevelRepository.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

class -
!MySqlCommunicationLevelRepository 2
:3 4)
ICommunicationLevelRepository5 R
{ 
private		 
readonly		 
MySqlDbContext		 '
_context		( 0
;		0 1
public -
!MySqlCommunicationLevelRepository 0
(0 1
MySqlDbContext1 ?
context@ G
)G H
{ 	
_context 
= 
context 
; 
} 	
public 
async 
Task 
< 
CommunicationLevel ,
?, -
>- .
FindByNameAsync/ >
(> ?
string? E
nameF J
)J K
{ 	
return 
await 
_context !
.! "
CommunicationLevels" 5
. 
FirstOrDefaultAsync $
($ %
l% &
=>' )
l* +
.+ ,
Name, 0
==1 3
name4 8
)8 9
;9 :
} 	
public 
async 
Task 
< 
IEnumerable %
<% &
CommunicationLevel& 8
>8 9
>9 :
GetAllAsync; F
(F G
)G H
{ 	
return 
await 
_context !
.! "
CommunicationLevels" 5
.5 6
ToListAsync6 A
(A B
)B C
;C D
} 	
public 
async 
Task 
< 
CommunicationLevel ,
>, -
AddAsync. 6
(6 7
CommunicationLevel7 I
communicationLevelJ \
)\ ]
{ 	
_context 
. 
CommunicationLevels (
.( )
Add) ,
(, -
communicationLevel- ?
)? @
;@ A
await 
_context 
. 
SaveChangesAsync +
(+ ,
), -
;- .
return 
communicationLevel %
;% &
}   	
public"" 
async"" 
Task"" 
<"" 
CommunicationLevel"" ,
?"", -
>""- . 
FindByPatientIdAsync""/ C
(""C D
int""D G
	patientId""H Q
)""Q R
{## 	
var$$ 
patient$$ 
=$$ 
await$$ 
_context$$  (
.$$( )
Patients$$) 1
.%% 
Include%% 
(%% 
p%% 
=>%% 
p%% 
.%%  
CommunicationLevel%%  2
)%%2 3
.&& 
FirstOrDefaultAsync&& $
(&&$ %
p&&% &
=>&&' )
p&&* +
.&&+ ,
Id&&, .
==&&/ 1
	patientId&&2 ;
)&&; <
;&&< =
return(( 
patient(( 
?(( 
.(( 
CommunicationLevel(( .
;((. /
})) 	
}** 
}++ Áß
UC:\sources\Fehldiagnosen\Backend\Backend\Infrastructure\Repositories\DbInitializer.cs
	namespace 	
Backend
 
. 
Infrastructure  
.  !
Repositories! -
{ 
public 

static 
class 
DbInitializer %
{ 
public		 
static		 
async		 
Task		  

Initialize		! +
(		+ ,
MySqlDbContext		, :
context		; B
,		B C
RoleManager		D O
<		O P
IdentityRole		P \
>		\ ]
roleManager		^ i
)		i j
{

 	
await 
context 
. 
Database "
." #
MigrateAsync# /
(/ 0
)0 1
;1 2
string 
[ 
] 
	roleNames 
=  
{! "
$str# ,
,, -
$str. 4
}5 6
;6 7
foreach 
( 
var 
roleName !
in" $
	roleNames% .
). /
{ 
var 
	roleExist 
= 
await  %
roleManager& 1
.1 2
RoleExistsAsync2 A
(A B
roleNameB J
)J K
;K L
if 
( 
! 
	roleExist 
) 
{ 
await 
roleManager %
.% &
CreateAsync& 1
(1 2
new2 5
IdentityRole6 B
(B C
roleNameC K
)K L
)L M
;M N
} 
} 
if 
( 
! 
context 
. 
SymptomsDefinition +
.+ ,
Any, /
(/ 0
)0 1
)1 2
{ 
var 
definitions 
=  !(
GetInitialSymptomDefinitions" >
(> ?
)? @
;@ A
context 
. 
SymptomsDefinition *
.* +
AddRange+ 3
(3 4
definitions4 ?
)? @
;@ A
await 
context 
. 
SaveChangesAsync .
(. /
)/ 0
;0 1
} 
var 
existingLevelNames "
=# $
await% *
context+ 2
.2 3
CommunicationLevels3 F
.F G
SelectG M
(M N
lN O
=>P R
lS T
.T U
NameU Y
)Y Z
.Z [
ToListAsync[ f
(f g
)g h
;h i
var 
missingLevels 
= )
GetInitialCommunicationLevels  =
(= >
)> ?
.   
Where   
(   
l   
=>   
!   
existingLevelNames   /
.  / 0
Contains  0 8
(  8 9
l  9 :
.  : ;
Name  ; ?
)  ? @
)  @ A
.!! 
ToList!! 
(!! 
)!! 
;!! 
if## 
(## 
missingLevels## 
.## 
Any## !
(##! "
)##" #
)### $
{$$ 
context%% 
.%% 
CommunicationLevels%% +
.%%+ ,
AddRange%%, 4
(%%4 5
missingLevels%%5 B
)%%B C
;%%C D
await&& 
context&& 
.&& 
SaveChangesAsync&& .
(&&. /
)&&/ 0
;&&0 1
}'' 
}(( 	
private** 
static** 
List** 
<** 
CommunicationLevel** .
>**. /)
GetInitialCommunicationLevels**0 M
(**M N
)**N O
{++ 	
return,, 
new,, 
List,, 
<,, 
CommunicationLevel,, .
>,,. /
{-- 
new.. 
CommunicationLevel.. &
{..' (
Name// 
=// 
$str// 
,//  
Description00 
=00  !
$str00" )
,00) *
KiPrompt11 
=11 
$str	11 ã
,
11ã å 
ActionRecommendation22 (
=22) *
$str22+ C
}33 
,33 
new44 
CommunicationLevel44 &
{44' (
Name44) -
=44. /
$str440 4
,444 5
Description446 A
=44B C
$str44D L
,44L M
KiPrompt44N V
=44W X
$str	44Y ¢
,
44¢ £"
ActionRecommendation
44§ ∏
=
44π ∫
$str
44ª “
}
44” ‘
,
44‘ ’
new55 
CommunicationLevel55 &
{55' (
Name55) -
=55. /
$str550 4
,554 5
Description556 A
=55B C
$str55D N
,55N O
KiPrompt55P X
=55Y Z
$str	55[ ì
,
55ì î"
ActionRecommendation
55ï ©
=
55™ ´
$str
55¨ ≈
}
55∆ «
}66 
;66 
}77 	
private:: 
static:: 
List:: 
<:: 
SymptomDefinition:: -
>::- .(
GetInitialSymptomDefinitions::/ K
(::K L
)::L M
{;; 	
return<< 
new<< 
List<< 
<<< 
SymptomDefinition<< -
><<- .
{== 
new>> 
SymptomDefinition>> %
{>>& '
Name?? 
=?? 
$str?? *
,??* +
Aliases@@ 
=@@ 
new@@ !
(@@! "
)@@" #
{@@$ %
$str@@& /
,@@/ 0
$str@@1 G
}@@H I
,@@I J
FieldsAA 
=AA 
newAA  
(AA  !
)AA! "
{AA# $
newBB 
SymptomFieldBB (
{BB) *
NameBB+ /
=BB0 1
$strBB2 7
,BB7 8
TypeBB9 =
=BB> ?
$strBB@ H
,BBH I
OptionsBBJ Q
=BBR S
newBBT W
(BBW X
)BBX Y
{BBZ [
$strBB\ e
,BBe f
$strBBg q
,BBq r
$strBBs }
,BB} ~
$str	BB Ü
}
BBá à
,
BBà â

IsRequired
BBä î
=
BBï ñ
true
BBó õ
}
BBú ù
,
BBù û
newCC 
SymptomFieldCC (
{CC) *
NameCC+ /
=CC0 1
$strCC2 7
,CC7 8
TypeCC9 =
=CC> ?
$strCC@ H
,CCH I
OptionsCCJ Q
=CCR S
newCCT W
(CCW X
)CCX Y
{CCZ [
$strCC\ c
,CCc d
$strCCe q
,CCq r
$str	CCs Ñ
,
CCÑ Ö
$str
CCÜ ò
,
CCò ô
$str
CCö §
}
CC• ¶
}
CCß ®
,
CC® ©
newDD 
SymptomFieldDD (
{DD) *
NameDD+ /
=DD0 1
$strDD2 F
,DDF G
TypeDDH L
=DDM N
$strDDO W
,DDW X
OptionsDDY `
=DDa b
newDDc f
(DDf g
)DDg h
{DDi j
$strDDk u
,DDu v
$str	DDw ç
,
DDç é
$str
DDè ö
,
DDö õ
$str
DDú £
}
DD§ •
}
DD¶ ß
}EE 
}FF 
,FF 
newHH 
SymptomDefinitionHH %
{HH& '
NameII 
=II 
$strII #
,II# $
AliasesJJ 
=JJ 
newJJ !
(JJ! "
)JJ" #
{JJ$ %
$strJJ& :
,JJ: ;
$strJJ< K
}JJL M
,JJM N
FieldsKK 
=KK 
newKK  
(KK  !
)KK! "
{KK# $
newLL 
SymptomFieldLL (
{LL) *
NameLL+ /
=LL0 1
$strLL2 D
,LLD E
TypeLLF J
=LLK L
$strLLM U
,LLU V

IsRequiredLLW a
=LLb c
trueLLd h
}LLi j
,LLj k
newMM 
SymptomFieldMM (
{MM) *
NameMM+ /
=MM0 1
$strMM2 ;
,MM; <
TypeMM= A
=MMB C
$strMMD L
,MML M
OptionsMMN U
=MMV W
newMMX [
(MM[ \
)MM\ ]
{MM^ _
$strMM` e
,MMe f
$strMMg n
,MMn o
$strMMp v
,MMv w
$str	MMx Å
}
MMÇ É
}
MMÑ Ö
,
MMÖ Ü
newNN 
SymptomFieldNN (
{NN) *
NameNN+ /
=NN0 1
$strNN2 B
,NNB C
TypeNND H
=NNI J
$strNNK S
,NNS T
OptionsNNU \
=NN] ^
newNN_ b
(NNb c
)NNc d
{NNe f
$strNNg k
,NNk l
$strNNm s
}NNt u
}NNv w
}OO 
}PP 
,PP 
newRR 
SymptomDefinitionRR %
{RR& '
NameSS 
=SS 
$strSS #
,SS# $
FieldsTT 
=TT 
newTT  
(TT  !
)TT! "
{TT# $
newUU 
SymptomFieldUU (
{UU) *
NameUU+ /
=UU0 1
$strUU2 7
,UU7 8
TypeUU9 =
=UU> ?
$strUU@ H
,UUH I
OptionsUUJ Q
=UUR S
newUUT W
(UUW X
)UUX Y
{UUZ [
$strUU\ r
,UUr s
$str	UUt ç
}
UUé è
,
UUè ê

IsRequired
UUë õ
=
UUú ù
true
UUû ¢
}
UU£ §
,
UU§ •
newVV 
SymptomFieldVV (
{VV) *
NameVV+ /
=VV0 1
$strVV2 F
,VVF G
TypeVVH L
=VVM N
$strVVO W
,VVW X
OptionsVVY `
=VVa b
newVVc f
(VVf g
)VVg h
{VVi j
$strVVk q
,VVq r
$strVVs }
,VV} ~
$str	VV ä
,
VVä ã
$str
VVå î
}
VVï ñ
}
VVó ò
,
VVò ô
newWW 
SymptomFieldWW (
{WW) *
NameWW+ /
=WW0 1
$strWW2 C
,WWC D
TypeWWE I
=WWJ K
$strWWL T
,WWT U
OptionsWWV ]
=WW^ _
newWW` c
(WWc d
)WWd e
{WWf g
$strWWh p
,WWp q
$str	WWr Å
,
WWÅ Ç
$str
WWÉ è
}
WWê ë
}
WWí ì
}XX 
}YY 
,YY 
new[[ 
SymptomDefinition[[ %
{[[& '
Name\\ 
=\\ 
$str\\ ,
,\\, -
Aliases]] 
=]] 
new]] !
(]]! "
)]]" #
{]]$ %
$str]]& 3
,]]3 4
$str]]5 >
}]]? @
,]]@ A
Fields^^ 
=^^ 
new^^  
(^^  !
)^^! "
{^^# $
new__ 
SymptomField__ (
{__) *
Name__+ /
=__0 1
$str__2 ;
,__; <
Type__= A
=__B C
$str__D L
,__L M
Options__N U
=__V W
new__X [
(__[ \
)__\ ]
{__^ _
$str__` q
,__q r
$str	__s Ö
,
__Ö Ü
$str
__á ö
}
__õ ú
,
__ú ù

IsRequired
__û ®
=
__© ™
true
__´ Ø
}
__∞ ±
,
__± ≤
new`` 
SymptomField`` (
{``) *
Name``+ /
=``0 1
$str``2 @
,``@ A
Type``B F
=``G H
$str``I Q
,``Q R
Options``S Z
=``[ \
new``] `
(``` a
)``a b
{``c d
$str``e s
,``s t
$str	``u Ç
,
``Ç É
$str
``Ñ ã
}
``å ç
}
``é è
,
``è ê
newaa 
SymptomFieldaa (
{aa) *
Nameaa+ /
=aa0 1
$straa2 C
,aaC D
TypeaaE I
=aaJ K
$straaL T
,aaT U
OptionsaaV ]
=aa^ _
newaa` c
(aac d
)aad e
{aaf g
$straah u
,aau v
$str	aaw Å
,
aaÅ Ç
$str
aaÉ ä
}
aaã å
}
aaç é
}bb 
}cc 
,cc 
newee 
SymptomDefinitionee %
{ee& '
Nameff 
=ff 
$strff +
,ff+ ,
Aliasesgg 
=gg 
newgg !
(gg! "
)gg" #
{gg$ %
$strgg& 6
,gg6 7
$strgg8 M
}ggN O
,ggO P
Fieldshh 
=hh 
newhh  
(hh  !
)hh! "
{hh# $
newii 
SymptomFieldii (
{ii) *
Nameii+ /
=ii0 1
$strii2 :
,ii: ;
Typeii< @
=iiA B
$striiC K
,iiK L
OptionsiiM T
=iiU V
newiiW Z
(iiZ [
)ii[ \
{ii] ^
$strii_ j
,iij k
$striil {
,ii{ |
$str	ii} è
,
iiè ê
$str
iië §
}
ii• ¶
,
ii¶ ß

IsRequired
ii® ≤
=
ii≥ ¥
true
iiµ π
}
ii∫ ª
,
iiª º
newjj 
SymptomFieldjj (
{jj) *
Namejj+ /
=jj0 1
$strjj2 ;
,jj; <
Typejj= A
=jjB C
$strjjD L
,jjL M
OptionsjjN U
=jjV W
newjjX [
(jj[ \
)jj\ ]
{jj^ _
$strjj` m
,jjm n
$strjjo }
,jj} ~
$str	jj â
}
jjä ã
}
jjå ç
,
jjç é
newkk 
SymptomFieldkk (
{kk) *
Namekk+ /
=kk0 1
$strkk2 E
,kkE F
TypekkG K
=kkL M
$strkkN T
,kkT U

IsRequiredkkV `
=kka b
falsekkc h
}kki j
}ll 
}mm 
,mm 
newoo 
SymptomDefinitionoo %
{oo& '
Namepp 
=pp 
$strpp &
,pp& '
Aliasesqq 
=qq 
newqq !
(qq! "
)qq" #
{qq$ %
$strqq& 3
,qq3 4
$strqq5 >
}qq? @
,qq@ A
Fieldsrr 
=rr 
newrr  
(rr  !
)rr! "
{rr# $
newss 
SymptomFieldss (
{ss) *
Namess+ /
=ss0 1
$strss2 =
,ss= >
Typess? C
=ssD E
$strssF N
,ssN O
OptionsssP W
=ssX Y
newssZ ]
(ss] ^
)ss^ _
{ss` a
$strssb u
,ssu v
$str	ssw Ñ
,
ssÑ Ö
$str
ssÜ é
,
ssé è
$str
ssê †
}
ss° ¢
}
ss£ §
,
ss§ •
newtt 
SymptomFieldtt (
{tt) *
Namett+ /
=tt0 1
$strtt2 B
,ttB C
TypettD H
=ttI J
$strttK S
,ttS T
OptionsttU \
=tt] ^
newtt_ b
(ttb c
)ttc d
{tte f
$strttg l
,ttl m
$strttn w
,ttw x
$str	tty å
,
ttå ç
$str
tté £
}
tt§ •
}
tt¶ ß
}uu 
}vv 
,vv 
newxx 
SymptomDefinitionxx %
{xx& '
Nameyy 
=yy 
$stryy &
,yy& '
Aliaseszz 
=zz 
newzz !
(zz! "
)zz" #
{zz$ %
$strzz& /
,zz/ 0
$strzz1 ?
}zz@ A
,zzA B
Fields{{ 
={{ 
new{{  
({{  !
){{! "
{{{# $
new|| 
SymptomField|| (
{||) *
Name||+ /
=||0 1
$str||2 8
,||8 9
Type||: >
=||? @
$str||A I
,||I J
Options||K R
=||S T
new||U X
(||X Y
)||Y Z
{||[ \
$str||] l
,||l m
$str	||n Ä
,
||Ä Å
$str
||Ç õ
}
||ú ù
,
||ù û

IsRequired
||ü ©
=
||™ ´
true
||¨ ∞
}
||± ≤
,
||≤ ≥
new}} 
SymptomField}} (
{}}) *
Name}}+ /
=}}0 1
$str}}2 <
,}}< =
Type}}> B
=}}C D
$str}}E M
,}}M N
Options}}O V
=}}W X
new}}Y \
(}}\ ]
)}}] ^
{}}_ `
$str}}a l
,}}l m
$str}}n |
,}}| }
$str	}}~ Ü
,
}}Ü á
$str
}}à ì
}
}}î ï
}
}}ñ ó
}~~ 
} 
, 
new
ÅÅ 
SymptomDefinition
ÅÅ %
{
ÅÅ& '
Name
ÇÇ 
=
ÇÇ 
$str
ÇÇ *
,
ÇÇ* +
Fields
ÉÉ 
=
ÉÉ 
new
ÉÉ  
(
ÉÉ  !
)
ÉÉ! "
{
ÉÉ# $
new
ÑÑ 
SymptomField
ÑÑ (
{
ÑÑ) *
Name
ÑÑ+ /
=
ÑÑ0 1
$str
ÑÑ2 G
,
ÑÑG H
Type
ÑÑI M
=
ÑÑN O
$str
ÑÑP X
,
ÑÑX Y
Options
ÑÑZ a
=
ÑÑb c
new
ÑÑd g
(
ÑÑg h
)
ÑÑh i
{
ÑÑj k
$str
ÑÑl p
,
ÑÑp q
$str
ÑÑr x
}
ÑÑy z
}
ÑÑ{ |
,
ÑÑ| }
new
ÖÖ 
SymptomField
ÖÖ (
{
ÖÖ) *
Name
ÖÖ+ /
=
ÖÖ0 1
$str
ÖÖ2 ?
,
ÖÖ? @
Type
ÖÖA E
=
ÖÖF G
$str
ÖÖH P
,
ÖÖP Q
Options
ÖÖR Y
=
ÖÖZ [
new
ÖÖ\ _
(
ÖÖ_ `
)
ÖÖ` a
{
ÖÖb c
$str
ÖÖd h
,
ÖÖh i
$str
ÖÖj p
}
ÖÖq r
}
ÖÖs t
,
ÖÖt u
new
ÜÜ 
SymptomField
ÜÜ (
{
ÜÜ) *
Name
ÜÜ+ /
=
ÜÜ0 1
$str
ÜÜ2 H
,
ÜÜH I
Type
ÜÜJ N
=
ÜÜO P
$str
ÜÜQ Y
,
ÜÜY Z
Options
ÜÜ[ b
=
ÜÜc d
new
ÜÜe h
(
ÜÜh i
)
ÜÜi j
{
ÜÜk l
$str
ÜÜm q
,
ÜÜq r
$str
ÜÜs y
,
ÜÜy z
$strÜÜ{ ã
}ÜÜå ç
}ÜÜé è
}
áá 
}
àà 
,
àà 
new
ââ 
SymptomDefinition
ââ %
{
ââ& '
Name
ää 
=
ää 
$str
ää $
,
ää$ %
Aliases
ãã 
=
ãã 
new
ãã !
(
ãã! "
)
ãã" #
{
ãã$ %
$str
ãã& 5
,
ãã5 6
$str
ãã7 @
}
ããA B
,
ããB C
Fields
åå 
=
åå 
new
åå  
(
åå  !
)
åå! "
{
åå# $
new
çç 
SymptomField
çç (
{
çç) *
Name
çç+ /
=
çç0 1
$str
çç2 =
,
çç= >
Type
çç? C
=
ççD E
$str
ççF N
,
ççN O
Options
ççP W
=
ççX Y
new
ççZ ]
(
çç] ^
)
çç^ _
{
çç` a
$str
ççb k
,
ççk l
$strççm Ö
,ççÖ Ü
$strççá û
}ççü †
,çç† °

IsRequiredçç¢ ¨
=çç≠ Æ
trueççØ ≥
}çç¥ µ
,ççµ ∂
new
éé 
SymptomField
éé (
{
éé) *
Name
éé+ /
=
éé0 1
$str
éé2 H
,
ééH I
Type
ééJ N
=
ééO P
$str
ééQ Y
,
ééY Z
Options
éé[ b
=
ééc d
new
éée h
(
ééh i
)
ééi j
{
éék l
$stréém Ä
,ééÄ Å
$strééÇ ã
,ééã å
$strééç î
}ééï ñ
}ééó ò
}
èè 
}
êê 
,
êê 
new
íí 
SymptomDefinition
íí %
{
íí& '
Name
ìì 
=
ìì 
$str
ìì %
,
ìì% &
Aliases
îî 
=
îî 
new
îî !
(
îî! "
)
îî" #
{
îî$ %
$str
îî& 1
,
îî1 2
$str
îî3 B
}
îîC D
,
îîD E
Fields
ïï 
=
ïï 
new
ïï  
(
ïï  !
)
ïï! "
{
ïï# $
new
ññ 
SymptomField
ññ (
{
ññ) *
Name
ññ+ /
=
ññ0 1
$str
ññ2 >
,
ññ> ?
Type
ññ@ D
=
ññE F
$str
ññG O
,
ññO P
Options
ññQ X
=
ññY Z
new
ññ[ ^
(
ññ^ _
)
ññ_ `
{
ñña b
$str
ññc g
,
ññg h
$str
ññi o
}
ññp q
}
ññr s
,
ññs t
new
óó 
SymptomField
óó (
{
óó) *
Name
óó+ /
=
óó0 1
$str
óó2 H
,
óóH I
Type
óóJ N
=
óóO P
$str
óóQ Y
}
óóZ [
,
óó[ \
new
òò 
SymptomField
òò (
{
òò) *
Name
òò+ /
=
òò0 1
$str
òò2 J
,
òòJ K
Type
òòL P
=
òòQ R
$str
òòS Y
}
òòZ [
}
ôô 
}
öö 
}
õõ 
;
õõ 
}
úú 	
}
ùù 
}üü ˘
?C:\sources\Fehldiagnosen\Backend\Backend\Domain\Enums\Gender.cs
	namespace 	
Backend
 
. 
Domain 
. 
Enums 
{ 
public 

enum 
Gender 
{ 
Male 
, 
Female 
, 
Other 
} 
}		 ∆
EC:\sources\Fehldiagnosen\Backend\Backend\Domain\Interfaces\IEntity.cs
	namespace 	
Backend
 
. 
Domain 
. 

Interfaces #
{ 
public 

	interface 
IEntity 
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
} 
} ‹
@C:\sources\Fehldiagnosen\Backend\Backend\Domain\Enums\EntryBy.cs
	namespace 	
Backend
 
. 
Domain 
. 
Enums 
{ 
public 

enum 
EntryBy 
{ 
Patient 
, 
Doctor 
} 
} Ï
HC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\SymptomField.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
SymptomField 
: 
IEntity  '
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
[		 	
Required			 
]		 
[

 	
	MaxLength

	 
(

 
$num

 
)

 
]

 
public 
string 
Type 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
[ 	
Required	 
] 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
bool 

IsRequired 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
List 
< 
string 
? 
> 
Options $
{% &
get' *
;* +
set, /
;/ 0
}1 2
} 
} ç
MC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\SymptomDefinition.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
SymptomDefinition "
:# $
IEntity% ,
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
[

 	
Required

	 
]

 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
List 
< 
String 
> 
Aliases #
{$ %
get& )
;) *
set+ .
;. /
}0 1
=2 3
new4 7
(7 8
)8 9
;9 :
public 
List 
< 
SymptomField  
>  !
Fields" (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
=7 8
new9 <
(< =
)= >
;> ?
[ 	

JsonIgnore	 
] 
public 
List 
< 
PatientSymptom "
>" #
SymptomEntries$ 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
=A B
newC F
(F G
)G H
;H I
} 
} ñ
HC:\sources\Fehldiagnosen\Backend\Backend\Domain\Enums\ConditionStatus.cs
	namespace 	
Backend
 
. 
Domain 
. 
Enums 
{ 
public 

enum 
ConditionStatus 
{ 
	Chronical 
, 
Active 
, 
InRemission 
} 
}		 ˇ
JC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\PatientSymptom.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
PatientSymptom 
:  !
IEntity" )
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	

ForeignKey	 
( 
$str 
)  
]  !
public 
Patient 
? 
Patient 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
SymptomName "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
int 
? 
SymptomDefinitionId '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
[ 	

ForeignKey	 
( 
$str )
)) *
]* +
public 
SymptomDefinition  
?  !
SymptomDefinition" 3
{4 5
get6 9
;9 :
set; >
;> ?
}@ A
[ 	
Required	 
] 
public 
DateTime 
OccurrenceTime &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
=5 6
DateTime7 ?
.? @
UtcNow@ F
;F G
[ 	
Range	 
( 
$num 
, 
$num 
) 
] 
public 
int 
	Intensity 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Duration 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
PossibleTrigger &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Notes 
{ 
get "
;" #
set$ '
;' (
}) *
public   

Dictionary   
<   
string    
,    !
string  " (
?  ( )
>  ) *
Details  + 2
{  3 4
get  5 8
;  8 9
set  : =
;  = >
}  ? @
=  A B
new  C F
(  F G
)  G H
;  H I
public!! 
DateTime!! 
	CreatedAt!! !
{!!" #
get!!$ '
;!!' (
set!!) ,
;!!, -
}!!. /
=!!0 1
DateTime!!2 :
.!!: ;
UtcNow!!; A
;!!A B
}"" 
}## ¸
CC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\Patient.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
Patient 
: 
IEntity "
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
public 
string 
UserId 
{ 
get "
;" #
set$ '
;' (
}) *
=+ ,
string- 3
.3 4
Empty4 9
;9 :
public 
ApplicationUser 
ApplicationUser .
;. /
public 
string 
UserName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
string 
	FirstName 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public 
string 
LastName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
DateTime 
DateOfBirth #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
Gender 
? 
Gender 
{ 
get  #
;# $
set% (
;( )
}* +
public 
List 
< 
PatientSymptom "
>" #
SymptomEntries$ 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
=A B
[C D
]D E
;E F
public 
List 
< 

Medication 
> 
MedicationEntries  1
{2 3
get4 7
;7 8
set9 <
;< =
}> ?
=@ A
[B C
]C D
;D E
public 
List 
< 
MedicalHistoryEntry '
>' (!
MedicalHistoryEntries) >
{? @
getA D
;D E
setF I
;I J
}K L
=M N
[O P
]P Q
;Q R
public 
List 
< 
	Diagnosis 
> 
	Diagnoses (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
=7 8
[9 :
]: ;
;; <
public!! 
int!! 
?!!  
CommunicationLevelId!! (
{!!) *
get!!+ .
;!!. /
set!!0 3
;!!3 4
}!!5 6
[## 	

ForeignKey##	 
(## 
$str## *
)##* +
]##+ ,
public$$ 
CommunicationLevel$$ !
?$$! "
CommunicationLevel$$# 5
{$$6 7
get$$8 ;
;$$; <
set$$= @
;$$@ A
}$$B C
}%% 
}&& ±
IC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\MedicalLetter.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

enum 
Status 
{ 

Validation		 
,		 
	Confirmed

 
} 
public 

class 
MedicalLetter 
:  
IEntity! (
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	

ForeignKey	 
( 
$str 
)  
]  !
public 
Patient 
? 
Patient 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
AiSuggestion #
{$ %
get& )
;) *
set+ .
;. /
}0 1
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
ReworkedText #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
DateTime 
	Startdate !
{" #
get$ '
;' (
set) ,
;, -
}. /
=0 1
DateTime2 :
.: ;
UtcNow; A
;A B
[ 	
Required	 
] 
public   
Status   
Status   
{   
get   "
;  " #
set  $ '
;  ' (
}  ) *
["" 	
Required""	 
,"" 
	MaxLength"" 
("" 
$num""  
)""  !
]""! "
public## 
string## 
Subject## 
{## 
get##  #
;### $
set##% (
;##( )
}##* +
=##, -
string##. 4
.##4 5
Empty##5 :
;##: ;
[%% 	
Required%%	 
,%% 
	MaxLength%% 
(%% 
$num%%  
)%%  !
]%%! "
public&& 
string&& 
ReciverName&& !
{&&" #
get&&$ '
;&&' (
set&&) ,
;&&, -
}&&. /
=&&0 1
string&&2 8
.&&8 9
Empty&&9 >
;&&> ?
public(( 
DateTime(( 
	CreatedAt(( !
{((" #
get(($ '
;((' (
set(() ,
;((, -
}((. /
=((0 1
DateTime((2 :
.((: ;
UtcNow((; A
;((A B
public)) 
DateTime)) 
	UpdatedAt)) !
{))" #
get))$ '
;))' (
set))) ,
;)), -
})). /
=))0 1
DateTime))2 :
.)): ;
UtcNow)); A
;))A B
}** 
}++ ÿ
FC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\Medication.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 

Medication 
: 
IEntity %
{		 
public

 
int

 
Id

 
{

 
get

 
;

 
set

  
;

  !
}

" #
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	

ForeignKey	 
( 
$str 
)  
]  !
public 
Patient 
? 
Patient 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
Required	 
] 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
required 
string 
Name #
{$ %
get& )
;) *
set+ .
;. /
}0 1
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Dosage 
{ 
get  #
;# $
set% (
;( )
}* +
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
IntakeFrequency &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DateTime 
? 
IntakeStartDate (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
[ 	
Range	 
( 
$num 
, 
$num 
) 
] 
public 
int 
DurationInDays !
{" #
get$ '
;' (
set) ,
;, -
}. /
public!! 
DateTime!! 
?!! 
EndDate!!  
=>!!! #
IntakeStartDate!!$ 3
?!!3 4
.!!4 5
AddDays!!5 <
(!!< =
DurationInDays!!= K
)!!K L
;!!L M
[## 	
	MaxLength##	 
(## 
$num## 
)## 
]## 
public$$ 
string$$ 
?$$ 

Indication$$ !
{$$" #
get$$$ '
;$$' (
set$$) ,
;$$, -
}$$. /
[&& 	
	MaxLength&&	 
(&& 
$num&& 
)&& 
]&& 
public'' 
string'' 
?'' 
AtcCode'' 
{''  
get''! $
;''$ %
set''& )
;'') *
}''+ ,
public)) 
EntryBy)) 
?)) 
EntryBy)) 
{))  !
get))" %
;))% &
set))' *
;))* +
})), -
[++ 	
	MaxLength++	 
(++ 
$num++ 
)++ 
]++ 
public,, 
string,, 
?,, 
Notes,, 
{,, 
get,, "
;,," #
set,,$ '
;,,' (
},,) *
}-- 
}.. á
OC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\MedicalHistoryEntry.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
MedicalHistoryEntry $
:% &
IEntity' .
{		 
public

 
int

 
Id

 
{

 
get

 
;

 
set

  
;

  !
}

" #
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	

ForeignKey	 
( 
$str 
)  
]  !
public 
Patient 
? 
Patient 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
	ICD10Code  
{! "
get# &
;& '
set( +
;+ ,
}- .
=/ 0
string1 7
.7 8
Empty8 =
;= >
[ 	
Required	 
] 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
	Diagnosis 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
[ 	
Range	 
( 
$num 
, 
int 
. 
MaxValue !
,! "
ErrorMessage# /
=0 1
$str2 Z
)Z [
][ \
public 
int 
Year 
{ 
get 
; 
set "
;" #
}$ %
[ 	
Required	 
] 
public 
ConditionStatus 
Status %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
[ 	
	MaxLength	 
( 
$num 
) 
] 
public   
string   
?   
Comment   
{    
get  ! $
;  $ %
set  & )
;  ) *
}  + ,
=  - .
string  / 5
.  5 6
Empty  6 ;
;  ; <
["" 	
Required""	 
]"" 
public## 
EntryBy## 
EntryBy## 
{##  
get##! $
;##$ %
set##& )
;##) *
}##+ ,
public%% 
string%% 
?%% 
AiExplanation%% $
{%%% &
get%%' *
;%%* +
set%%, /
;%%/ 0
}%%1 2
}&& 
}'' É
JC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\KnowMedication.cs
	namespace 
Backend 
. 
Domain 
. 
Entities %
{ 
	namespace 
Backend 
. 
Domain 
. 
Entities %
{ 
public 
class 
KnownMedication $
{ 	
public 
int 
Id 
{ 
get 
;  
set! $
;$ %
}& '
public 
string 
Name 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public		 
string		 
?		 
	Substance		 $
{		% &
get		' *
;		* +
set		, /
;		/ 0
}		1 2
public

 
string

 
?

 
AtcCode

 "
{

# $
get

% (
;

( )
set

* -
;

- .
}

/ 0
public 
string 
? 
Dosage !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
string 
?  
PrescriptionRequired /
{0 1
get2 5
;5 6
set7 :
;: ;
}< =
} 	
} 
} ˘
NC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\FamilyHistoryEntry.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
FamilyHistoryEntry #
:$ %
IEntity& -
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	

ForeignKey	 
( 
$str 
)  
]  !
public 
Patient 
? 
Patient 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
Required	 
] 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
Relative 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
[ 	
Required	 
] 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
	Diagnosis 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Comment 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
} À
KC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\DrugInteraction.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
DrugInteraction  
:  !
IEntity! (
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
[

 	
Required

	 
]

 
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 
SourceDrugBankId &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
[ 	
Required	 
] 
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 
TargetDrugBankId &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 

TargetName  
{! "
get# &
;& '
set( +
;+ ,
}- .
[ 	
Required	 
] 
public 
string 
Description !
{" #
get$ '
;' (
set) ,
;, -
}. /
} 
} ∂

FC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\DrugDetail.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 

DrugDetail 
: 
IEntity #
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
[ 	
Required	 
] 
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 

DrugBankId  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
? 
Toxicity 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
Pharmacodynamics '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
public 
string 
? 
SnpAdverseReactions *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
} 
} ƒ0
DC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\Diagnose.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
;! "
public 
class 
	Diagnosis 
: 
IEntity  
{		 
public

 

const

 
string

 #
AiExplanationDisclaimer

 /
=

0 1
$str `
;` a
public 

int 
Id 
{ 
get 
; 
set 
; 
} 
[ 
Required 
] 
public 

int 
	PatientId 
{ 
get 
; 
set  #
;# $
}% &
[ 

ForeignKey 
( 
$str 
) 
] 
public 

Patient 
? 
Patient 
{ 
get !
;! "
set# &
;& '
}( )
[ 
Required 
, 
	MaxLength 
( 
$num 
) 
] 
public 

string 
Title 
{ 
get 
; 
set "
;" #
}$ %
=& '
string( .
.. /
Empty/ 4
;4 5
[ 
	MaxLength 
( 
$num 
) 
] 
public 

string 
Description 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
string. 4
.4 5
Empty5 :
;: ;
[ 
	MaxLength 
( 
$num 
) 
] 
public 

string 
IcdCode 
{ 
get 
;  
set! $
;$ %
}& '
=( )
string* 0
.0 1
Empty1 6
;6 7
[ 
	MaxLength 
( 
$num 
) 
] 
public 

string 
Severity 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
[!! 
	MaxLength!! 
(!! 
$num!! 
)!! 
]!! 
public"" 

string"" 
SideLocalization"" "
{""# $
get""% (
;""( )
set""* -
;""- .
}""/ 0
=""1 2
string""3 9
.""9 :
Empty"": ?
;""? @
[$$ 
Required$$ 
]$$ 
public%% 

ConditionStatus%% 
ConditionStatus%% *
{%%+ ,
get%%- 0
;%%0 1
set%%2 5
;%%5 6
}%%7 8
['' 
Required'' 
]'' 
public(( 

EntryBy(( 
EntryBy(( 
{(( 
get((  
;((  !
set((" %
;((% &
}((' (
public** 

string** 
?** 
AiExplanation**  
{**! "
get**# &
;**& '
private**( /
set**0 3
;**3 4
}**5 6
[,, 
	MaxLength,, 
(,, 
$num,, 
),, 
],, 
public-- 

string-- 
MedicationText--  
{--! "
get--# &
;--& '
set--( +
;--+ ,
}--- .
=--/ 0
string--1 7
.--7 8
Empty--8 =
;--= >
[// 
	MaxLength// 
(// 
$num// 
)// 
]// 
public00 

string00 
Symptoms00 
{00 
get00  
;00  !
set00" %
;00% &
}00' (
=00) *
string00+ 1
.001 2
Empty002 7
;007 8
[22 
	MaxLength22 
(22 
$num22 
)22 
]22 
public33 

string33 
Findings33 
{33 
get33  
;33  !
set33" %
;33% &
}33' (
=33) *
string33+ 1
.331 2
Empty332 7
;337 8
[55 
	MaxLength55 
(55 
$num55 
)55 
]55 
public66 

string66 
TherapeuticMeasures66 %
{66& '
get66( +
;66+ ,
set66- 0
;660 1
}662 3
=664 5
string666 <
.66< =
Empty66= B
;66B C
[88 
	MaxLength88 
(88 
$num88 
)88 
]88 
public99 

string99 
?99 
Note99 
{99 
get99 
;99 
set99 "
;99" #
}99$ %
[;; 
Required;; 
];; 
public<< 

DateTime<< 
DiagnosisDate<< !
{<<" #
get<<$ '
;<<' (
set<<) ,
;<<, -
}<<. /
public>> 

DateTime>> 
	CreatedAt>> 
{>> 
get>>  #
;>># $
set>>% (
;>>( )
}>>* +
=>>, -
DateTime>>. 6
.>>6 7
UtcNow>>7 =
;>>= >
public?? 

DateTime?? 
	UpdatedAt?? 
{?? 
get??  #
;??# $
set??% (
;??( )
}??* +
=??, -
DateTime??. 6
.??6 7
UtcNow??7 =
;??= >
publicAA 

voidAA 
UpdateAiExplanationAA #
(AA# $
stringAA$ *
?AA* +
aiExplanationAA, 9
)AA9 :
{BB 
AiExplanationCC 
=CC 
aiExplanationCC %
;CC% &
	UpdatedAtDD 
=DD 
DateTimeDD 
.DD 
UtcNowDD #
;DD# $
}EE 
}FF ‹
NC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\CommunicationLevel.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
CommunicationLevel #
:$ %
IEntity& -
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
[ 	
Required	 
] 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
string 
Description !
{" #
get$ '
;' (
set) ,
;, -
}. /
=0 1
string2 8
.8 9
Empty9 >
;> ?
public 
string 
KiPrompt 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
string  
ActionRecommendation *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
=9 :
string; A
.A B
EmptyB G
;G H
} 
} Á
QC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\CommunicationQuestion.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class !
CommunicationQuestion &
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
Text 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
List 
< 
CommunicationAnswer '
>' (
Answers) 0
{1 2
get3 6
;6 7
set8 ;
;; <
}= >
=? @
newA D
(D E
)E F
;F G
} 
public

 

class

 
CommunicationAnswer

 $
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
Text 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
int 
Points 
{ 
get 
;  
set! $
;$ %
}& '
} 
} Â

JC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\AtcDrugMapping.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
AtcDrugMapping 
:  
IEntity  '
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
[

 	
Required

	 
]

 
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 
AtcCode 
{ 
get  #
;# $
set% (
;( )
}* +
[ 	
Required	 
] 
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 

DrugBankId  
{! "
get# &
;& '
set( +
;+ ,
}- .
[ 	
StringLength	 
( 
$num 
) 
] 
public 
string 
DrugName 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
} ‰
KC:\sources\Fehldiagnosen\Backend\Backend\Domain\Entities\ApplicationUser.cs
	namespace 	
Backend
 
. 
Domain 
. 
Entities !
{ 
public 

class 
ApplicationUser  
:! "
IdentityUser# /
{ 
} 
} º\
XC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\UserService\UserService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
UserService' 2
{ 
public 

class 
UserService 
: 
IUserService +
{ 
private 
readonly 
UserManager $
<$ %
ApplicationUser% 4
>4 5
_userManager6 B
;B C
private 
readonly 
RoleManager $
<$ %
IdentityRole% 1
>1 2
_roleManager3 ?
;? @
private 
readonly 
IConfiguration '
_configuration( 6
;6 7
private 
readonly 
MySqlDbContext '

_dbContext( 2
;2 3
public 
UserService 
( 
UserManager &
<& '
ApplicationUser' 6
>6 7
userManager8 C
,C D
RoleManagerE P
<P Q
IdentityRoleQ ]
>] ^
roleManager_ j
,j k
IConfigurationl z
configuration	{ à
,
à â
MySqlDbContext
ä ò
context
ô †
)
† °
{ 	
_userManager 
= 
userManager &
;& '
_roleManager 
= 
roleManager &
;& '
_configuration 
= 
configuration *
;* +

_dbContext 
= 
context  
;  !
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
Object( .
>. /
>/ 0
Login1 6
(6 7
LoginDto7 ?
loginDto@ H
)H I
{ 	
var 
user 
= 
await 
_userManager )
.) *
FindByNameAsync* 9
(9 :
loginDto: B
.B C
UsernameC K
)K L
;L M
if   
(   
user   
!=   
null   
&&   
await    %
_userManager  & 2
.  2 3
CheckPasswordAsync  3 E
(  E F
user  F J
,  J K
loginDto  L T
.  T U
Password  U ]
)  ] ^
)  ^ _
{!! 
var"" 
	userRoles"" 
="" 
await""  %
_userManager""& 2
.""2 3
GetRolesAsync""3 @
(""@ A
user""A E
)""E F
;""F G
var## 

authClaims## 
=##  
new##! $
List##% )
<##) *
Claim##* /
>##/ 0
{$$ 
new%% 
Claim%% 
(%% #
JwtRegisteredClaimNames%% 5
.%%5 6
Sub%%6 9
,%%9 :
user%%; ?
.%%? @
Id%%@ B
)%%B C
,%%C D
new&& 
Claim&& 
(&& #
JwtRegisteredClaimNames&& 5
.&&5 6
Jti&&6 9
,&&9 :
Guid&&; ?
.&&? @
NewGuid&&@ G
(&&G H
)&&H I
.&&I J
ToString&&J R
(&&R S
)&&S T
)&&T U
,&&U V
}'' 
;'' 

authClaims)) 
.)) 
AddRange)) #
())# $
	userRoles))$ -
.))- .
Select)). 4
())4 5
role))5 9
=>)): <
new))= @
Claim))A F
())F G

ClaimTypes))G Q
.))Q R
Role))R V
,))V W
role))X \
)))\ ]
)))] ^
)))^ _
;))_ `
var++ 
patient++ 
=++ 
await++ #

_dbContext++$ .
.++. /
Patients++/ 7
.++7 8
FirstOrDefaultAsync++8 K
(++K L
p++L M
=>++N P
p++Q R
.++R S
UserId++S Y
==++Z \
user++] a
.++a b
Id++b d
)++d e
;++e f
if,, 
(,, 
patient,, 
!=,, 
null,, #
),,# $
{-- 

authClaims.. 
... 
Add.. "
(.." #
new..# &
Claim..' ,
(.., -
$str..- 8
,..8 9
patient..: A
...A B
Id..B D
...D E
ToString..E M
(..M N
)..N O
)..O P
)..P Q
;..Q R
}// 
var11 
authSigningKey11 "
=11# $
new11% ( 
SymmetricSecurityKey11) =
(11= >
Encoding11> F
.11F G
UTF811G K
.11K L
GetBytes11L T
(11T U
_configuration11U c
.11c d

GetSection11d n
(11n o
$str11o |
)11| }
[11} ~
$str	11~ Ü
]
11Ü á
)
11á à
)
11à â
;
11â ä
var33 
token33 
=33 
new33 
JwtSecurityToken33  0
(330 1
claims44 
:44 

authClaims44 &
,44& '
signingCredentials55 &
:55& '
new55( +
SigningCredentials55, >
(55> ?
authSigningKey55? M
,55M N
SecurityAlgorithms55O a
.55a b

HmacSha25655b l
)55l m
)55m n
;55n o
return77 
ServiceResult77 $
<77$ %
Object77% +
>77+ ,
.77, -
Success77- 4
(774 5
new775 8
{88 
token99 
=99 
new99 #
JwtSecurityTokenHandler99  7
(997 8
)998 9
.999 :

WriteToken99: D
(99D E
token99E J
)99J K
,99K L
userId:: 
=:: 
user:: !
.::! "
Id::" $
,::$ %
	patientId;; 
=;; 
patient;;  '
?;;' (
.;;( )
Id;;) +
,;;+ ,
	firstName<< 
=<< 
patient<<  '
?<<' (
.<<( )
	FirstName<<) 2
}== 
)== 
;== 
}>> 
return?? 
ServiceResult??  
<??  !
Object??! '
>??' (
.??( )
Unauthorized??) 5
(??5 6
$str??6 U
)??U V
;??V W
}@@ 	
publicBB 
asyncBB 
TaskBB 
<BB 
ServiceResultBB '
>BB' (
RegisterBB) 1
(BB1 2
RegisterDtoBB2 =
registerDtoBB> I
)BBI J
{CC 	
varDD 

userExistsDD 
=DD 
awaitDD "
_userManagerDD# /
.DD/ 0
FindByNameAsyncDD0 ?
(DD? @
registerDtoDD@ K
.DDK L
UserNameDDL T
)DDT U
;DDU V
ifFF 
(FF 

userExistsFF 
!=FF 
nullFF "
)FF" #
{GG 
returnHH 
ServiceResultHH $
.HH$ %
ConflictHH% -
(HH- .
$strHH. D
)HHD E
;HHE F
}II 
ApplicationUserKK 
userKK  
=KK! "
newKK# &
ApplicationUserKK' 6
(KK6 7
)KK7 8
{LL 
EmailMM 
=MM 
registerDtoMM #
.MM# $
EmailMM$ )
,MM) *
SecurityStampNN 
=NN 
GuidNN  $
.NN$ %
NewGuidNN% ,
(NN, -
)NN- .
.NN. /
ToStringNN/ 7
(NN7 8
)NN8 9
,NN9 :
UserNameOO 
=OO 
registerDtoOO &
.OO& '
UserNameOO' /
}PP 
;PP 
IdentityResultRR 
resultRR !
=RR" #
awaitRR$ )
_userManagerRR* 6
.RR6 7
CreateAsyncRR7 B
(RRB C
userRRC G
,RRG H
registerDtoRRI T
.RRT U
PasswordRRU ]
)RR] ^
;RR^ _
ifSS 
(SS 
!SS 
resultSS 
.SS 
	SucceededSS !
)SS! "
{TT 
returnUU 
ServiceResultUU $
.UU$ %
InvalidUU% ,
(UU, -
$strUU- m
)UUm n
;UUn o
}VV 
ifXX 
(XX 
!XX 
stringXX 
.XX 
IsNullOrEmptyXX %
(XX% &
registerDtoXX& 1
.XX1 2
RoleXX2 6
)XX6 7
)XX7 8
{YY 
ifZZ 
(ZZ 
registerDtoZZ 
.ZZ  
RoleZZ  $
.ZZ$ %
EqualsZZ% +
(ZZ+ ,
$strZZ, 5
,ZZ5 6
StringComparisonZZ7 G
.ZZG H
OrdinalIgnoreCaseZZH Y
)ZZY Z
)ZZZ [
{[[ 
registerDto\\ 
.\\  
Role\\  $
=\\% &
$str\\' 0
;\\0 1
}]] 
else^^ 
if^^ 
(^^ 
registerDto^^ $
.^^$ %
Role^^% )
.^^) *
Equals^^* 0
(^^0 1
$str^^1 7
,^^7 8
StringComparison^^9 I
.^^I J
OrdinalIgnoreCase^^J [
)^^[ \
)^^\ ]
{__ 
registerDto`` 
.``  
Role``  $
=``% &
$str``' -
;``- .
}aa 
ifcc 
(cc 
!cc 
awaitcc 
_roleManagercc '
.cc' (
RoleExistsAsynccc( 7
(cc7 8
registerDtocc8 C
.ccC D
RoleccD H
)ccH I
)ccI J
{dd 
awaitee 
_roleManageree &
.ee& '
CreateAsyncee' 2
(ee2 3
newee3 6
IdentityRoleee7 C
(eeC D
registerDtoeeD O
.eeO P
RoleeeP T
)eeT U
)eeU V
;eeV W
}ff 
awaithh 
_userManagerhh "
.hh" #
AddToRoleAsynchh# 1
(hh1 2
userhh2 6
,hh6 7
registerDtohh8 C
.hhC D
RolehhD H
)hhH I
;hhI J
}ii 
ifkk 
(kk 
registerDtokk 
.kk 
Rolekk  
==kk! #
$strkk$ -
)kk- .
{ll 
varmm 

newPatientmm 
=mm  
newmm! $
Patientmm% ,
{nn 
UserIdoo 
=oo 
useroo !
.oo! "
Idoo" $
,oo$ %
ApplicationUserpp #
=pp$ %
userpp& *
,pp* +
UserNameqq 
=qq 
registerDtoqq *
.qq* +
UserNameqq+ 3
,qq3 4
	FirstNamerr 
=rr 
registerDtorr  +
.rr+ ,
	FirstNamerr, 5
,rr5 6
LastNamess 
=ss 
registerDtoss *
.ss* +
LastNamess+ 3
,ss3 4
DateOfBirthtt 
=tt  !
registerDtott" -
.tt- .
DateOfBirthtt. 9
,tt9 :
}uu 
;uu 

_dbContextww 
.ww 
Patientsww #
.ww# $
Addww$ '
(ww' (

newPatientww( 2
)ww2 3
;ww3 4
awaitxx 

_dbContextxx  
.xx  !
SaveChangesAsyncxx! 1
(xx1 2
)xx2 3
;xx3 4
}yy 
return{{ 
ServiceResult{{  
.{{  !
Success{{! (
({{( )
){{) *
;{{* +
}|| 	
}}} 
}~~ †
YC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\UserService\IUserService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
UserService' 2
{ 
public 

	interface 
IUserService !
{ 
Task 
< 
ServiceResult 
> 
Register $
($ %
RegisterDto% 0
registerDto1 <
)< =
;= >
Task		 
<		 
ServiceResult		 
<		 
Object		 !
>		! "
>		" #
Login		$ )
(		) *
LoginDto		* 2
loginDto		3 ;
)		; <
;		< =
}

 
} §
\C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\UserService\Dto\RegisterDto.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
UserService' 2
.2 3
Dto3 6
{ 
public 

class 
RegisterDto 
{ 
[ 	
Required	 
( 
ErrorMessage 
=  
$str! 8
)8 9
]9 :
public		 
string		 
UserName		 
{		  
get		! $
;		$ %
set		& )
;		) *
}		+ ,
[ 	
Required	 
( 
ErrorMessage 
=  
$str! 4
)4 5
]5 6
public 
string 
Email 
{ 
get !
;! "
set# &
;& '
}( )
[ 	
Required	 
( 
ErrorMessage 
=  
$str! 7
)7 8
]8 9
public 
string 
Password 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
Role 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
string 
	FirstName 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public 
string 
LastName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
DateTime 
DateOfBirth #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
Gender 
? 
Gender 
{ 
get  #
;# $
set% (
;( )
}* +
} 
} ·
YC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\UserService\Dto\LoginDto.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
UserService' 2
.2 3
Dto3 6
{ 
public 

class 
LoginDto 
{ 
[ 	
Required	 
( 
ErrorMessage 
=  
$str! 8
)8 9
]9 :
public 
string 
Username 
{  
get! $
;$ %
set& )
;) *
}+ ,
[

 	
Required

	 
(

 
ErrorMessage

 
=

  
$str

! 7
)

7 8
]

8 9
public 
string 
Password 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
} óõ
^C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\SymptomService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
{ 
public		 

class		 
SymptomService		 
:		  !
ISymptomService		" 1
{

 
private 
readonly %
IPatientSymptomRepository 2%
_patientSymptomRepository3 L
;L M
private 
readonly (
ISymptomDefinitionRepository 5(
_symptomDefinitionRepository6 R
;R S
private 
readonly 
IPatientRepository +
_patientRepository, >
;> ?
private 
readonly 
	DtoMapper "
_mapper# *
;* +
public 
SymptomService 
( %
IPatientSymptomRepository 7$
patientSymptomRepository8 P
,P Q(
ISymptomDefinitionRepositoryR n(
symptomDefinitionRepository	o ä
,
ä ã
	DtoMapper
å ï
mapper
ñ ú
,
ú ù 
IPatientRepository
û ∞
patientRepository
± ¬
)
¬ √
{ 	%
_patientSymptomRepository %
=& '$
patientSymptomRepository( @
;@ A(
_symptomDefinitionRepository (
=) *'
symptomDefinitionRepository+ F
;F G
_mapper 
= 
mapper 
; 
_patientRepository 
=  
patientRepository! 2
;2 3
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
IEnumerable( 3
<3 4"
PatientSymptomResponse4 J
>J K
>K L
>L M
GetAllAsyncN Y
(Y Z
intZ ]
	patientId^ g
,g h
stringi o
?o p
userIdq w
)w x
{ 	
var 
patient 
= 
await 
_patientRepository  2
.2 3
FindByIdAsync3 @
(@ A
	patientIdA J
)J K
;K L
if 
( 
patient 
== 
null 
)  
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1"
PatientSymptomResponse1 G
>G H
>H I
.I J
NotFoundJ R
(R S
$"S U
$strU ]
{] ^
	patientId^ g
}g h
$strh y
"y z
)z {
;{ |
if 
( 
userId 
!= 
null 
&& !
patient" )
.) *
UserId* 0
!=1 3
userId4 :
): ;
return   
ServiceResult   $
<  $ %
IEnumerable  % 0
<  0 1"
PatientSymptomResponse  1 G
>  G H
>  H I
.  I J
	Forbidden  J S
(  S T
$str  T x
)  x y
;  y z
var"" 
symptoms"" 
="" 
await""  %
_patientSymptomRepository""! :
."": ;#
FindAllByPatientIdAsync""; R
(""R S
	patientId""S \
)""\ ]
;""] ^
return## 
ServiceResult##  
<##  !
IEnumerable##! ,
<##, -"
PatientSymptomResponse##- C
>##C D
>##D E
.##E F
Success##F M
(##M N
_mapper##N U
.##U V(
ToPatientSymptomResponseList##V r
(##r s
symptoms##s {
)##{ |
)##| }
;##} ~
}$$ 	
public&& 
async&& 
Task&& 
<&& 
ServiceResult&& '
<&&' (
IEnumerable&&( 3
<&&3 4"
PatientSymptomResponse&&4 J
>&&J K
>&&K L
>&&L M
GetAllByDateAsync&&N _
(&&_ `
int&&` c
	patientId&&d m
,&&m n
DateTime&&o w
date&&x |
,&&| }
string	&&~ Ñ
?
&&Ñ Ö
userId
&&Ü å
)
&&å ç
{'' 	
var(( 
patient(( 
=(( 
await(( 
_patientRepository((  2
.((2 3
FindByIdAsync((3 @
(((@ A
	patientId((A J
)((J K
;((K L
if** 
(** 
patient** 
==** 
null** 
)**  
return++ 
ServiceResult++ $
<++$ %
IEnumerable++% 0
<++0 1"
PatientSymptomResponse++1 G
>++G H
>++H I
.++I J
NotFound++J R
(++R S
$"++S U
$str++U ]
{++] ^
	patientId++^ g
}++g h
$str++h y
"++y z
)++z {
;++{ |
if-- 
(-- 
userId-- 
!=-- 
null-- 
&&-- !
patient--" )
.--) *
UserId--* 0
!=--1 3
userId--4 :
)--: ;
return.. 
ServiceResult.. $
<..$ %
IEnumerable..% 0
<..0 1"
PatientSymptomResponse..1 G
>..G H
>..H I
...I J
	Forbidden..J S
(..S T
$str..T x
)..x y
;..y z
var00 
symptoms00 
=00 
await00  %
_patientSymptomRepository00! :
.00: ;*
FindAllByPatientIdAndDateAsync00; Y
(00Y Z
	patientId00Z c
,00c d
date00e i
)00i j
;00j k
return11 
ServiceResult11  
<11  !
IEnumerable11! ,
<11, -"
PatientSymptomResponse11- C
>11C D
>11D E
.11E F
Success11F M
(11M N
_mapper11N U
.11U V(
ToPatientSymptomResponseList11V r
(11r s
symptoms11s {
)11{ |
)11| }
;11} ~
}22 	
public44 
async44 
Task44 
<44 
ServiceResult44 '
<44' ("
PatientSymptomResponse44( >
>44> ?
>44? @
GetByIdAsync44A M
(44M N
int44N Q
	symptomId44R [
,44[ \
string44] c
?44c d
userId44e k
)44k l
{55 	
var66 
symptom66 
=66 
await66 %
_patientSymptomRepository66  9
.669 :
FindByIdAsync66: G
(66G H
	symptomId66H Q
)66Q R
;66R S
if88 
(88 
symptom88 
==88 
null88 
)88  
return99 
ServiceResult99 $
<99$ %"
PatientSymptomResponse99% ;
>99; <
.99< =
NotFound99= E
(99E F
$"99F H
$str99H P
{99P Q
	symptomId99Q Z
}99Z [
$str99[ l
"99l m
)99m n
;99n o
var;; 
patient;; 
=;; 
await;; 
_patientRepository;;  2
.;;2 3
FindByIdAsync;;3 @
(;;@ A
symptom;;A H
.;;H I
	PatientId;;I R
);;R S
;;;S T
if== 
(== 
userId== 
!=== 
null== 
&&== !
(==" #
patient==# *
====+ -
null==. 2
||==3 5
patient==6 =
.=== >
UserId==> D
!===E G
userId==H N
)==N O
)==O P
return>> 
ServiceResult>> $
<>>$ %"
PatientSymptomResponse>>% ;
>>>; <
.>>< =
	Forbidden>>= F
(>>F G
$str>>G i
)>>i j
;>>j k
return@@ 
ServiceResult@@  
<@@  !"
PatientSymptomResponse@@! 7
>@@7 8
.@@8 9
Success@@9 @
(@@@ A
_mapper@@A H
.@@H I$
ToPatientSymptomResponse@@I a
(@@a b
symptom@@b i
)@@i j
)@@j k
;@@k l
}AA 	
publicCC 
asyncCC 
TaskCC 
<CC 
ServiceResultCC '
<CC' ("
PatientSymptomResponseCC( >
>CC> ?
>CC? @
CreateAsyncCCA L
(CCL M
intCCM P
	patientIdCCQ Z
,CCZ ['
CreatePatientSymptomRequestCC\ w
requestCCx 
,	CC Ä
string
CCÅ á
?
CCá à
userId
CCâ è
)
CCè ê
{DD 	
varEE 
patientEE 
=EE 
awaitEE 
_patientRepositoryEE  2
.EE2 3
FindByIdAsyncEE3 @
(EE@ A
	patientIdEEA J
)EEJ K
;EEK L
ifGG 
(GG 
patientGG 
==GG 
nullGG 
)GG  
returnHH 
ServiceResultHH $
<HH$ %"
PatientSymptomResponseHH% ;
>HH; <
.HH< =
NotFoundHH= E
(HHE F
$"HHF H
$strHHH P
{HHP Q
	patientIdHHQ Z
}HHZ [
$strHH[ l
"HHl m
)HHm n
;HHn o
ifJJ 
(JJ 
userIdJJ 
!=JJ 
nullJJ 
&&JJ !
patientJJ" )
.JJ) *
UserIdJJ* 0
!=JJ1 3
userIdJJ4 :
)JJ: ;
returnKK 
ServiceResultKK $
<KK$ %"
PatientSymptomResponseKK% ;
>KK; <
.KK< =
	ForbiddenKK= F
(KKF G
$strKKG k
)KKk l
;KKl m
ifMM 
(MM 
requestMM 
.MM 
	SymptomIdMM !
!=MM" $
nullMM% )
)MM) *
{NN 
varOO 
symptomDefinitionOO %
=OO& '
awaitOO( -(
_symptomDefinitionRepositoryOO. J
.OOJ K
FindByIdAsyncOOK X
(OOX Y
requestOOY `
.OO` a
	SymptomIdOOa j
??OOk m
$numOOn o
)OOo p
;OOp q
ifQQ 
(QQ 
symptomDefinitionQQ %
==QQ& (
nullQQ) -
)QQ- .
returnRR 
ServiceResultRR (
<RR( )"
PatientSymptomResponseRR) ?
>RR? @
.RR@ A
NotFoundRRA I
(RRI J
$"RRJ L
$strRRL e
{RRe f
requestRRf m
.RRm n
	SymptomIdRRn w
}RRw x
$str	RRx â
"
RRâ ä
)
RRä ã
;
RRã å
}SS 
varUU 
symptomUU 
=UU 
newUU 
PatientSymptomUU ,
{VV 
	PatientIdWW 
=WW 
	patientIdWW %
,WW% &
SymptomNameXX 
=XX 
requestXX %
.XX% &
SymptomNameXX& 1
,XX1 2
SymptomDefinitionIdYY #
=YY$ %
requestYY& -
.YY- .
	SymptomIdYY. 7
,YY7 8
OccurrenceTimeZZ 
=ZZ  
requestZZ! (
.ZZ( )
OccurrenceTimeZZ) 7
,ZZ7 8
	Intensity[[ 
=[[ 
request[[ #
.[[# $
	Intensity[[$ -
,[[- .
Duration\\ 
=\\ 
request\\ "
.\\" #
Duration\\# +
,\\+ ,
PossibleTrigger]] 
=]]  !
request]]" )
.]]) *
PossibleTrigger]]* 9
,]]9 :
Notes^^ 
=^^ 
request^^ 
.^^  
Notes^^  %
,^^% &
Details__ 
=__ 
request__ !
.__! "
Details__" )
}`` 
;`` 
varbb 

newSymptombb 
=bb 
awaitbb "%
_patientSymptomRepositorybb# <
.bb< =
AddAsyncbb= E
(bbE F
symptombbF M
)bbM N
;bbN O
returncc 
ServiceResultcc  
<cc  !"
PatientSymptomResponsecc! 7
>cc7 8
.cc8 9
Successcc9 @
(cc@ A
_mapperccA H
.ccH I$
ToPatientSymptomResponseccI a
(cca b

newSymptomccb l
)ccl m
)ccm n
;ccn o
}dd 	
publicff 
asyncff 
Taskff 
<ff 
ServiceResultff '
<ff' ("
PatientSymptomResponseff( >
>ff> ?
>ff? @
UpdateAsyncffA L
(ffL M
intffM P
	patientIdffQ Z
,ffZ [
intff\ _
	symptomIdff` i
,ffi j(
UpdatePatientSymptomRequest	ffk Ü
request
ffá é
,
ffé è
string
ffê ñ
?
ffñ ó
userId
ffò û
)
ffû ü
{gg 	
varhh 
patienthh 
=hh 
awaithh 
_patientRepositoryhh  2
.hh2 3
FindByIdAsynchh3 @
(hh@ A
	patientIdhhA J
)hhJ K
;hhK L
ifjj 
(jj 
patientjj 
==jj 
nulljj 
)jj  
returnkk 
ServiceResultkk $
<kk$ %"
PatientSymptomResponsekk% ;
>kk; <
.kk< =
NotFoundkk= E
(kkE F
$"kkF H
$strkkH P
{kkP Q
	patientIdkkQ Z
}kkZ [
$strkk[ l
"kkl m
)kkm n
;kkn o
ifmm 
(mm 
userIdmm 
!=mm 
nullmm 
&&mm !
patientmm" )
.mm) *
UserIdmm* 0
!=mm1 3
userIdmm4 :
)mm: ;
returnnn 
ServiceResultnn $
<nn$ %"
PatientSymptomResponsenn% ;
>nn; <
.nn< =
	Forbiddennn= F
(nnF G
$strnnG k
)nnk l
;nnl m
varpp 
existingSymptompp 
=pp  !
awaitpp" '%
_patientSymptomRepositorypp( A
.ppA B
FindByIdAsyncppB O
(ppO P
	symptomIdppP Y
)ppY Z
;ppZ [
ifrr 
(rr 
existingSymptomrr 
==rr  "
nullrr# '
||rr( *
existingSymptomrr+ :
.rr: ;
	PatientIdrr; D
!=rrE G
	patientIdrrH Q
)rrQ R
returnss 
ServiceResultss $
<ss$ %"
PatientSymptomResponsess% ;
>ss; <
.ss< =
NotFoundss= E
(ssE F
$"ssF H
$strssH W
{ssW X
	symptomIdssX a
}ssa b
$strssb s
"sss t
)sst u
;ssu v
existingSymptomuu 
.uu 
SymptomNameuu '
=uu( )
requestuu* 1
.uu1 2
SymptomNameuu2 =
;uu= >
existingSymptomvv 
.vv 
SymptomDefinitionIdvv /
=vv0 1
requestvv2 9
.vv9 :
	SymptomIdvv: C
;vvC D
existingSymptomww 
.ww 
OccurrenceTimeww *
=ww+ ,
requestww- 4
.ww4 5
OccurrenceTimeww5 C
;wwC D
existingSymptomxx 
.xx 
	Intensityxx %
=xx& '
requestxx( /
.xx/ 0
	Intensityxx0 9
;xx9 :
existingSymptomyy 
.yy 
Durationyy $
=yy% &
requestyy' .
.yy. /
Durationyy/ 7
;yy7 8
existingSymptomzz 
.zz 
PossibleTriggerzz +
=zz, -
requestzz. 5
.zz5 6
PossibleTriggerzz6 E
;zzE F
existingSymptom{{ 
.{{ 
Notes{{ !
={{" #
request{{$ +
.{{+ ,
Notes{{, 1
;{{1 2
existingSymptom|| 
.|| 
Details|| #
=||$ %
request||& -
.||- .
Details||. 5
;||5 6
var~~ 
updatedSymptom~~ 
=~~  
await~~! &%
_patientSymptomRepository~~' @
.~~@ A
UpdateAsync~~A L
(~~L M
existingSymptom~~M \
)~~\ ]
;~~] ^
return 
ServiceResult  
<  !"
PatientSymptomResponse! 7
>7 8
.8 9
Success9 @
(@ A
_mapperA H
.H I$
ToPatientSymptomResponseI a
(a b
updatedSymptomb p
)p q
)q r
;r s
}
ÄÄ 	
public
ÇÇ 
async
ÇÇ 
Task
ÇÇ 
<
ÇÇ 
ServiceResult
ÇÇ '
>
ÇÇ' (
DeleteAsync
ÇÇ) 4
(
ÇÇ4 5
int
ÇÇ5 8
	symptomId
ÇÇ9 B
,
ÇÇB C
string
ÇÇD J
?
ÇÇJ K
userId
ÇÇL R
)
ÇÇR S
{
ÉÉ 	
var
ÑÑ 
existingSymptom
ÑÑ 
=
ÑÑ  !
await
ÑÑ" ''
_patientSymptomRepository
ÑÑ( A
.
ÑÑA B
FindByIdAsync
ÑÑB O
(
ÑÑO P
	symptomId
ÑÑP Y
)
ÑÑY Z
;
ÑÑZ [
if
ÜÜ 
(
ÜÜ 
existingSymptom
ÜÜ 
==
ÜÜ  "
null
ÜÜ# '
)
ÜÜ' (
return
áá 
ServiceResult
áá $
.
áá$ %
NotFound
áá% -
(
áá- .
$"
áá. 0
$str
áá0 ?
{
áá? @
	symptomId
áá@ I
}
ááI J
$str
ááJ [
"
áá[ \
)
áá\ ]
;
áá] ^
var
ââ 
patient
ââ 
=
ââ 
await
ââ  
_patientRepository
ââ  2
.
ââ2 3
FindByIdAsync
ââ3 @
(
ââ@ A
existingSymptom
ââA P
.
ââP Q
	PatientId
ââQ Z
)
ââZ [
;
ââ[ \
if
ãã 
(
ãã 
userId
ãã 
!=
ãã 
null
ãã 
&&
ãã !
(
ãã" #
patient
ãã# *
==
ãã+ -
null
ãã. 2
||
ãã3 5
patient
ãã6 =
.
ãã= >
UserId
ãã> D
!=
ããE G
userId
ããH N
)
ããN O
)
ããO P
return
åå 
ServiceResult
åå $
.
åå$ %
	Forbidden
åå% .
(
åå. /
$str
åå/ Q
)
ååQ R
;
ååR S
await
éé '
_patientSymptomRepository
éé +
.
éé+ ,
DeleteAsync
éé, 7
(
éé7 8
existingSymptom
éé8 G
)
ééG H
;
ééH I
return
èè 
ServiceResult
èè  
.
èè  !
Success
èè! (
(
èè( )
)
èè) *
;
èè* +
}
êê 	
public
íí 
async
íí 
Task
íí 
<
íí 
ServiceResult
íí '
<
íí' (
IEnumerable
íí( 3
<
íí3 4'
SymptomDefinitionResponse
íí4 M
>
ííM N
>
ííN O
>
ííO P.
 GetSymptomDefinitionsByNameAsync
ííQ q
(
ííq r
string
íír x
name
ííy }
)
íí} ~
{
ìì 	
var
îî 
definitions
îî 
=
îî 
await
îî #*
_symptomDefinitionRepository
îî$ @
.
îî@ A
SearchByNameAsync
îîA R
(
îîR S
name
îîS W
)
îîW X
;
îîX Y
return
ïï 
ServiceResult
ïï  
<
ïï  !
IEnumerable
ïï! ,
<
ïï, -'
SymptomDefinitionResponse
ïï- F
>
ïïF G
>
ïïG H
.
ïïH I
Success
ïïI P
(
ïïP Q
_mapper
ïïQ X
.
ïïX Y%
ToSymptomDefinitionList
ïïY p
(
ïïp q
definitions
ïïq |
)
ïï| }
)
ïï} ~
;
ïï~ 
}
ññ 	
}
óó 
}òò π
_C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\ISymptomService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
{ 
public 

	interface 
ISymptomService $
{ 
Task		 
<		 
ServiceResult		 
<		 "
PatientSymptomResponse		 1
>		1 2
>		2 3
GetByIdAsync		4 @
(		@ A
int		A D
	symptomId		E N
,		N O
string		P V
?		V W
userId		X ^
)		^ _
;		_ `
Task 
< 
ServiceResult 
< 
IEnumerable &
<& '%
SymptomDefinitionResponse' @
>@ A
>A B
>B C,
 GetSymptomDefinitionsByNameAsyncD d
(d e
stringe k
?k l
namem q
)q r
;r s
Task 
< 
ServiceResult 
< 
IEnumerable &
<& '"
PatientSymptomResponse' =
>= >
>> ?
>? @
GetAllAsyncA L
(L M
intM P
	patientIdQ Z
,Z [
string\ b
?b c
userIdd j
)j k
;k l
Task 
< 
ServiceResult 
< "
PatientSymptomResponse 1
>1 2
>2 3
CreateAsync4 ?
(? @
int@ C
	patientIdD M
,M N'
CreatePatientSymptomRequestO j
requestk r
,r s
stringt z
?z {
userId	| Ç
)
Ç É
;
É Ñ
Task 
< 
ServiceResult 
< "
PatientSymptomResponse 1
>1 2
>2 3
UpdateAsync4 ?
(? @
int@ C
	patientIdD M
,M N
intO R
patientSymptomIdS c
,c d(
UpdatePatientSymptomRequest	e Ä
request
Å à
,
à â
string
ä ê
?
ê ë
userId
í ò
)
ò ô
;
ô ö
Task 
< 
ServiceResult 
> 
DeleteAsync '
(' (
int( +
	symptomId, 5
,5 6
string7 =
?= >
userId? E
)E F
;F G
Task 
< 
ServiceResult 
< 
IEnumerable &
<& '"
PatientSymptomResponse' =
>= >
>> ?
>? @
GetAllByDateAsyncA R
(R S
intS V
	patientIdW `
,` a
DateTimeb j
datek o
,o p
stringq w
?w x
userIdy 
)	 Ä
;
Ä Å
} 
} √
oC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\Dto\UpdatePatientSymptomRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
.5 6
Dto6 9
{ 
public 

class '
UpdatePatientSymptomRequest ,
{ 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
SymptomName "
{# $
get% (
;( )
set* -
;- .
}/ 0
public

 
int

 
?

 
	SymptomId

 
{

 
get

  #
;

# $
set

% (
;

( )
}

* +
[ 	
Required	 
] 
public 
DateTime 
OccurrenceTime &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
=5 6
DateTime7 ?
.? @
Now@ C
;C D
[ 	
Range	 
( 
$num 
, 
$num 
) 
] 
public 
int 
	Intensity 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Duration 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
PossibleTrigger &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Notes 
{ 
get "
;" #
set$ '
;' (
}) *
public 

Dictionary 
< 
string  
,  !
string" (
?( )
>) *
Details+ 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
=A B
newC F
(F G
)G H
;H I
} 
} §

hC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\Dto\SymptomFieldResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
.5 6
Dto6 9
{ 
public 

class  
SymptomFieldResponse %
{ 
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
string 
Type 
{ 
get  
;  !
set" %
;% &
}' (
=) *
$str+ 1
;1 2
public		 
List		 
<		 
string		 
?		 
>		 
Options		 $
{		% &
get		' *
;		* +
set		, /
;		/ 0
}		1 2
=		3 4
new		5 8
(		8 9
)		9 :
;		: ;
public 
bool 

IsRequired 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
} Û

mC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\Dto\SymptomDefinitionResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
.5 6
Dto6 9
{ 
public 

class %
SymptomDefinitionResponse *
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
Name 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public		 
List		 
<		 
string		 
>		 
Aliases		 #
{		$ %
get		& )
;		) *
set		+ .
;		. /
}		0 1
=		2 3
new		4 7
(		7 8
)		8 9
;		9 :
public 
List 
<  
SymptomFieldResponse (
>( )
Fields* 0
{1 2
get3 6
;6 7
set8 ;
;; <
}= >
=? @
newA D
(D E
)E F
;F G
} 
} ú
jC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\Dto\PatientSymptomResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
.5 6
Dto6 9
{ 
public 

class "
PatientSymptomResponse '
{ 
public		 
int		 
Id		 
{		 
get		 
;		 
set		  
;		  !
}		" #
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
? 
SymptomName "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
int 
? 
	SymptomId 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
DefinedSymptomName )
{* +
get, /
;/ 0
set1 4
;4 5
}6 7
public 
DateTime 
OccurrenceTime &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
int 
	Intensity 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
? 
Duration 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
PossibleTrigger &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
string 
? 
Notes 
{ 
get "
;" #
set$ '
;' (
}) *
public 

Dictionary 
< 
string  
,  !
string" (
?( )
>) *
Details+ 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
=A B
newC F
(F G
)G H
;H I
public 
DateTime 
	CreatedAt !
{" #
get$ '
;' (
set) ,
;, -
}. /
}   
}!! √
oC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\SymptomService\Dto\CreatePatientSymptomRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
SymptomService' 5
.5 6
Dto6 9
{ 
public 

class '
CreatePatientSymptomRequest ,
{ 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
SymptomName "
{# $
get% (
;( )
set* -
;- .
}/ 0
public

 
int

 
?

 
	SymptomId

 
{

 
get

  #
;

# $
set

% (
;

( )
}

* +
[ 	
Required	 
] 
public 
DateTime 
OccurrenceTime &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
=5 6
DateTime7 ?
.? @
Now@ C
;C D
[ 	
Range	 
( 
$num 
, 
$num 
) 
] 
public 
int 
	Intensity 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Duration 
{  !
get" %
;% &
set' *
;* +
}, -
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
PossibleTrigger &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Notes 
{ 
get "
;" #
set$ '
;' (
}) *
public 

Dictionary 
< 
string  
,  !
string" (
?( )
>) *
Details+ 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
=A B
newC F
(F G
)G H
;H I
} 
} ª
^C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\PatientService\PatientService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
PatientService' 5
{ 
public 

class 
PatientService 
:  !
IPatientService" 1
{ 
private		 
readonly		 
IPatientRepository		 +
_patientRepository		, >
;		> ?
public 
PatientService 
( 
IPatientRepository 0
patientRepository1 B
)B C
{ 	
_patientRepository 
=  
patientRepository! 2
;2 3
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
PatientResponse( 7
>7 8
>8 9
GetPatientByIdAsync: M
(M N
intN Q
idR T
)T U
{ 	
var 
patient 
= 
await 
_patientRepository  2
.2 3
FindByIdAsync3 @
(@ A
idA C
)C D
;D E
if 
( 
patient 
== 
null 
)  
return 
ServiceResult $
<$ %
PatientResponse% 4
>4 5
.5 6
NotFound6 >
(> ?
$"? A
$strA I
{I J
idJ L
}L M
$strM \
"\ ]
)] ^
;^ _
return 
ServiceResult  
<  !
PatientResponse! 0
>0 1
.1 2
Success2 9
(9 :
new: =
PatientResponse> M
{ 
Id 
= 
patient 
. 
Id 
,  
UserName 
= 
patient "
." #
UserName# +
,+ ,
	FirstName 
= 
patient #
.# $
	FirstName$ -
,- .
LastName 
= 
patient "
." #
LastName# +
,+ ,
DateOfBirth 
= 
patient %
.% &
DateOfBirth& 1
,1 2
Gender 
= 
patient  
.  !
Gender! '
} 
) 
; 
} 	
}   
}!! ¯
_C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\PatientService\IPatientService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
PatientService' 5
{ 
public 

	interface 
IPatientService $
{ 
Task		 
<		 
ServiceResult		 
<		 
PatientResponse		 *
>		* +
>		+ ,
GetPatientByIdAsync		- @
(		@ A
int		A D
id		E G
)		G H
;		H I
}

 
} —
cC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\PatientService\Dto\PatientResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
PatientService' 5
.5 6
Dto6 9
{ 
public 

class 
PatientResponse  
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
UserName 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public		 
string		 
	FirstName		 
{		  !
get		" %
;		% &
set		' *
;		* +
}		, -
=		. /
string		0 6
.		6 7
Empty		7 <
;		< =
public

 
string

 
LastName

 
{

  
get

! $
;

$ %
set

& )
;

) *
}

+ ,
=

- .
string

/ 5
.

5 6
Empty

6 ;
;

; <
public 
DateTime 
DateOfBirth #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
Gender 
? 
Gender 
{ 
get  #
;# $
set% (
;( )
}* +
} 
} œç
dC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicationService\MedicationService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
MedicationService' 8
{		 
public

 

class

 
MedicationService

 "
:

# $
IMedicationService

% 7
{ 
private 
readonly !
IMedicationRepository .!
_medicationRepository/ D
;D E
private 
readonly 
IPatientRepository +
_patientRepository, >
;> ?
private 
readonly #
IDrugInteractionService 0#
_drugInteractionService1 H
;H I
private 
readonly 
	DtoMapper "
_mapper# *
;* +
public 
MedicationService  
(  !!
IMedicationRepository! 6 
medicationrepository7 K
,K L
IPatientRepositoryM _
patientRepository` q
,q r
	DtoMappers |
mapper	} É
,
É Ñ%
IDrugInteractionService
Ö ú$
drugInteractionService
ù ≥
)
≥ ¥
{ 	!
_medicationRepository !
=" # 
medicationrepository$ 8
;8 9
_patientRepository 
=  
patientRepository! 2
;2 3
_mapper 
= 
mapper 
; #
_drugInteractionService #
=$ %"
drugInteractionService& <
;< =
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
IEnumerable( 3
<3 4
MedicationResponse4 F
>F G
>G H
>H I
GetAllAsyncJ U
(U V
intV Y
	patientIdZ c
,c d
stringe k
?k l
userIdm s
)s t
{ 	
var 
patient 
= 
await 
_patientRepository  2
.2 3
FindByIdAsync3 @
(@ A
	patientIdA J
)J K
;K L
if 
( 
patient 
== 
null 
)  
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1
MedicationResponse1 C
>C D
>D E
.E F
NotFoundF N
(N O
$"O Q
$strQ Y
{Y Z
	patientIdZ c
}c d
$strd u
"u v
)v w
;w x
if   
(   
userId   
!=   
null   
&&   !
patient  " )
.  ) *
UserId  * 0
!=  1 3
userId  4 :
)  : ;
return!! 
ServiceResult!! $
<!!$ %
IEnumerable!!% 0
<!!0 1
MedicationResponse!!1 C
>!!C D
>!!D E
.!!E F
	Forbidden!!F O
(!!O P
$str!!P t
)!!t u
;!!u v
var## 
medications## 
=## 
await## #!
_medicationRepository##$ 9
.##9 :#
FindAllByPatientIdAsync##: Q
(##Q R
	patientId##R [
)##[ \
;##\ ]
return$$ 
ServiceResult$$  
<$$  !
IEnumerable$$! ,
<$$, -
MedicationResponse$$- ?
>$$? @
>$$@ A
.$$A B
Success$$B I
($$I J
medications%% 
.%% 
Select%% "
(%%" #
m%%# $
=>%%% '
_mapper%%( /
.%%/ 0 
ToMedicationResponse%%0 D
(%%D E
m%%E F
)%%F G
)%%G H
)&& 
;&& 
}'' 	
public)) 
async)) 
Task)) 
<)) 
ServiceResult)) '
<))' (
MedicationResponse))( :
>)): ;
>)); <
GetByIdAsync))= I
())I J
int))J M
medicationId))N Z
,))Z [
string))\ b
?))b c
userId))d j
)))j k
{** 	
var++ 

medication++ 
=++ 
await++ "!
_medicationRepository++# 8
.++8 9
FindByIdAsync++9 F
(++F G
medicationId++G S
)++S T
;++T U
if-- 
(-- 

medication-- 
==-- 
null-- "
)--" #
return.. 
ServiceResult.. $
<..$ %
MedicationResponse..% 7
>..7 8
...8 9
NotFound..9 A
(..A B
$"..B D
$str..D O
{..O P
medicationId..P \
}..\ ]
$str..] n
"..n o
)..o p
;..p q
var00 
patient00 
=00 
await00 
_patientRepository00  2
.002 3
FindByIdAsync003 @
(00@ A

medication00A K
.00K L
	PatientId00L U
)00U V
;00V W
if22 
(22 
userId22 
!=22 
null22 
&&22 !
(22" #
patient22# *
==22+ -
null22. 2
||223 5
patient226 =
.22= >
UserId22> D
!=22E G
userId22H N
)22N O
)22O P
return33 
ServiceResult33 $
<33$ %
MedicationResponse33% 7
>337 8
.338 9
	Forbidden339 B
(33B C
$str33C h
)33h i
;33i j
return55 
ServiceResult55  
<55  !
MedicationResponse55! 3
>553 4
.554 5
Success555 <
(55< =
_mapper55= D
.55D E 
ToMedicationResponse55E Y
(55Y Z

medication55Z d
)55d e
)55e f
;55f g
}66 	
public88 
async88 
Task88 
<88 
ServiceResult88 '
<88' (
MedicationResponse88( :
>88: ;
>88; <
CreateAsync88= H
(88H I
int88I L
	patientId88M V
,88V W#
CreateMedicationRequest88X o
request88p w
,88w x
string88y 
?	88 Ä
userId
88Å á
)
88á à
{99 	
var:: 
patient:: 
=:: 
await:: 
_patientRepository::  2
.::2 3
FindByIdAsync::3 @
(::@ A
	patientId::A J
)::J K
;::K L
if<< 
(<< 
patient<< 
==<< 
null<< 
)<<  
return== 
ServiceResult== $
<==$ %
MedicationResponse==% 7
>==7 8
.==8 9
NotFound==9 A
(==A B
$"==B D
$str==D L
{==L M
	patientId==M V
}==V W
$str==W h
"==h i
)==i j
;==j k
if?? 
(?? 
userId?? 
!=?? 
null?? 
&&?? !
patient??" )
.??) *
UserId??* 0
!=??1 3
userId??4 :
)??: ;
return@@ 
ServiceResult@@ $
<@@$ %
MedicationResponse@@% 7
>@@7 8
.@@8 9
	Forbidden@@9 B
(@@B C
$str@@C g
)@@g h
;@@h i
varBB 

medicationBB 
=BB 
newBB  

MedicationBB! +
{CC 
NameDD 
=DD 
requestDD 
.DD 
NameDD #
,DD# $
	PatientIdEE 
=EE 
	patientIdEE %
,EE% &
DosageFF 
=FF 
requestFF  
.FF  !
DosageFF! '
,FF' (
IntakeFrequencyGG 
=GG  !
requestGG" )
.GG) *
IntakeFrequencyGG* 9
,GG9 :
IntakeStartDateHH 
=HH  !
requestHH" )
.HH) *
IntakeStartDateHH* 9
,HH9 :
DurationInDaysII 
=II  
requestII! (
.II( )
DurationInDaysII) 7
,II7 8

IndicationJJ 
=JJ 
requestJJ $
.JJ$ %

IndicationJJ% /
,JJ/ 0
AtcCodeKK 
=KK 
requestKK !
.KK! "
AtcCodeKK" )
,KK) *
EntryByLL 
=LL 
requestLL !
.LL! "
EntryByLL" )
,LL) *
NotesMM 
=MM 
requestMM 
.MM  
NotesMM  %
}NN 
;NN 
varPP 
newMedicationPP 
=PP 
awaitPP  %!
_medicationRepositoryPP& ;
.PP; <
AddAsyncPP< D
(PPD E

medicationPPE O
)PPO P
;PPP Q
varRR 
responseDtoRR 
=RR 
_mapperRR %
.RR% & 
ToMedicationResponseRR& :
(RR: ;
newMedicationRR; H
)RRH I
;RRI J
ifTT 
(TT 
!TT 
stringTT 
.TT 
IsNullOrWhiteSpaceTT )
(TT) *
requestTT* 1
.TT1 2
AtcCodeTT2 9
)TT9 :
)TT: ;
{UU 
varVV 
activeMedicationsVV %
=VV& '
awaitVV( -!
_medicationRepositoryVV. C
.VVC D#
FindAllByPatientIdAsyncVVD [
(VV[ \
	patientIdVV\ e
)VVe f
;VVf g
varXX 
existingAtcCodesXX $
=XX% &
activeMedicationsXX' 8
.YY 
WhereYY 
(YY 
mYY 
=>YY 
mYY  !
.YY! "
IdYY" $
!=YY% '
newMedicationYY( 5
.YY5 6
IdYY6 8
&&YY9 ;
!YY< =
stringYY= C
.YYC D
IsNullOrWhiteSpaceYYD V
(YYV W
mYYW X
.YYX Y
AtcCodeYYY `
)YY` a
)YYa b
.ZZ 
SelectZZ 
(ZZ 
mZZ 
=>ZZ  
mZZ! "
.ZZ" #
AtcCodeZZ# *
!ZZ* +
)ZZ+ ,
.[[ 
ToList[[ 
([[ 
)[[ 
;[[ 
if]] 
(]] 
existingAtcCodes]] #
.]]# $
Any]]$ '
(]]' (
)]]( )
)]]) *
{^^ 
var__ 
interactionResult__ )
=__* +
await__, 1#
_drugInteractionService__2 I
.__I J"
CheckInteractionsAsync__J `
(__` a
request__a h
.__h i
AtcCode__i p
,__p q
existingAtcCodes	__r Ç
)
__Ç É
;
__É Ñ
ifaa 
(aa 
interactionResultaa (
.aa( )
	IsSuccessaa) 2
&&aa3 5
interactionResultaa6 G
.aaG H
DataaaH L
!=aaM O
nullaaP T
)aaT U
{bb 
responseDtocc #
.cc# $
InteractionWarningscc$ 7
=cc8 9
interactionResultcc: K
.ccK L
DataccL P
;ccP Q
}dd 
}ee 
}ff 
returnhh 
ServiceResulthh  
<hh  !
MedicationResponsehh! 3
>hh3 4
.hh4 5
Successhh5 <
(hh< =
responseDtohh= H
)hhH I
;hhI J
}ii 	
publickk 
asynckk 
Taskkk 
<kk 
ServiceResultkk '
<kk' (
MedicationResponsekk( :
>kk: ;
>kk; <
UpdateAsynckk= H
(kkH I
intkkI L
	patientIdkkM V
,kkV W
intkkX [
medicationIdkk\ h
,kkh i$
UpdateMedicationRequest	kkj Å
request
kkÇ â
,
kkâ ä
string
kkã ë
?
kkë í
userId
kkì ô
)
kkô ö
{ll 	
varmm 
patientmm 
=mm 
awaitmm 
_patientRepositorymm  2
.mm2 3
FindByIdAsyncmm3 @
(mm@ A
	patientIdmmA J
)mmJ K
;mmK L
ifoo 
(oo 
patientoo 
==oo 
nulloo 
)oo  
returnpp 
ServiceResultpp $
<pp$ %
MedicationResponsepp% 7
>pp7 8
.pp8 9
NotFoundpp9 A
(ppA B
$"ppB D
$strppD L
{ppL M
	patientIdppM V
}ppV W
$strppW h
"pph i
)ppi j
;ppj k
ifrr 
(rr 
userIdrr 
!=rr 
nullrr 
&&rr !
patientrr" )
.rr) *
UserIdrr* 0
!=rr1 3
userIdrr4 :
)rr: ;
returnss 
ServiceResultss $
<ss$ %
MedicationResponsess% 7
>ss7 8
.ss8 9
	Forbiddenss9 B
(ssB C
$strssC g
)ssg h
;ssh i
varuu 
existingMedicationuu "
=uu# $
awaituu% *!
_medicationRepositoryuu+ @
.uu@ A
FindByIdAsyncuuA N
(uuN O
medicationIduuO [
)uu[ \
;uu\ ]
ifww 
(ww 
existingMedicationww "
==ww# %
nullww& *
)ww* +
returnxx 
ServiceResultxx $
<xx$ %
MedicationResponsexx% 7
>xx7 8
.xx8 9
NotFoundxx9 A
(xxA B
$strxxB _
)xx_ `
;xx` a
ifzz 
(zz 
existingMedicationzz "
.zz" #
	PatientIdzz# ,
!=zz- /
	patientIdzz0 9
)zz9 :
return{{ 
ServiceResult{{ $
<{{$ %
MedicationResponse{{% 7
>{{7 8
.{{8 9
NotFound{{9 A
({{A B
$str{{B _
){{_ `
;{{` a
existingMedication|| 
.|| 
Name|| #
=||$ %
request||& -
.||- .
Name||. 2
;||2 3
existingMedication}} 
.}} 
Dosage}} %
=}}& '
request}}( /
.}}/ 0
Dosage}}0 6
;}}6 7
existingMedication~~ 
.~~ 
IntakeFrequency~~ .
=~~/ 0
request~~1 8
.~~8 9
IntakeFrequency~~9 H
;~~H I
existingMedication 
. 
IntakeStartDate .
=/ 0
request1 8
.8 9
IntakeStartDate9 H
;H I 
existingMedication
ÄÄ 
.
ÄÄ 
DurationInDays
ÄÄ -
=
ÄÄ. /
request
ÄÄ0 7
.
ÄÄ7 8
DurationInDays
ÄÄ8 F
;
ÄÄF G 
existingMedication
ÅÅ 
.
ÅÅ 

Indication
ÅÅ )
=
ÅÅ* +
request
ÅÅ, 3
.
ÅÅ3 4

Indication
ÅÅ4 >
;
ÅÅ> ? 
existingMedication
ÇÇ 
.
ÇÇ 
EntryBy
ÇÇ &
=
ÇÇ' (
request
ÇÇ) 0
.
ÇÇ0 1
EntryBy
ÇÇ1 8
;
ÇÇ8 9 
existingMedication
ÉÉ 
.
ÉÉ 
Notes
ÉÉ $
=
ÉÉ% &
request
ÉÉ' .
.
ÉÉ. /
Notes
ÉÉ/ 4
;
ÉÉ4 5
var
ÖÖ 
updatedMedication
ÖÖ !
=
ÖÖ" #
await
ÖÖ$ )#
_medicationRepository
ÖÖ* ?
.
ÖÖ? @
UpdateAsync
ÖÖ@ K
(
ÖÖK L 
existingMedication
ÖÖL ^
)
ÖÖ^ _
;
ÖÖ_ `
return
ÜÜ 
ServiceResult
ÜÜ  
<
ÜÜ  ! 
MedicationResponse
ÜÜ! 3
>
ÜÜ3 4
.
ÜÜ4 5
Success
ÜÜ5 <
(
ÜÜ< =
_mapper
ÜÜ= D
.
ÜÜD E"
ToMedicationResponse
ÜÜE Y
(
ÜÜY Z
updatedMedication
ÜÜZ k
)
ÜÜk l
)
ÜÜl m
;
ÜÜm n
}
áá 	
public
ââ 
async
ââ 
Task
ââ 
<
ââ 
ServiceResult
ââ '
>
ââ' (
DeleteAsync
ââ) 4
(
ââ4 5
int
ââ5 8
medicationId
ââ9 E
,
ââE F
string
ââG M
?
ââM N
userId
ââO U
)
ââU V
{
ää 	
var
ãã  
existingMedication
ãã "
=
ãã# $
await
ãã% *#
_medicationRepository
ãã+ @
.
ãã@ A
FindByIdAsync
ããA N
(
ããN O
medicationId
ããO [
)
ãã[ \
;
ãã\ ]
if
çç 
(
çç  
existingMedication
çç "
==
çç# %
null
çç& *
)
çç* +
return
éé 
ServiceResult
éé $
.
éé$ %
NotFound
éé% -
(
éé- .
$"
éé. 0
$str
éé0 B
{
ééB C
medicationId
ééC O
}
ééO P
$str
ééP a
"
ééa b
)
ééb c
;
ééc d
var
êê 
patient
êê 
=
êê 
await
êê  
_patientRepository
êê  2
.
êê2 3
FindByIdAsync
êê3 @
(
êê@ A 
existingMedication
êêA S
.
êêS T
	PatientId
êêT ]
)
êê] ^
;
êê^ _
if
íí 
(
íí 
userId
íí 
!=
íí 
null
íí 
&&
íí !
(
íí" #
patient
íí# *
==
íí+ -
null
íí. 2
||
íí3 5
patient
íí6 =
.
íí= >
UserId
íí> D
!=
ííE G
userId
ííH N
)
ííN O
)
ííO P
return
ìì 
ServiceResult
ìì $
.
ìì$ %
	Forbidden
ìì% .
(
ìì. /
$str
ìì/ T
)
ììT U
;
ììU V
await
ïï #
_medicationRepository
ïï '
.
ïï' (
DeleteAsync
ïï( 3
(
ïï3 4 
existingMedication
ïï4 F
)
ïïF G
;
ïïG H
return
ññ 
ServiceResult
ññ  
.
ññ  !
Success
ññ! (
(
ññ( )
)
ññ) *
;
ññ* +
}
óó 	
}
òò 
}ôô ï
eC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicationService\IMedicationService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
MedicationService' 8
{ 
public 

	interface 
IMedicationService '
{ 
Task 
< 
ServiceResult 
< 
IEnumerable &
<& '
MedicationResponse' 9
>9 :
>: ;
>; <
GetAllAsync= H
(H I
intI L
	patientIdM V
,V W
stringX ^
?^ _
userId` f
)f g
;g h
Task

 
<

 
ServiceResult

 
<

 
MedicationResponse

 -
>

- .
>

. /
GetByIdAsync

0 <
(

< =
int

= @
medicationId

A M
,

M N
string

O U
?

U V
userId

W ]
)

] ^
;

^ _
Task 
< 
ServiceResult 
< 
MedicationResponse -
>- .
>. /
CreateAsync0 ;
(; <
int< ?
	patientId@ I
,I J#
CreateMedicationRequestK b
requestc j
,j k
stringl r
?r s
userIdt z
)z {
;{ |
Task 
< 
ServiceResult 
< 
MedicationResponse -
>- .
>. /
UpdateAsync0 ;
(; <
int< ?
	patientId@ I
,I J
intK N
medicationIdO [
,[ \#
UpdateMedicationRequest] t
requestu |
,| }
string	~ Ñ
?
Ñ Ö
userId
Ü å
)
å ç
;
ç é
Task 
< 
ServiceResult 
> 
DeleteAsync '
(' (
int( +
medicationId, 8
,8 9
string: @
?@ A
userIdB H
)H I
;I J
} 
} È
nC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicationService\Dto\UpdateMedicationRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
MedicationService' 8
.8 9
Dto9 <
{ 
public 

class #
UpdateMedicationRequest (
{ 
[ 	
	MaxLength	 
( 
$num 
) 
] 
public		 
required		 
string		 
Name		 #
{		$ %
get		& )
;		) *
set		+ .
;		. /
}		0 1
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Dosage 
{ 
get  #
;# $
set% (
;( )
}* +
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
IntakeFrequency &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DateTime 
? 
IntakeStartDate (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
[ 	
Range	 
( 
$num 
, 
$num 
) 
] 
public 
int 
DurationInDays !
{" #
get$ '
;' (
set) ,
;, -
}. /
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 

Indication !
{" #
get$ '
;' (
set) ,
;, -
}. /
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
AtcCode 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
EntryBy 
? 
EntryBy 
{  !
get" %
;% &
set' *
;* +
}, -
public!! 
string!! 
?!! 
Notes!! 
{!! 
get!! "
;!!" #
set!!$ '
;!!' (
}!!) *
public## 
string## 
?## 
	Substance##  
{##! "
get### &
;##& '
set##( +
;##+ ,
}##- .
public%% 
bool%% 
?%%  
PrescriptionRequired%% )
{%%* +
get%%, /
;%%/ 0
set%%1 4
;%%4 5
}%%6 7
}&& 
}'' –
iC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicationService\Dto\MedicationResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
MedicationService' 8
.8 9
Dto9 <
{ 
public 

class 
MedicationResponse #
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public

 
string

 
Name

 
{

 
get

 !
;

! "
set

# &
;

& '
}

( )
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
? 
Dosage 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
IntakeFrequency &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DateTime 
? 
IntakeStartDate (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
int 
? 
DurationInDays "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 
DateTime 
? 
EndDate  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
? 

Indication !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
string 
? 
AtcCode 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
EntryBy 
? 
EntryBy 
{  !
get" %
;% &
set' *
;* +
}, -
public 
string 
? 
Notes 
{ 
get "
;" #
set$ '
;' (
}) *
public   
string   
?   
	Substance    
{  ! "
get  # &
;  & '
set  ( +
;  + ,
}  - .
public"" 
bool"" 
?""  
PrescriptionRequired"" )
{""* +
get"", /
;""/ 0
set""1 4
;""4 5
}""6 7
public## 
List## 
<## 
string## 
>## 
InteractionWarnings## /
{##0 1
get##2 5
;##5 6
set##7 :
;##: ;
}##< =
=##> ?
new##@ C
List##D H
<##H I
string##I O
>##O P
(##P Q
)##Q R
;##R S
}$$ 
}%% Œ
nC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicationService\Dto\CreateMedicationRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
MedicationService' 8
.8 9
Dto9 <
{ 
public 

class #
CreateMedicationRequest (
{		 
[

 	
	MaxLength

	 
(

 
$num

 
)

 
]

 
public 
required 
string 
Name #
{$ %
get& )
;) *
set+ .
;. /
}0 1
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
Dosage 
{ 
get  #
;# $
set% (
;( )
}* +
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
IntakeFrequency &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DateTime 
? 
IntakeStartDate (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
[ 	
Range	 
( 
$num 
, 
$num 
) 
] 
public 
int 
DurationInDays !
{" #
get$ '
;' (
set) ,
;, -
}. /
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 

Indication !
{" #
get$ '
;' (
set) ,
;, -
}. /
[ 	
	MaxLength	 
( 
$num 
) 
] 
public 
string 
? 
AtcCode 
{  
get! $
;$ %
set& )
;) *
}+ ,
public!! 
EntryBy!! 
?!! 
EntryBy!! 
{!!  !
get!!" %
;!!% &
set!!' *
;!!* +
}!!, -
public## 
string## 
?## 
Notes## 
{## 
get## "
;##" #
set##$ '
;##' (
}##) *
[%% 	
	MaxLength%%	 
(%% 
$num%% 
)%% 
]%% 
public&& 
string&& 
?&& 
	Substance&&  
{&&! "
get&&# &
;&&& '
set&&( +
;&&+ ,
}&&- .
public(( 
bool(( 
?((  
PrescriptionRequired(( )
{((* +
get((, /
;((/ 0
set((1 4
;((4 5
}((6 7
})) 
}** ©B
jC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalLetterService\MedicalLetterService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
MedicalLetterService' ;
{		 
public

 

class

  
MedicalLetterService

 %
:

& '!
IMedicalLetterService

( =
{ 
private 
readonly $
IMedicalLetterRepository 1$
_medicalLetterRepository2 J
;J K
private 
readonly 
	DtoMapper "
_mapper# *
;* +
public  
MedicalLetterService #
(# $$
IMedicalLetterRepository$ <#
medicalLetterRepository= T
,T U
	DtoMapperV _
mapper` f
)f g
{ 	$
_medicalLetterRepository $
=% &#
medicalLetterRepository' >
;> ?
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ServiceResult '
<' (!
MedicalLetterResponse( =
>= >
>> ?
GetByIdAsync@ L
(L M
intM P
idQ S
,S T
stringU [
?[ \
userId] c
)c d
{ 	
var 
letter 
= 
await $
_medicalLetterRepository 7
.7 8
FindByIdAsync8 E
(E F
idF H
)H I
;I J
if 
( 
letter 
== 
null 
) 
return 
ServiceResult $
<$ %!
MedicalLetterResponse% :
>: ;
.; <
NotFound< D
(D E
$"E G
$strG U
{U V
idV X
}X Y
$strY h
"h i
)i j
;j k
return 
ServiceResult  
<  !!
MedicalLetterResponse! 6
>6 7
.7 8
Success8 ?
(? @
_mapper@ G
.G H#
ToMedicalLetterResponseH _
(_ `
letter` f
)f g
)g h
;h i
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
IEnumerable( 3
<3 4!
MedicalLetterResponse4 I
>I J
>J K
>K L
GetByPatientIdAsyncM `
(` a
inta d
	patientIde n
,n o
stringp v
?v w
userIdx ~
)~ 
{ 	
var   
letters   
=   
await   $
_medicalLetterRepository    8
.  8 9
FindAllAsync  9 E
(  E F
)  F G
;  G H
var!! 
filtered!! 
=!! 
letters!! "
."" 
Where"" 
("" 
l"" 
=>"" 
l"" 
."" 
	PatientId"" '
==""( *
	patientId""+ 4
)""4 5
.## 
Select## 
(## 
l## 
=>## 
_mapper## $
.##$ %#
ToMedicalLetterResponse##% <
(##< =
l##= >
)##> ?
)##? @
;##@ A
return%% 
ServiceResult%%  
<%%  !
IEnumerable%%! ,
<%%, -!
MedicalLetterResponse%%- B
>%%B C
>%%C D
.%%D E
Success%%E L
(%%L M
filtered%%M U
)%%U V
;%%V W
}&& 	
public(( 
async(( 
Task(( 
<(( 
ServiceResult(( '
<((' (!
MedicalLetterResponse((( =
>((= >
>((> ?
CreateAsync((@ K
(((K L&
CreateMedicalLetterRequest((L f
request((g n
,((n o
string((p v
?((v w
userId((x ~
)((~ 
{)) 	
var** 
letter** 
=** 
new** 
MedicalLetter** *
{++ 
	PatientId,, 
=,, 
request,, #
.,,# $
	PatientId,,$ -
,,,- .
Subject-- 
=-- 
request-- !
.--! "
Subject--" )
,--) *
ReciverName.. 
=.. 
request.. %
...% &
ReciverName..& 1
,..1 2
Status// 
=// 
Status// 
.//  

Validation//  *
}00 
;00 
var22 
created22 
=22 
await22 $
_medicalLetterRepository22  8
.228 9
AddAsync229 A
(22A B
letter22B H
)22H I
;22I J
return33 
ServiceResult33  
<33  !!
MedicalLetterResponse33! 6
>336 7
.337 8
Success338 ?
(33? @
_mapper33@ G
.33G H#
ToMedicalLetterResponse33H _
(33_ `
created33` g
)33g h
)33h i
;33i j
}44 	
public66 
async66 
Task66 
<66 
ServiceResult66 '
<66' (!
MedicalLetterResponse66( =
>66= >
>66> ?
UpdateAsync66@ K
(66K L
int66L O
id66P R
,66R S&
CreateMedicalLetterRequest66T n
request66o v
,66v w
string66x ~
?66~ 
userId
66Ä Ü
)
66Ü á
{77 	
var88 
letter88 
=88 
await88 $
_medicalLetterRepository88 7
.887 8
FindByIdAsync888 E
(88E F
id88F H
)88H I
;88I J
if99 
(99 
letter99 
==99 
null99 
)99 
return:: 
ServiceResult:: $
<::$ %!
MedicalLetterResponse::% :
>::: ;
.::; <
NotFound::< D
(::D E
$"::E G
$str::G U
{::U V
id::V X
}::X Y
$str::Y h
"::h i
)::i j
;::j k
letter<< 
.<< 
Subject<< 
=<< 
request<< $
.<<$ %
Subject<<% ,
;<<, -
letter== 
.== 
ReciverName== 
===  
request==! (
.==( )
ReciverName==) 4
;==4 5
letter>> 
.>> 
	UpdatedAt>> 
=>> 
DateTime>> '
.>>' (
UtcNow>>( .
;>>. /
var@@ 
updated@@ 
=@@ 
await@@ $
_medicalLetterRepository@@  8
.@@8 9
UpdateAsync@@9 D
(@@D E
letter@@E K
)@@K L
;@@L M
returnAA 
ServiceResultAA  
<AA  !!
MedicalLetterResponseAA! 6
>AA6 7
.AA7 8
SuccessAA8 ?
(AA? @
_mapperAA@ G
.AAG H#
ToMedicalLetterResponseAAH _
(AA_ `
updatedAA` g
)AAg h
)AAh i
;AAi j
}BB 	
publicDD 
asyncDD 
TaskDD 
<DD 
ServiceResultDD '
>DD' (
DeleteAsyncDD) 4
(DD4 5
intDD5 8
idDD9 ;
,DD; <
stringDD= C
?DDC D
userIdDDE K
)DDK L
{EE 	
varFF 
letterFF 
=FF 
awaitFF $
_medicalLetterRepositoryFF 7
.FF7 8
FindByIdAsyncFF8 E
(FFE F
idFFF H
)FFH I
;FFI J
ifGG 
(GG 
letterGG 
==GG 
nullGG 
)GG 
returnHH 
ServiceResultHH $
.HH$ %
NotFoundHH% -
(HH- .
$"HH. 0
$strHH0 >
{HH> ?
idHH? A
}HHA B
$strHHB Q
"HHQ R
)HHR S
;HHS T
awaitJJ $
_medicalLetterRepositoryJJ *
.JJ* +
DeleteAsyncJJ+ 6
(JJ6 7
letterJJ7 =
)JJ= >
;JJ> ?
returnKK 
ServiceResultKK  
.KK  !
SuccessKK! (
(KK( )
)KK) *
;KK* +
}LL 	
}MM 
}NN ˜
kC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalLetterService\IMedicalLetterService.cs
	namespace 	
Backend
 
. 
Application 
. 

Interfaces (
{ 
public 

	interface !
IMedicalLetterService *
{ 
Task		 
<		 
ServiceResult		 
<		 !
MedicalLetterResponse		 0
>		0 1
>		1 2
GetByIdAsync		3 ?
(		? @
int		@ C
id		D F
,		F G
string		H N
?		N O
userId		P V
)		V W
;		W X
Task

 
<

 
ServiceResult

 
<

 
IEnumerable

 &
<

& '!
MedicalLetterResponse

' <
>

< =
>

= >
>

> ?
GetByPatientIdAsync

@ S
(

S T
int

T W
	patientId

X a
,

a b
string

c i
?

i j
userId

k q
)

q r
;

r s
Task 
< 
ServiceResult 
< !
MedicalLetterResponse 0
>0 1
>1 2
CreateAsync3 >
(> ?&
CreateMedicalLetterRequest? Y
requestZ a
,a b
stringc i
?i j
userIdk q
)q r
;r s
Task 
< 
ServiceResult 
< !
MedicalLetterResponse 0
>0 1
>1 2
UpdateAsync3 >
(> ?
int? B
idC E
,E F&
CreateMedicalLetterRequestG a
requestb i
,i j
stringk q
?q r
userIds y
)y z
;z {
Task 
< 
ServiceResult 
> 
DeleteAsync '
(' (
int( +
id, .
,. /
string0 6
?6 7
userId8 >
)> ?
;? @
} 
} Û
oC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalLetterService\Dto\MedicalLetterResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
MedicalLetterService' ;
.; <
Dto< ?
{ 
public 

class !
MedicalLetterResponse &
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
? 
AiSuggestion #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
string 
? 
ReworkedText #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public		 
DateTime		 
	Startdate		 !
{		" #
get		$ '
;		' (
set		) ,
;		, -
}		. /
public

 
string

 
Status

 
{

 
get

 "
;

" #
set

$ '
;

' (
}

) *
=

+ ,
string

- 3
.

3 4
Empty

4 9
;

9 :
public 
string 
Subject 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
string. 4
.4 5
Empty5 :
;: ;
public 
string 
ReciverName !
{" #
get$ '
;' (
set) ,
;, -
}. /
=0 1
string2 8
.8 9
Empty9 >
;> ?
public 
DateTime 
	CreatedAt !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 
DateTime 
	UpdatedAt !
{" #
get$ '
;' (
set) ,
;, -
}. /
} 
} â
tC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalLetterService\Dto\CreateMedicalLetterRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
MedicalLetterService' ;
.; <
Dto< ?
{ 
public 

class &
CreateMedicalLetterRequest +
{ 
[ 	
Required	 
] 
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
[

 	
Required

	 
,

 
	MaxLength

 
(

 
$num

  
)

  !
]

! "
public 
string 
Subject 
{ 
get  #
;# $
set% (
;( )
}* +
=, -
string. 4
.4 5
Empty5 :
;: ;
[ 	
Required	 
, 
	MaxLength 
( 
$num  
)  !
]! "
public 
string 
ReciverName !
{" #
get$ '
;' (
set) ,
;, -
}. /
=0 1
string2 8
.8 9
Empty9 >
;> ?
} 
} ‘s
vC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalHistoryEntryService\MedicalHistoryEntryService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '&
MedicalHistoryEntryService' A
{ 
public		 

class		 &
MedicalHistoryEntryService		 +
:		, -'
IMedicalHistoryEntryService		. I
{

 
private *
IMedicalHistoryEntryRepository .*
_medicalHistoryEntryRepository/ M
;M N
private 
IPatientRepository "
_patientRepository# 5
;5 6
private 
	DtoMapper 
_mapper !
;! "
public &
MedicalHistoryEntryService )
() **
IMedicalHistoryEntryRepository* H)
medicalHistoryEntryRepositoryI f
,f g
IPatientRepositoryh z
patientRepository	{ å
,
å ç
	DtoMapper
é ó
mapper
ò û
)
û ü
{ 	*
_medicalHistoryEntryRepository *
=+ ,)
medicalHistoryEntryRepository- J
;J K
_patientRepository 
=  
patientRepository! 2
;2 3
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
IEnumerable( 3
<3 4'
MedicalHistoryEntryResponse4 O
>O P
>P Q
>Q R
GetAllAsyncS ^
(^ _
int_ b
	patientIdc l
,l m
stringn t
?t u
userIdv |
)| }
{ 	
var 
patient 
= 
await 
_patientRepository  2
.2 3
FindByIdAsync3 @
(@ A
	patientIdA J
)J K
;K L
if 
( 
patient 
== 
null 
)  
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1'
MedicalHistoryEntryResponse1 L
>L M
>M N
.N O
NotFoundO W
(W X
$"X Z
$strZ b
{b c
	patientIdc l
}l m
$strm ~
"~ 
)	 Ä
;
Ä Å
if 
( 
userId 
!= 
null 
&& !
patient" )
.) *
UserId* 0
!=1 3
userId4 :
): ;
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1'
MedicalHistoryEntryResponse1 L
>L M
>M N
.N O
	ForbiddenO X
(X Y
$strY }
)} ~
;~ 
var   
entries   
=   
await   *
_medicalHistoryEntryRepository    >
.  > ?#
FindAllByPatientIdAsync  ? V
(  V W
	patientId  W `
)  ` a
;  a b
return!! 
ServiceResult!!  
<!!  !
IEnumerable!!! ,
<!!, -'
MedicalHistoryEntryResponse!!- H
>!!H I
>!!I J
.!!J K
Success!!K R
(!!R S
entries"" 
."" 
Select"" 
("" 
e""  
=>""! #
_mapper""$ +
.""+ ,)
ToMedicalHistoryEntryResponse"", I
(""I J
e""J K
)""K L
)""L M
)## 
;## 
}$$ 	
public&& 
async&& 
Task&& 
<&& 
ServiceResult&& '
<&&' ('
MedicalHistoryEntryResponse&&( C
>&&C D
>&&D E
GetByIdAsync&&F R
(&&R S
int&&S V!
medicalHistoryEntryId&&W l
,&&l m
string&&n t
?&&t u
userId&&v |
)&&| }
{'' 	
var(( 
medicalHistoryEntry(( #
=(($ %
await((& +*
_medicalHistoryEntryRepository((, J
.((J K
FindByIdAsync((K X
(((X Y!
medicalHistoryEntryId((Y n
)((n o
;((o p
if** 
(** 
medicalHistoryEntry** #
==**$ &
null**' +
)**+ ,
return++ 
ServiceResult++ $
<++$ %'
MedicalHistoryEntryResponse++% @
>++@ A
.++A B
NotFound++B J
(++J K
$"++K M
$str++M [
{++[ \!
medicalHistoryEntryId++\ q
}++q r
$str	++r É
"
++É Ñ
)
++Ñ Ö
;
++Ö Ü
var-- 
patient-- 
=-- 
await-- 
_patientRepository--  2
.--2 3
FindByIdAsync--3 @
(--@ A
medicalHistoryEntry--A T
.--T U
	PatientId--U ^
)--^ _
;--_ `
if// 
(// 
userId// 
!=// 
null// 
&&// !
(//" #
patient//# *
==//+ -
null//. 2
||//3 5
patient//6 =
.//= >
UserId//> D
!=//E G
userId//H N
)//N O
)//O P
return00 
ServiceResult00 $
<00$ %'
MedicalHistoryEntryResponse00% @
>00@ A
.00A B
	Forbidden00B K
(00K L
$str00L n
)00n o
;00o p
return22 
ServiceResult22  
<22  !'
MedicalHistoryEntryResponse22! <
>22< =
.22= >
Success22> E
(22E F
_mapper22F M
.22M N)
ToMedicalHistoryEntryResponse22N k
(22k l
medicalHistoryEntry22l 
)	22 Ä
)
22Ä Å
;
22Å Ç
}33 	
public55 
async55 
Task55 
<55 
ServiceResult55 '
<55' ('
MedicalHistoryEntryResponse55( C
>55C D
>55D E
CreateAsync55F Q
(55Q R
int55R U
	patientId55V _
,55_ `-
 CreateMedicalHistoryEntryRequest	55a Å
request
55Ç â
,
55â ä
string
55ã ë
?
55ë í
userId
55ì ô
)
55ô ö
{66 	
var77 
patient77 
=77 
await77 
_patientRepository77  2
.772 3
FindByIdAsync773 @
(77@ A
	patientId77A J
)77J K
;77K L
if99 
(99 
patient99 
==99 
null99 
)99  
return:: 
ServiceResult:: $
<::$ %'
MedicalHistoryEntryResponse::% @
>::@ A
.::A B
NotFound::B J
(::J K
$"::K M
$str::M U
{::U V
	patientId::V _
}::_ `
$str::` q
"::q r
)::r s
;::s t
if<< 
(<< 
userId<< 
!=<< 
null<< 
&&<< !
patient<<" )
.<<) *
UserId<<* 0
!=<<1 3
userId<<4 :
)<<: ;
return== 
ServiceResult== $
<==$ %'
MedicalHistoryEntryResponse==% @
>==@ A
.==A B
	Forbidden==B K
(==K L
$str==L p
)==p q
;==q r
var?? 
medicalHistoryEntry?? #
=??$ %
new??& )
MedicalHistoryEntry??* =
{@@ 
	PatientIdAA 
=AA 
	patientIdAA %
,AA% &
	ICD10CodeBB 
=BB 
requestBB #
.BB# $
	ICD10CodeBB$ -
,BB- .
	DiagnosisCC 
=CC 
requestCC #
.CC# $
	DiagnosisCC$ -
,CC- .
YearDD 
=DD 
requestDD 
.DD 
YearDD #
,DD# $
StatusEE 
=EE 
requestEE  
.EE  !
StatusEE! '
,EE' (
CommentFF 
=FF 
requestFF !
.FF! "
CommentFF" )
,FF) *
EntryByGG 
=GG 
requestGG !
.GG! "
EntryByGG" )
}HH 
;HH 
varJJ 
newEntryJJ 
=JJ 
awaitJJ  *
_medicalHistoryEntryRepositoryJJ! ?
.JJ? @
AddAsyncJJ@ H
(JJH I
medicalHistoryEntryJJI \
)JJ\ ]
;JJ] ^
returnKK 
ServiceResultKK  
<KK  !'
MedicalHistoryEntryResponseKK! <
>KK< =
.KK= >
SuccessKK> E
(KKE F
_mapperKKF M
.KKM N)
ToMedicalHistoryEntryResponseKKN k
(KKk l
newEntryKKl t
)KKt u
)KKu v
;KKv w
}LL 	
publicNN 
asyncNN 
TaskNN 
<NN 
ServiceResultNN '
<NN' ('
MedicalHistoryEntryResponseNN( C
>NNC D
>NND E
UpdateAsyncNNF Q
(NNQ R
intNNR U
	patientIdNNV _
,NN_ `
intNNa d!
medicalHistoryEntryIdNNe z
,NNz {-
 UpdateMedicalHistoryEntryRequest	NN| ú
request
NNù §
,
NN§ •
string
NN¶ ¨
?
NN¨ ≠
userId
NNÆ ¥
)
NN¥ µ
{OO 	
varPP 
patientPP 
=PP 
awaitPP 
_patientRepositoryPP  2
.PP2 3
FindByIdAsyncPP3 @
(PP@ A
	patientIdPPA J
)PPJ K
;PPK L
ifRR 
(RR 
patientRR 
==RR 
nullRR 
)RR  
returnSS 
ServiceResultSS $
<SS$ %'
MedicalHistoryEntryResponseSS% @
>SS@ A
.SSA B
NotFoundSSB J
(SSJ K
$"SSK M
$strSSM U
{SSU V
	patientIdSSV _
}SS_ `
$strSS` q
"SSq r
)SSr s
;SSs t
ifUU 
(UU 
userIdUU 
!=UU 
nullUU 
&&UU !
patientUU" )
.UU) *
UserIdUU* 0
!=UU1 3
userIdUU4 :
)UU: ;
returnVV 
ServiceResultVV $
<VV$ %'
MedicalHistoryEntryResponseVV% @
>VV@ A
.VVA B
	ForbiddenVVB K
(VVK L
$strVVL p
)VVp q
;VVq r
varXX 
existingEntryXX 
=XX 
awaitXX  %*
_medicalHistoryEntryRepositoryXX& D
.XXD E
FindByIdAsyncXXE R
(XXR S!
medicalHistoryEntryIdXXS h
)XXh i
;XXi j
ifZZ 
(ZZ 
existingEntryZZ 
==ZZ  
nullZZ! %
||ZZ& (
existingEntryZZ) 6
.ZZ6 7
	PatientIdZZ7 @
!=ZZA C
	patientIdZZD M
)ZZM N
return[[ 
ServiceResult[[ $
<[[$ %'
MedicalHistoryEntryResponse[[% @
>[[@ A
.[[A B
NotFound[[B J
([[J K
$"[[K M
$str[[M b
{[[b c!
medicalHistoryEntryId[[c x
}[[x y
$str	[[y ä
"
[[ä ã
)
[[ã å
;
[[å ç
existingEntry]] 
.]] 
	ICD10Code]] #
=]]$ %
request]]& -
.]]- .
	ICD10Code]]. 7
;]]7 8
existingEntry^^ 
.^^ 
	Diagnosis^^ #
=^^$ %
request^^& -
.^^- .
	Diagnosis^^. 7
;^^7 8
existingEntry__ 
.__ 
Year__ 
=__  
request__! (
.__( )
Year__) -
;__- .
existingEntry`` 
.`` 
Status``  
=``! "
request``# *
.``* +
Status``+ 1
;``1 2
existingEntryaa 
.aa 
Commentaa !
=aa" #
requestaa$ +
.aa+ ,
Commentaa, 3
;aa3 4
existingEntrybb 
.bb 
AiExplanationbb '
=bb( )
requestbb* 1
.bb1 2
AiExplanationbb2 ?
;bb? @
vardd 
updatedEntrydd 
=dd 
awaitdd $*
_medicalHistoryEntryRepositorydd% C
.ddC D
UpdateAsyncddD O
(ddO P
existingEntryddP ]
)dd] ^
;dd^ _
returnee 
ServiceResultee  
<ee  !'
MedicalHistoryEntryResponseee! <
>ee< =
.ee= >
Successee> E
(eeE F
_mappereeF M
.eeM N)
ToMedicalHistoryEntryResponseeeN k
(eek l
updatedEntryeel x
)eex y
)eey z
;eez {
}ff 	
publichh 
asynchh 
Taskhh 
<hh 
ServiceResulthh '
>hh' (
DeleteAsynchh) 4
(hh4 5
inthh5 8!
medicalHistoryEntryIdhh9 N
,hhN O
stringhhP V
?hhV W
userIdhhX ^
)hh^ _
{ii 	
varjj 
existingEntryjj 
=jj 
awaitjj  %*
_medicalHistoryEntryRepositoryjj& D
.jjD E
FindByIdAsyncjjE R
(jjR S!
medicalHistoryEntryIdjjS h
)jjh i
;jji j
ifll 
(ll 
existingEntryll 
==ll  
nullll! %
)ll% &
returnmm 
ServiceResultmm $
.mm$ %
NotFoundmm% -
(mm- .
$"mm. 0
$strmm0 E
{mmE F!
medicalHistoryEntryIdmmF [
}mm[ \
$strmm\ l
"mml m
)mmm n
;mmn o
varoo 
patientoo 
=oo 
awaitoo 
_patientRepositoryoo  2
.oo2 3
FindByIdAsyncoo3 @
(oo@ A
existingEntryooA N
.ooN O
	PatientIdooO X
)ooX Y
;ooY Z
ifqq 
(qq 
userIdqq 
!=qq 
nullqq 
&&qq !
(qq" #
patientqq# *
==qq+ -
nullqq. 2
||qq3 5
patientqq6 =
.qq= >
UserIdqq> D
!=qqE G
userIdqqH N
)qqN O
)qqO P
returnrr 
ServiceResultrr $
.rr$ %
	Forbiddenrr% .
(rr. /
$strrr/ Q
)rrQ R
;rrR S
awaittt *
_medicalHistoryEntryRepositorytt 0
.tt0 1
DeleteAsynctt1 <
(tt< =
existingEntrytt= J
)ttJ K
;ttK L
returnuu 
ServiceResultuu  
.uu  !
Successuu! (
(uu( )
)uu) *
;uu* +
}vv 	
}ww 
}xx ô
wC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalHistoryEntryService\IMedicalHistoryEntryService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '&
MedicalHistoryEntryService' A
{ 
public 

	interface '
IMedicalHistoryEntryService 0
{ 
Task 
< 
ServiceResult 
< 
IEnumerable &
<& ''
MedicalHistoryEntryResponse' B
>B C
>C D
>D E
GetAllAsyncF Q
(Q R
intR U
	patientIdV _
,_ `
stringa g
?g h
userIdi o
)o p
;p q
Task

 
<

 
ServiceResult

 
<

 '
MedicalHistoryEntryResponse

 6
>

6 7
>

7 8
GetByIdAsync

9 E
(

E F
int

F I!
medicalHistoryEntryId

J _
,

_ `
string

a g
?

g h
userId

i o
)

o p
;

p q
Task 
< 
ServiceResult 
< '
MedicalHistoryEntryResponse 6
>6 7
>7 8
CreateAsync9 D
(D E
intE H
	patientIdI R
,R S,
 CreateMedicalHistoryEntryRequestT t
requestu |
,| }
string	~ Ñ
?
Ñ Ö
userId
Ü å
)
å ç
;
ç é
Task 
< 
ServiceResult 
< '
MedicalHistoryEntryResponse 6
>6 7
>7 8
UpdateAsync9 D
(D E
intE H
	patientIdI R
,R S
intT W!
medicalHistoryEntryIdX m
,m n-
 UpdateMedicalHistoryEntryRequest	o è
request
ê ó
,
ó ò
string
ô ü
?
ü †
userId
° ß
)
ß ®
;
® ©
Task 
< 
ServiceResult 
> 
DeleteAsync '
(' (
int( +!
medicalHistoryEntryId, A
,A B
stringC I
?I J
userIdK Q
)Q R
;R S
} 
} µ
ÄC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalHistoryEntryService\Dto\UpdateMedicalHistoryEntryRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '&
MedicalHistoryEntryService' A
.A B
DtoB E
{ 
public 

class ,
 UpdateMedicalHistoryEntryRequest 1
{ 
public 
string 
? 
	ICD10Code  
{! "
get# &
;& '
set( +
;+ ,
}- .
=/ 0
string1 7
.7 8
Empty8 =
;= >
public

 
string

 
	Diagnosis

 
{

  !
get

" %
;

% &
set

' *
;

* +
}

, -
=

. /
string

0 6
.

6 7
Empty

7 <
;

< =
public 
int 
Year 
{ 
get 
; 
set "
;" #
}$ %
public 
ConditionStatus 
Status %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
string 
? 
Comment 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
string 
? 
AiExplanation $
{% &
get' *
;* +
set, /
;/ 0
}1 2
} 
} °
ÄC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalHistoryEntryService\Dto\CreateMedicalHistoryEntryRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '&
MedicalHistoryEntryService' A
.A B
DtoB E
{ 
public 

class ,
 CreateMedicalHistoryEntryRequest 1
{ 
public 
string 
? 
	ICD10Code  
{! "
get# &
;& '
set( +
;+ ,
}- .
=/ 0
string1 7
.7 8
Empty8 =
;= >
public

 
string

 
	Diagnosis

 
{

  !
get

" %
;

% &
set

' *
;

* +
}

, -
=

. /
string

0 6
.

6 7
Empty

7 <
;

< =
public 
int 
Year 
{ 
get 
; 
set "
;" #
}$ %
public 
ConditionStatus 
Status %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
string 
? 
Comment 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
EntryBy 
EntryBy 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
} Û
{C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\MedicalHistoryEntryService\Dto\MedicalHistoryEntryResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '&
MedicalHistoryEntryService' A
.A B
DtoB E
{ 
public 

class '
MedicalHistoryEntryResponse ,
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public

 
int

 
	PatientId

 
{

 
get

 "
;

" #
set

$ '
;

' (
}

) *
public 
string 
? 
	ICD10Code  
{! "
get# &
;& '
set( +
;+ ,
}- .
=/ 0
string1 7
.7 8
Empty8 =
;= >
public 
string 
	Diagnosis 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public 
int 
Year 
{ 
get 
; 
set "
;" #
}$ %
public 
ConditionStatus 
Status %
{& '
get( +
;+ ,
set- 0
;0 1
}2 3
public 
string 
? 
Comment 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
EntryBy 
EntryBy 
{  
get! $
;$ %
set& )
;) *
}+ ,
public 
string 
? 
AiExplanation $
{% &
get' *
;* +
set, /
;/ 0
}1 2
} 
} ≤"
nC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\KnownMedicationService\KnownMedicationService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
{ 
public 

class "
KnownMedicationService '
:( )#
IKnownMedicationService* A
{ 
private		 
readonly		 &
IKnownMedicationRepository		 3
_repository		4 ?
;		? @
public "
KnownMedicationService %
(% &&
IKnownMedicationRepository& @

repositoryA K
)K L
{ 	
_repository 
= 

repository $
;$ %
} 	
public 
async 
Task 
< 
IEnumerable %
<% &
KnownMedication& 5
>5 6
>6 7
SearchAsync8 C
(C D
stringD J
queryK P
)P Q
{ 	
if 
( 
string 
. 
IsNullOrWhiteSpace )
() *
query* /
)/ 0
||1 3
query4 9
.9 :
Length: @
<A B
$numC D
)D E
return 
new 
List 
<  
KnownMedication  /
>/ 0
(0 1
)1 2
;2 3
return 
await 
_repository $
.$ %
SearchAsync% 0
(0 1
query1 6
)6 7
;7 8
} 	
public 
async 
Task 
RebuildFromCsvAsync -
(- .
string. 4
csvPath5 <
)< =
{ 	
await 
_repository 
. 
RebuildFromCsvAsync 1
(1 2
csvPath2 9
)9 :
;: ;
} 	
public 
async 
Task 
< 
KnownMedication )
?) *
>* +
IdentifyAsync, 9
(9 :
string: @
?@ A
brandB G
,G H
stringI O
?O P
productNameQ \
,\ ]
string^ d
?d e
activeIngredientf v
,v w
stringx ~
?~ 
dosage
Ä Ü
,
Ü á
string
à é
?
é è
form
ê î
)
î ï
{ 	
if 
( 
string 
. 
IsNullOrWhiteSpace )
() *
brand* /
)/ 0
&&1 3
string   
.   
IsNullOrWhiteSpace   )
(  ) *
activeIngredient  * :
)  : ;
&&  < >
string!! 
.!! 
IsNullOrWhiteSpace!! )
(!!) *
dosage!!* 0
)!!0 1
)!!1 2
{"" 
return## 
null## 
;## 
}$$ 
Console&& 
.&& 
	WriteLine&& 
(&& 
$"&&  
$str&&  7
{&&7 8
brand&&8 =
}&&= >
$str&&> M
{&&M N
productName&&N Y
}&&Y Z
$str&&Z n
{&&n o
activeIngredient&&o 
}	&& Ä
$str
&&Ä ä
{
&&ä ã
dosage
&&ã ë
}
&&ë í
$str
&&í ö
{
&&ö õ
form
&&õ ü
}
&&ü †
"
&&† °
)
&&° ¢
;
&&¢ £
var(( 

candidates(( 
=(( 
await(( "
_repository((# .
.((. /
IdentifyAsync((/ <
(((< =
brand((= B
,((B C
productName((D O
,((O P
activeIngredient((Q a
,((a b
dosage((c i
,((i j
form((k o
)((o p
;((p q
Console** 
.** 
	WriteLine** 
(** 
$"**  
$str**  )
{**) *

candidates*** 4
.**4 5
Count**5 :
(**: ;
)**; <
}**< =
"**= >
)**> ?
;**? @
return,, 

candidates,, 
.,, 
FirstOrDefault,, ,
(,,, -
),,- .
;,,. /
}-- 	
}.. 
}// Ú	
oC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\KnownMedicationService\IKnownMedicationService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
{ 
public 

	interface #
IKnownMedicationService ,
{ 
Task 
< 
IEnumerable 
< 
KnownMedication (
>( )
>) *
SearchAsync+ 6
(6 7
string7 =
query> C
)C D
;D E
Task		 
RebuildFromCsvAsync		  
(		  !
string		! '
csvPath		( /
)		/ 0
;		0 1
Task 
< 
KnownMedication 
? 
> 
IdentifyAsync ,
(, -
string- 3
?3 4
brand5 :
,: ;
string< B
?B C
productNameD O
,O P
stringQ W
?W X
activeIngredientY i
,i j
stringk q
?q r
dosages y
,y z
string	{ Å
?
Å Ç
form
É á
)
á à
;
à â
} 
} §
cC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\HealthTipService\IHealthTipService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
HealthTipService' 7
{ 
public 

	interface 
IHealthTipService &
{ 
ServiceResult 
< 
string 
> 
GetTodayHealthTip /
(/ 0
)0 1
;1 2
} 
}		 ˜
bC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\HealthTipService\HealthTipService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
HealthTipService' 7
{ 
public 

class 
HealthTipService !
:" #
IHealthTipService$ 5
{ 
private 
static 
readonly 
string  &
[& '
]' (

_healtTips) 3
=4 5
new6 9
[9 :
]: ;
{ 
$str		 7
,		7 8
$str

 ,
,

, -
$str 5
,5 6
$str ?
,? @
$str A
,A B
$str ,
} 	
;	 

public 
ServiceResult 
< 
string #
># $
GetTodayHealthTip% 6
(6 7
)7 8
{ 	
int 
seed 
= 
DateTime 
.  
Today  %
.% &
Year& *
*+ ,
$num- 1
+2 3
DateTime4 <
.< =
Today= B
.B C
	DayOfYearC L
;L M
var 
random 
= 
new 
Random #
(# $
seed$ (
)( )
;) *
int 
index 
= 
random 
. 
Next #
(# $

_healtTips$ .
.. /
Length/ 5
)5 6
;6 7
string 
tip 
= 

_healtTips #
[# $
index$ )
]) *
;* +
return 
ServiceResult  
<  !
string! '
>' (
.( )
Success) 0
(0 1
tip1 4
)4 5
;5 6
} 	
} 
} á
uC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\FamilyHistoryEntryService\IFamilyHistoryEntryService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
FamilyHistoryService' ;
{ 
public 

	interface &
IFamilyHistoryEntryService /
{ 
Task 
< 
ServiceResult 
< 
IEnumerable &
<& '&
FamilyHistoryEntryResponse' A
>A B
>B C
>C D
GetAllAsyncE P
(P Q
intQ T
	patientIdU ^
,^ _
string` f
?f g
userIdh n
)n o
;o p
Task

 
<

 
ServiceResult

 
<

 &
FamilyHistoryEntryResponse

 5
>

5 6
>

6 7
GetByIdAsync

8 D
(

D E
int

E H 
familyHistoryEntryId

I ]
,

] ^
string

_ e
?

e f
userId

g m
)

m n
;

n o
Task 
< 
ServiceResult 
< &
FamilyHistoryEntryResponse 5
>5 6
>6 7
CreateAsync8 C
(C D
intD G
	patientIdH Q
,Q R+
CreateFamilyHistoryEntryRequestS r
requests z
,z {
string	| Ç
?
Ç É
userId
Ñ ä
)
ä ã
;
ã å
Task 
< 
ServiceResult 
< &
FamilyHistoryEntryResponse 5
>5 6
>6 7
UpdateAsync8 C
(C D
intD G
	patientIdH Q
,Q R
intS V 
familyHistoryEntryIdW k
,k l,
UpdateFamilyHistoryEntryRequest	m å
request
ç î
,
î ï
string
ñ ú
?
ú ù
userId
û §
)
§ •
;
• ¶
Task 
< 
ServiceResult 
> 
DeleteAsync '
(' (
int( + 
familyHistoryEntryId, @
,@ A
stringB H
?H I
userIdJ P
)P Q
;Q R
} 
} ÷n
tC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\FamilyHistoryEntryService\FamilyHistoryEntryService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
FamilyHistoryService' ;
{		 
public

 

class

 %
FamilyHistoryEntryService

 *
:

+ ,&
IFamilyHistoryEntryService

- G
{ 
private )
IFamilyHistoryEntryRepository -)
_familyHistoryEntryRepository. K
;K L
private 
IPatientRepository "
_patientRepository# 5
;5 6
private 
	DtoMapper 
_mapper !
;! "
public %
FamilyHistoryEntryService (
(( ))
IFamilyHistoryEntryRepository) F(
familyHistoryEntryRepositoryG c
,c d
IPatientRepositorye w
patientRepository	x â
,
â ä
	DtoMapper
ã î
mapper
ï õ
)
õ ú
{ 	)
_familyHistoryEntryRepository )
=* +(
familyHistoryEntryRepository, H
;H I
_patientRepository 
=  
patientRepository! 2
;2 3
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
IEnumerable( 3
<3 4&
FamilyHistoryEntryResponse4 N
>N O
>O P
>P Q
GetAllAsyncR ]
(] ^
int^ a
	patientIdb k
,k l
stringm s
?s t
userIdu {
){ |
{ 	
var 
patient 
= 
await 
_patientRepository  2
.2 3
FindByIdAsync3 @
(@ A
	patientIdA J
)J K
;K L
if 
( 
patient 
== 
null 
)  
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1&
FamilyHistoryEntryResponse1 K
>K L
>L M
.M N
NotFoundN V
(V W
$"W Y
$strY a
{a b
	patientIdb k
}k l
$strl }
"} ~
)~ 
;	 Ä
if 
( 
userId 
!= 
null 
&& !
patient" )
.) *
UserId* 0
!=1 3
userId4 :
): ;
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1&
FamilyHistoryEntryResponse1 K
>K L
>L M
.M N
	ForbiddenN W
(W X
$strX |
)| }
;} ~
var!! 
entries!! 
=!! 
await!! )
_familyHistoryEntryRepository!!  =
.!!= >#
FindAllByPatientIdAsync!!> U
(!!U V
	patientId!!V _
)!!_ `
;!!` a
return"" 
ServiceResult""  
<""  !
IEnumerable""! ,
<"", -&
FamilyHistoryEntryResponse""- G
>""G H
>""H I
.""I J
Success""J Q
(""Q R
entries## 
.## 
Select## 
(## 
e##  
=>##! #
_mapper##$ +
.##+ ,(
ToFamilyHistoryEntryResponse##, H
(##H I
e##I J
)##J K
)##K L
)$$ 
;$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 
ServiceResult'' '
<''' (&
FamilyHistoryEntryResponse''( B
>''B C
>''C D
GetByIdAsync''E Q
(''Q R
int''R U 
familyHistoryEntryId''V j
,''j k
string''l r
?''r s
userId''t z
)''z {
{(( 	
var)) 
familyHistoryEntry)) "
=))# $
await))% *)
_familyHistoryEntryRepository))+ H
.))H I
FindByIdAsync))I V
())V W 
familyHistoryEntryId))W k
)))k l
;))l m
if++ 
(++ 
familyHistoryEntry++ "
==++# %
null++& *
)++* +
return,, 
ServiceResult,, $
<,,$ %&
FamilyHistoryEntryResponse,,% ?
>,,? @
.,,@ A
NotFound,,A I
(,,I J
$",,J L
$str,,L _
{,,_ ` 
familyHistoryEntryId,,` t
},,t u
$str	,,u Ö
"
,,Ö Ü
)
,,Ü á
;
,,á à
var.. 
patient.. 
=.. 
await.. 
_patientRepository..  2
...2 3
FindByIdAsync..3 @
(..@ A
familyHistoryEntry..A S
...S T
	PatientId..T ]
)..] ^
;..^ _
if00 
(00 
userId00 
!=00 
null00 
&&00 !
(00" #
patient00# *
==00+ -
null00. 2
||003 5
patient006 =
.00= >
UserId00> D
!=00E G
userId00H N
)00N O
)00O P
return11 
ServiceResult11 $
<11$ %&
FamilyHistoryEntryResponse11% ?
>11? @
.11@ A
	Forbidden11A J
(11J K
$str11K m
)11m n
;11n o
return33 
ServiceResult33  
<33  !&
FamilyHistoryEntryResponse33! ;
>33; <
.33< =
Success33= D
(33D E
_mapper33E L
.33L M(
ToFamilyHistoryEntryResponse33M i
(33i j
familyHistoryEntry33j |
)33| }
)33} ~
;33~ 
}44 	
public66 
async66 
Task66 
<66 
ServiceResult66 '
<66' (&
FamilyHistoryEntryResponse66( B
>66B C
>66C D
CreateAsync66E P
(66P Q
int66Q T
	patientId66U ^
,66^ _+
CreateFamilyHistoryEntryRequest66` 
request
66Ä á
,
66á à
string
66â è
?
66è ê
userId
66ë ó
)
66ó ò
{77 	
var88 
patient88 
=88 
await88 
_patientRepository88  2
.882 3
FindByIdAsync883 @
(88@ A
	patientId88A J
)88J K
;88K L
if:: 
(:: 
patient:: 
==:: 
null:: 
)::  
return;; 
ServiceResult;; $
<;;$ %&
FamilyHistoryEntryResponse;;% ?
>;;? @
.;;@ A
NotFound;;A I
(;;I J
$";;J L
$str;;L T
{;;T U
	patientId;;U ^
};;^ _
$str;;_ p
";;p q
);;q r
;;;r s
if== 
(== 
userId== 
!=== 
null== 
&&== !
patient==" )
.==) *
UserId==* 0
!===1 3
userId==4 :
)==: ;
return>> 
ServiceResult>> $
<>>$ %&
FamilyHistoryEntryResponse>>% ?
>>>? @
.>>@ A
	Forbidden>>A J
(>>J K
$str>>K o
)>>o p
;>>p q
var@@ 
familyHistoryEntry@@ "
=@@# $
new@@% (
FamilyHistoryEntry@@) ;
{AA 
	PatientIdBB 
=BB 
	patientIdBB %
,BB% &
RelativeCC 
=CC 
requestCC "
.CC" #
RelativeCC# +
,CC+ ,
	DiagnosisDD 
=DD 
requestDD #
.DD# $
	DiagnosisDD$ -
,DD- .
CommentEE 
=EE 
requestEE !
.EE! "
CommentEE" )
}FF 
;FF 
varHH !
newFamilyHistoryEntryHH %
=HH& '
awaitHH( -)
_familyHistoryEntryRepositoryHH. K
.HHK L
AddAsyncHHL T
(HHT U
familyHistoryEntryHHU g
)HHg h
;HHh i
returnII 
ServiceResultII  
<II  !&
FamilyHistoryEntryResponseII! ;
>II; <
.II< =
SuccessII= D
(IID E
_mapperIIE L
.IIL M(
ToFamilyHistoryEntryResponseIIM i
(IIi j!
newFamilyHistoryEntryIIj 
)	II Ä
)
IIÄ Å
;
IIÅ Ç
}JJ 	
publicLL 
asyncLL 
TaskLL 
<LL 
ServiceResultLL '
<LL' (&
FamilyHistoryEntryResponseLL( B
>LLB C
>LLC D
UpdateAsyncLLE P
(LLP Q
intLLQ T
	patientIdLLU ^
,LL^ _
intLL` c 
familyHistoryEntryIdLLd x
,LLx y,
UpdateFamilyHistoryEntryRequest	LLz ô
request
LLö °
,
LL° ¢
string
LL£ ©
?
LL© ™
userId
LL´ ±
)
LL± ≤
{MM 	
varNN 
patientNN 
=NN 
awaitNN 
_patientRepositoryNN  2
.NN2 3
FindByIdAsyncNN3 @
(NN@ A
	patientIdNNA J
)NNJ K
;NNK L
ifPP 
(PP 
patientPP 
==PP 
nullPP 
)PP  
returnQQ 
ServiceResultQQ $
<QQ$ %&
FamilyHistoryEntryResponseQQ% ?
>QQ? @
.QQ@ A
NotFoundQQA I
(QQI J
$"QQJ L
$strQQL T
{QQT U
	patientIdQQU ^
}QQ^ _
$strQQ_ p
"QQp q
)QQq r
;QQr s
ifSS 
(SS 
userIdSS 
!=SS 
nullSS 
&&SS !
patientSS" )
.SS) *
UserIdSS* 0
!=SS1 3
userIdSS4 :
)SS: ;
returnTT 
ServiceResultTT $
<TT$ %&
FamilyHistoryEntryResponseTT% ?
>TT? @
.TT@ A
	ForbiddenTTA J
(TTJ K
$strTTK o
)TTo p
;TTp q
varVV &
existingFamilyHistoryEntryVV *
=VV+ ,
awaitVV- 2)
_familyHistoryEntryRepositoryVV3 P
.VVP Q
FindByIdAsyncVVQ ^
(VV^ _ 
familyHistoryEntryIdVV_ s
)VVs t
;VVt u
ifXX 
(XX &
existingFamilyHistoryEntryXX *
==XX+ -
nullXX. 2
||XX3 5&
existingFamilyHistoryEntryXX6 P
.XXP Q
	PatientIdXXQ Z
!=XX[ ]
	patientIdXX^ g
)XXg h
returnYY 
ServiceResultYY $
<YY$ %&
FamilyHistoryEntryResponseYY% ?
>YY? @
.YY@ A
NotFoundYYA I
(YYI J
$"YYJ L
$strYYL f
{YYf g 
familyHistoryEntryIdYYg {
}YY{ |
$str	YY| ç
"
YYç é
)
YYé è
;
YYè ê&
existingFamilyHistoryEntry[[ &
.[[& '
Relative[[' /
=[[0 1
request[[2 9
.[[9 :
Relative[[: B
;[[B C&
existingFamilyHistoryEntry\\ &
.\\& '
	Diagnosis\\' 0
=\\1 2
request\\3 :
.\\: ;
	Diagnosis\\; D
;\\D E&
existingFamilyHistoryEntry]] &
.]]& '
Comment]]' .
=]]/ 0
request]]1 8
.]]8 9
Comment]]9 @
;]]@ A
var__ %
updatedFamilyHistoryEntry__ )
=__* +
await__, 1)
_familyHistoryEntryRepository__2 O
.__O P
UpdateAsync__P [
(__[ \&
existingFamilyHistoryEntry__\ v
)__v w
;__w x
return`` 
ServiceResult``  
<``  !&
FamilyHistoryEntryResponse``! ;
>``; <
.``< =
Success``= D
(``D E
_mapper``E L
.``L M(
ToFamilyHistoryEntryResponse``M i
(``i j&
updatedFamilyHistoryEntry	``j É
)
``É Ñ
)
``Ñ Ö
;
``Ö Ü
}aa 	
publiccc 
asynccc 
Taskcc 
<cc 
ServiceResultcc '
>cc' (
DeleteAsynccc) 4
(cc4 5
intcc5 8 
familyHistoryEntryIdcc9 M
,ccM N
stringccO U
?ccU V
userIdccW ]
)cc] ^
{dd 	
varee &
existingFamilyHistoryEntryee *
=ee+ ,
awaitee- 2)
_familyHistoryEntryRepositoryee3 P
.eeP Q
FindByIdAsynceeQ ^
(ee^ _ 
familyHistoryEntryIdee_ s
)ees t
;eet u
ifgg 
(gg &
existingFamilyHistoryEntrygg *
==gg+ -
nullgg. 2
)gg2 3
returnhh 
ServiceResulthh $
.hh$ %
NotFoundhh% -
(hh- .
$"hh. 0
$strhh0 J
{hhJ K 
familyHistoryEntryIdhhK _
}hh_ `
$strhh` p
"hhp q
)hhq r
;hhr s
varjj 
patientjj 
=jj 
awaitjj 
_patientRepositoryjj  2
.jj2 3
FindByIdAsyncjj3 @
(jj@ A&
existingFamilyHistoryEntryjjA [
.jj[ \
	PatientIdjj\ e
)jje f
;jjf g
ifll 
(ll 
userIdll 
!=ll 
nullll 
&&ll !
(ll" #
patientll# *
==ll+ -
nullll. 2
||ll3 5
patientll6 =
.ll= >
UserIdll> D
!=llE G
userIdllH N
)llN O
)llO P
returnmm 
ServiceResultmm $
.mm$ %
	Forbiddenmm% .
(mm. /
$strmm/ Q
)mmQ R
;mmR S
awaitoo )
_familyHistoryEntryRepositoryoo /
.oo/ 0
DeleteAsyncoo0 ;
(oo; <&
existingFamilyHistoryEntryoo< V
)ooV W
;ooW X
returnpp 
ServiceResultpp  
.pp  !
Successpp! (
(pp( )
)pp) *
;pp* +
}qq 	
}rr 
}ss ﬂ
~C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\FamilyHistoryEntryService\Dto\UpdateFamilyHistoryEntryRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
FamilyHistoryService' ;
.; <
Dto< ?
{ 
public 

class +
UpdateFamilyHistoryEntryRequest 0
{ 
public 
string 
Relative 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
string 
	Diagnosis 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public		 
string		 
?		 
Comment		 
{		  
get		! $
;		$ %
set		& )
;		) *
}		+ ,
}

 
} Ç
yC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\FamilyHistoryEntryService\Dto\FamilyHistoryEntryResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
FamilyHistoryService' ;
.; <
Dto< ?
{ 
public 

class &
FamilyHistoryEntryResponse +
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
public		 
string		 
Relative		 
{		  
get		! $
;		$ %
set		& )
;		) *
}		+ ,
=		- .
string		/ 5
.		5 6
Empty		6 ;
;		; <
public 
string 
	Diagnosis 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public 
string 
? 
Comment 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
} ﬂ
~C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\FamilyHistoryEntryService\Dto\CreateFamilyHistoryEntryRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& ' 
FamilyHistoryService' ;
.; <
Dto< ?
{ 
public 

class +
CreateFamilyHistoryEntryRequest 0
{ 
public 
string 
Relative 
{  
get! $
;$ %
set& )
;) *
}+ ,
=- .
string/ 5
.5 6
Empty6 ;
;; <
public 
string 
	Diagnosis 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public		 
string		 
?		 
Comment		 
{		  
get		! $
;		$ %
set		& )
;		) *
}		+ ,
}

 
} ¥
oC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DrugInteractionService\IDrugInteractionService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '"
DrugInteractionService' =
{ 
public 

	interface #
IDrugInteractionService ,
{ 
Task 
< 
ServiceResult 
< 
List 
<  
string  &
>& '
>' (
>( )"
CheckInteractionsAsync* @
(@ A
stringA G

newAtcCodeH R
,R S
ListT X
<X Y
stringY _
>_ `
existingAtcCodesa q
)q r
;r s
Task 
< 
ServiceResult 
< 
bool 
>  
>  !
ImportDrugDataAsync" 5
(5 6
string6 <
xmlFilePath= H
)H I
;I J
}		 
}

 ¯
mC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DrugInteractionService\Dto\MedicationRiskDto.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '"
DrugInteractionService' =
.= >
Dto> A
{ 
public 

class 
MedicationRiskDto "
{ 
public 
List 
< 
string 
> 
Interactions (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
=7 8
new9 <
List= A
<A B
stringB H
>H I
(I J
)J K
;K L
public 
List 
< 
string 
> 
SideEffects '
{( )
get* -
;- .
set/ 2
;2 3
}4 5
=6 7
new8 ;
List< @
<@ A
stringA G
>G H
(H I
)I J
;J K
} 
} ≠ä
nC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DrugInteractionService\DrugInteractionService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '"
DrugInteractionService' =
{ 
public		 

class		 "
DrugInteractionService		 '
:		' (#
IDrugInteractionService		( ?
{

 
private 
static 
readonly 
TimeSpan  ($
TranslationCacheDuration) A
=B C
TimeSpanD L
.L M
	FromHoursM V
(V W
$numW Y
)Y Z
;Z [
private 
readonly &
IDrugInteractionRepository 3"
_interactionRepository4 J
;J K
private 
readonly 
IMemoryCache %
_cache& ,
;, -
private 
readonly 
AggregateTranslator ,
_translator- 8
=9 :
new; >
AggregateTranslator? R
(R S
)S T
;T U
public "
DrugInteractionService %
(% &&
IDrugInteractionRepository& @!
interactionRepositoryA V
,V W
IMemoryCacheX d
cachee j
)j k
{ 	"
_interactionRepository "
=# $!
interactionRepository% :
;: ;
_cache 
= 
cache 
; 
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
List( ,
<, -
string- 3
>3 4
>4 5
>5 6"
CheckInteractionsAsync7 M
(M N
stringN T

newAtcCodeU _
,_ `
Lista e
<e f
stringf l
>l m
existingAtcCodesn ~
)~ 
{ 	
try 
{ 
var 
warnings 
= 
new "
List# '
<' (
string( .
>. /
(/ 0
)0 1
;1 2
if 
( 
string 
. 
IsNullOrWhiteSpace -
(- .

newAtcCode. 8
)8 9
)9 :
{ 
return 
ServiceResult (
<( )
List) -
<- .
string. 4
>4 5
>5 6
.6 7
Invalid7 >
(> ?
$str? k
)k l
;l m
}   
if"" 
("" 
existingAtcCodes"" $
==""% '
null""( ,
||""- /
!""0 1
existingAtcCodes""1 A
.""A B
Any""B E
(""E F
)""F G
)""G H
{## 
return$$ 
ServiceResult$$ (
<$$( )
List$$) -
<$$- .
string$$. 4
>$$4 5
>$$5 6
.$$6 7
Invalid$$7 >
($$> ?
$str$$? h
)$$h i
;$$i j
}%% 
var'' 
newDrugBankId'' !
=''" #
await''$ )"
_interactionRepository''* @
.''@ A'
GetDrugBankIdByAtcCodeAsync''A \
(''\ ]

newAtcCode''] g
)''g h
;''h i
if(( 
((( 
string(( 
.(( 
IsNullOrEmpty(( (
(((( )
newDrugBankId(() 6
)((6 7
)((7 8
{)) 
return** 
ServiceResult** (
<**( )
List**) -
<**- .
string**. 4
>**4 5
>**5 6
.**6 7
NotFound**7 ?
(**? @
$str**@ s
)**s t
;**t u
}++ 
var-- 
existingDrugBankIds-- '
=--( )
await--* /"
_interactionRepository--0 F
.--F G)
GetDrugBankIdsByAtcCodesAsync--G d
(--d e
existingAtcCodes--e u
)--u v
;--v w
if.. 
(.. 
!.. 
existingDrugBankIds.. (
...( )
Any..) ,
(.., -
)..- .
)... /
{// 
return00 
ServiceResult00 (
<00( )
List00) -
<00- .
string00. 4
>004 5
>005 6
.006 7
NotFound007 ?
(00? @
$str00@ |
)00| }
;00} ~
}11 
var33 
interactions33  
=33! "
await33# ("
_interactionRepository33) ?
.33? @ 
GetInteractionsAsync33@ T
(33T U
newDrugBankId33U b
,33b c
existingDrugBankIds33d w
)33w x
;33x y
var55 
uniqueInteractions55 &
=55' (
interactions55) 5
.66 
GroupBy66 
(66 
i66 
=>66 !
new66" %
{66& '
i66( )
.66) *

TargetName66* 4
,664 5
i666 7
.667 8
Description668 C
}66D E
)66E F
.77 
Select77 
(77 
g77 
=>77  
g77! "
.77" #
First77# (
(77( )
)77) *
)77* +
;77+ ,
foreach99 
(99 
var99 
interaction99 (
in99) +
uniqueInteractions99, >
)99> ?
{:: 
var;; 
finalDescription;; (
=;;) *
await;;+ 0
TranslateSafeAsync;;1 C
(;;C D
interaction;;D O
.;;O P
Description;;P [
);;[ \
;;;\ ]
warnings<< 
.<< 
Add<<  
(<<  !
$"<<! #
$str<<# @
{<<@ A
interaction<<A L
.<<L M

TargetName<<M W
}<<W X
$str<<X Z
{<<Z [
finalDescription<<[ k
}<<k l
"<<l m
)<<m n
;<<n o
}== 
return?? 
ServiceResult?? $
<??$ %
List??% )
<??) *
string??* 0
>??0 1
>??1 2
.??2 3
Success??3 :
(??: ;
warnings??; C
)??C D
;??D E
}@@ 
catchAA 
(AA 
	ExceptionAA 
exAA 
)AA  
{BB 
returnCC 
ServiceResultCC $
<CC$ %
ListCC% )
<CC) *
stringCC* 0
>CC0 1
>CC1 2
.CC2 3
InternalServerErrorCC3 F
(CCF G
$"CCG I
$strCCI p
{CCp q
exCCq s
.CCs t
MessageCCt {
}CC{ |
"CC| }
)CC} ~
;CC~ 
}DD 
}EE 	
publicGG 
asyncGG 
TaskGG 
<GG 
ServiceResultGG '
<GG' (
boolGG( ,
>GG, -
>GG- .
ImportDrugDataAsyncGG/ B
(GGB C
stringGGC I
xmlFilePathGGJ U
)GGU V
{HH 	
tryII 
{JJ 
ifKK 
(KK 
!KK 
FileKK 
.KK 
ExistsKK  
(KK  !
xmlFilePathKK! ,
)KK, -
)KK- .
{LL 
returnMM 
ServiceResultMM (
<MM( )
boolMM) -
>MM- .
.MM. /
NotFoundMM/ 7
(MM7 8
$strMM8 h
)MMh i
;MMi j
}NN 
awaitPP 
TaskPP 
.PP 
RunPP 
(PP 
asyncPP $
(PP% &
)PP& '
=>PP( *
{QQ 
awaitRR "
_interactionRepositoryRR 0
.RR0 1
RebuildFromXmlAsyncRR1 D
(RRD E
xmlFilePathRRE P
)RRP Q
;RRQ R
}SS 
)SS 
;SS 
returnUU 
ServiceResultUU $
<UU$ %
boolUU% )
>UU) *
.UU* +
SuccessUU+ 2
(UU2 3
trueUU3 7
)UU7 8
;UU8 9
}VV 
catchWW 
(WW 
	ExceptionWW 
exWW 
)WW  
{XX 
returnYY 
ServiceResultYY $
<YY$ %
boolYY% )
>YY) *
.YY* +
InternalServerErrorYY+ >
(YY> ?
$"YY? A
$strYYA p
{YYp q
exYYq s
.YYs t
MessageYYt {
}YY{ |
"YY| }
)YY} ~
;YY~ 
}ZZ 
}[[ 	
public]] 
async]] 
Task]] 
<]] 
ServiceResult]] '
<]]' (
MedicationRiskDto]]( 9
>]]9 :
>]]: ;#
GetAllPatientRisksAsync]]< S
(]]S T
List]]T X
<]]X Y
string]]Y _
>]]_ `
currentAtcCodes]]a p
)]]p q
{^^ 	
try__ 
{`` 
ifaa 
(aa 
currentAtcCodesaa #
==aa$ &
nullaa' +
||aa, .
!aa/ 0
currentAtcCodesaa0 ?
.aa? @
Anyaa@ C
(aaC D
)aaD E
)aaE F
{bb 
returncc 
ServiceResultcc (
<cc( )
MedicationRiskDtocc) :
>cc: ;
.cc; <
Successcc< C
(ccC D
newccD G
MedicationRiskDtoccH Y
(ccY Z
)ccZ [
)cc[ \
;cc\ ]
}dd 
varff 
	resultDtoff 
=ff 
newff  #
MedicationRiskDtoff$ 5
(ff5 6
)ff6 7
;ff7 8
varhh 
drugBankIdshh 
=hh  !
awaithh" '"
_interactionRepositoryhh( >
.hh> ?)
GetDrugBankIdsByAtcCodesAsynchh? \
(hh\ ]
currentAtcCodeshh] l
)hhl m
;hhm n
ifii 
(ii 
!ii 
drugBankIdsii  
.ii  !
Anyii! $
(ii$ %
)ii% &
)ii& '
{jj 
returnkk 
ServiceResultkk (
<kk( )
MedicationRiskDtokk) :
>kk: ;
.kk; <
Successkk< C
(kkC D
	resultDtokkD M
)kkM N
;kkN O
}ll 
varnn 
interactionsnn  
=nn! "
awaitnn# ("
_interactionRepositorynn) ?
.nn? @%
GetInteractionsAmongAsyncnn@ Y
(nnY Z
drugBankIdsnnZ e
)nne f
;nnf g
varpp 
uniqueInteractionspp &
=pp' (
interactionspp) 5
.qq 
GroupByqq 
(qq 
iqq 
=>qq !
newqq" %
{qq& '
iqq( )
.qq) *

TargetNameqq* 4
,qq4 5
iqq6 7
.qq7 8
Descriptionqq8 C
}qqD E
)qqE F
.rr 
Selectrr 
(rr 
grr 
=>rr  
grr! "
.rr" #
Firstrr# (
(rr( )
)rr) *
)rr* +
;rr+ ,
foreachtt 
(tt 
vartt 
interactiontt (
intt) +
uniqueInteractionstt, >
)tt> ?
{uu 
varvv 
translatedDescvv &
=vv' (
awaitvv) .
TranslateSafeAsyncvv/ A
(vvA B
interactionvvB M
.vvM N
DescriptionvvN Y
)vvY Z
;vvZ [
	resultDtoww 
.ww 
Interactionsww *
.ww* +
Addww+ .
(ww. /
$"ww/ 1
$strww1 F
{wwF G
interactionwwG R
.wwR S

TargetNamewwS ]
}ww] ^
$strww^ `
{ww` a
translatedDescwwa o
}wwo p
"wwp q
)wwq r
;wwr s
}xx 
varzz 
drugDetailszz 
=zz  !
awaitzz" '"
_interactionRepositoryzz( >
.zz> ?
GetDrugDetailsAsynczz? R
(zzR S
drugBankIdszzS ^
)zz^ _
;zz_ `
foreach|| 
(|| 
var|| 
detail|| #
in||$ &
drugDetails||' 2
)||2 3
{}} 
var~~ 
combinedInfo~~ $
=~~% &
new~~' *
System~~+ 1
.~~1 2
Text~~2 6
.~~6 7
StringBuilder~~7 D
(~~D E
)~~E F
;~~F G
if
ÄÄ 
(
ÄÄ 
!
ÄÄ 
string
ÄÄ 
.
ÄÄ   
IsNullOrWhiteSpace
ÄÄ  2
(
ÄÄ2 3
detail
ÄÄ3 9
.
ÄÄ9 :
Toxicity
ÄÄ: B
)
ÄÄB C
)
ÄÄC D
{
ÅÅ 
var
ÇÇ 
translatedTox
ÇÇ )
=
ÇÇ* +
await
ÇÇ, 1 
TranslateSafeAsync
ÇÇ2 D
(
ÇÇD E
detail
ÇÇE K
.
ÇÇK L
Toxicity
ÇÇL T
)
ÇÇT U
;
ÇÇU V
combinedInfo
ÉÉ $
.
ÉÉ$ %

AppendLine
ÉÉ% /
(
ÉÉ/ 0
$"
ÉÉ0 2
$str
ÉÉ2 L
{
ÉÉL M
translatedTox
ÉÉM Z
}
ÉÉZ [
"
ÉÉ[ \
)
ÉÉ\ ]
;
ÉÉ] ^
}
ÑÑ 
if
ÜÜ 
(
ÜÜ 
!
ÜÜ 
string
ÜÜ 
.
ÜÜ   
IsNullOrWhiteSpace
ÜÜ  2
(
ÜÜ2 3
detail
ÜÜ3 9
.
ÜÜ9 :
Pharmacodynamics
ÜÜ: J
)
ÜÜJ K
)
ÜÜK L
{
áá 
var
àà 
translatedPharma
àà ,
=
àà- .
await
àà/ 4 
TranslateSafeAsync
àà5 G
(
ààG H
detail
ààH N
.
ààN O
Pharmacodynamics
ààO _
)
àà_ `
;
àà` a
combinedInfo
ââ $
.
ââ$ %

AppendLine
ââ% /
(
ââ/ 0
$"
ââ0 2
$str
ââ2 @
{
ââ@ A
translatedPharma
ââA Q
}
ââQ R
"
ââR S
)
ââS T
;
ââT U
}
ää 
if
åå 
(
åå 
combinedInfo
åå $
.
åå$ %
Length
åå% +
>
åå, -
$num
åå. /
)
åå/ 0
{
çç 
	resultDto
éé !
.
éé! "
SideEffects
éé" -
.
éé- .
Add
éé. 1
(
éé1 2
$"
éé2 4
$str
éé4 J
{
ééJ K
detail
ééK Q
.
ééQ R

DrugBankId
ééR \
}
éé\ ]
$str
éé] a
{
ééa b
combinedInfo
ééb n
.
één o
ToString
ééo w
(
ééw x
)
ééx y
.
ééy z
Trim
ééz ~
(
éé~ 
)éé Ä
}ééÄ Å
"ééÅ Ç
)ééÇ É
;ééÉ Ñ
}
èè 
}
êê 
return
íí 
ServiceResult
íí $
<
íí$ %
MedicationRiskDto
íí% 6
>
íí6 7
.
íí7 8
Success
íí8 ?
(
íí? @
	resultDto
íí@ I
)
ííI J
;
ííJ K
}
ìì 
catch
îî 
(
îî 
	Exception
îî 
ex
îî 
)
îî  
{
ïï 
return
ññ 
ServiceResult
ññ $
<
ññ$ %
MedicationRiskDto
ññ% 6
>
ññ6 7
.
ññ7 8!
InternalServerError
ññ8 K
(
ññK L
$"
ññL N
$str
ññN o
{
ñño p
ex
ññp r
.
ññr s
Message
ññs z
}
ññz {
"
ññ{ |
)
ññ| }
;
ññ} ~
}
óó 
}
òò 	
private
öö 
async
öö 
Task
öö 
<
öö 
string
öö !
>
öö! " 
TranslateSafeAsync
öö# 5
(
öö5 6
string
öö6 <
?
öö< =
text
öö> B
)
ööB C
{
õõ 	
if
úú 
(
úú 
string
úú 
.
úú  
IsNullOrWhiteSpace
úú )
(
úú) *
text
úú* .
)
úú. /
)
úú/ 0
return
úú1 7
string
úú8 >
.
úú> ?
Empty
úú? D
;
úúD E
var
ûû 
cacheKey
ûû 
=
ûû 
$"
ûû 
$str
ûû /
{
ûû/ 0
text
ûû0 4
}
ûû4 5
"
ûû5 6
;
ûû6 7
if
üü 
(
üü 
_cache
üü 
.
üü 
TryGetValue
üü "
(
üü" #
cacheKey
üü# +
,
üü+ ,
out
üü- 0
string
üü1 7
?
üü7 8
cached
üü9 ?
)
üü? @
&&
üüA C
cached
üüD J
!=
üüK M
null
üüN R
)
üüR S
{
†† 
return
°° 
cached
°° 
;
°° 
}
¢¢ 
try
§§ 
{
•• 
var
¶¶ 
translationResult
¶¶ %
=
¶¶& '
await
¶¶( -
_translator
¶¶. 9
.
¶¶9 :
TranslateAsync
¶¶: H
(
¶¶H I
text
¶¶I M
,
¶¶M N
$str
¶¶O S
,
¶¶S T
$str
¶¶U Y
)
¶¶Y Z
;
¶¶Z [
_cache
®® 
.
®® 
Set
®® 
(
®® 
cacheKey
®® #
,
®®# $
translationResult
®®% 6
.
®®6 7
Translation
®®7 B
,
®®B C
new
®®D G%
MemoryCacheEntryOptions
®®H _
{
©© 
SlidingExpiration
™™ %
=
™™& '&
TranslationCacheDuration
™™( @
}
´´ 
)
´´ 
;
´´ 
return
¨¨ 
translationResult
¨¨ (
.
¨¨( )
Translation
¨¨) 4
;
¨¨4 5
}
≠≠ 
catch
ÆÆ 
{
ØØ 
return
∞∞ 
text
∞∞ 
;
∞∞ 
}
±± 
}
≤≤ 	
}
≥≥ 
}¥¥ ü
bC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DiagnosisService\IDiagnoseService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
DiagnosisService' 7
;7 8
public 
	interface 
IDiagnosisService "
{ 
Task 
< 	
ServiceResult	 
< 
DiagnosisResponse (
>( )
>) *
GetByIdAsync+ 7
(7 8
int8 ;
id< >
,> ?
string@ F
?F G
userIdH N
)N O
;O P
Task		 
<		 	
ServiceResult			 
<		 
IEnumerable		 "
<		" #
DiagnosisResponse		# 4
>		4 5
>		5 6
>		6 7
GetAllAsync		8 C
(		C D
int		D G
	patientId		H Q
,		Q R
string		S Y
?		Y Z
userId		[ a
)		a b
;		b c
Task

 
<

 	
ServiceResult

	 
<

 
DiagnosisResponse

 (
>

( )
>

) *
CreateAsync

+ 6
(

6 7
int

7 :
	patientId

; D
,

D E"
CreateDiagnosisRequest

F \
request

] d
,

d e
string

f l
?

l m
userId

n t
)

t u
;

u v
Task 
< 	
ServiceResult	 
< 
DiagnosisResponse (
>( )
>) *
UpdateAsync+ 6
(6 7
int7 :
	patientId; D
,D E
intF I
idJ L
,L M"
UpdateDiagnosisRequestN d
requeste l
,l m
stringn t
?t u
userIdv |
)| }
;} ~
Task 
< 	
ServiceResult	 
> 
DeleteAsync #
(# $
int$ '
id( *
,* +
string, 2
?2 3
userId4 :
): ;
;; <
Task 
< 	
ServiceResult	 
< 
DiagnosisResponse (
>( )
>) *
UpdateAiExplanation+ >
(> ?
int? B
diagnosisIdC N
,N O
stringP V
?V W
aiExplanationX e
)e f
;f g
} »
lC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DiagnosisService\Dto\UpdateDiagnosisRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
DiagnosisService' 7
.7 8
Dto8 ;
;; <
public 
class "
UpdateDiagnosisRequest #
{ 
[ 
	MaxLength 
( 
$num 
) 
] 
public		 

string		 
?		 
Title		 
{		 
get		 
;		 
set		  #
;		# $
}		% &
public 

string 
? 
Description 
{  
get! $
;$ %
set& )
;) *
}+ ,
[ 
	MaxLength 
( 
$num 
) 
] 
public 

string 
? 
IcdCode 
{ 
get  
;  !
set" %
;% &
}' (
public 

string 
? 
Severity 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
SideLocalization #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 

ConditionStatus 
? 
ConditionStatus +
{, -
get. 1
;1 2
set3 6
;6 7
}8 9
public 

EntryBy 
? 
EntryBy 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
MedicationText !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 

string 
? 
Symptoms 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
Findings 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
TherapeuticMeasures &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public   

string   
?   
Note   
{   
get   
;   
set   "
;  " #
}  $ %
public"" 

DateTime"" 
?"" 
DiagnosisDate"" "
{""# $
get""% (
;""( )
set""* -
;""- .
}""/ 0
}## „
gC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DiagnosisService\Dto\DiagnosisResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
DiagnosisService' 7
.7 8
Dto8 ;
;; <
public 
class 
DiagnosisResponse 
{ 
public 

int 
Id 
{ 
get 
; 
set 
; 
} 
public 

int 
	PatientId 
{ 
get 
; 
set  #
;# $
}% &
public		 

string		 
Title		 
{		 
get		 
;		 
set		 "
;		" #
}		$ %
=		& '
string		( .
.		. /
Empty		/ 4
;		4 5
public

 

string

 
?

 
Description

 
{

  
get

! $
;

$ %
set

& )
;

) *
}

+ ,
public 

string 
? 
IcdCode 
{ 
get  
;  !
set" %
;% &
}' (
public 

string 
? 
Severity 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
SideLocalization #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 

ConditionStatus 
ConditionStatus *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
public 

EntryBy 
EntryBy 
{ 
get  
;  !
set" %
;% &
}' (
public 

string 
? 
AiExplanation  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 

string 
? 

Disclaimer 
{ 
get  #
;# $
set% (
;( )
}* +
public 

string 
? 
MedicationText !
{" #
get$ '
;' (
set) ,
;, -
}. /
public 

string 
? 
Symptoms 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
Findings 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
TherapeuticMeasures &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 

string 
? 
Note 
{ 
get 
; 
set "
;" #
}$ %
public 

DateTime 
? 
DiagnosisDate "
{# $
get% (
;( )
set* -
;- .
}/ 0
public 

DateTime 
	CreatedAt 
{ 
get  #
;# $
set% (
;( )
}* +
public 

DateTime 
	UpdatedAt 
{ 
get  #
;# $
set% (
;( )
}* +
} ≠ù
bC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DiagnosisService\DiagnosisService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
DiagnosisService' 7
{		 
public

 

class

 
DiagnosisService

 !
:

" #
IDiagnosisService

$ 5
{ 
private 
readonly  
IDiagnosisRepository - 
_diagnosisRepository. B
;B C
private 
readonly 
IPatientRepository +
_patientRepository, >
;> ?
private 
readonly 
	DtoMapper "
_mapper# *
;* +
public 
DiagnosisService 
(   
IDiagnosisRepository  4
diagnosisRepository5 H
,H I
IPatientRepositoryJ \
patientRepository] n
,n o
	DtoMapperp y
mapper	z Ä
)
Ä Å
{ 	 
_diagnosisRepository  
=! "
diagnosisRepository# 6
;6 7
_patientRepository 
=  
patientRepository! 2
;2 3
_mapper 
= 
mapper 
; 
} 	
public 
async 
Task 
< 
ServiceResult '
<' (
IEnumerable( 3
<3 4
DiagnosisResponse4 E
>E F
>F G
>G H
GetAllAsyncI T
(T U
intU X
	patientIdY b
,b c
stringd j
?j k
userIdl r
)r s
{ 	
var 
patient 
= 
await 
_patientRepository  2
.2 3
FindByIdAsync3 @
(@ A
	patientIdA J
)J K
;K L
if 
( 
patient 
== 
null 
)  
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1
DiagnosisResponse1 B
>B C
>C D
.D E
NotFoundE M
(M N
$"N P
$strP X
{X Y
	patientIdY b
}b c
$strc t
"t u
)u v
;v w
if 
( 
userId 
!= 
null 
&& !
patient" )
.) *
UserId* 0
!=1 3
userId4 :
): ;
return 
ServiceResult $
<$ %
IEnumerable% 0
<0 1
DiagnosisResponse1 B
>B C
>C D
.D E
	ForbiddenE N
(N O
$strO s
)s t
;t u
var!! 
	diagnoses!! 
=!! 
await!! ! 
_diagnosisRepository!!" 6
.!!6 7#
FindAllByPatientIdAsync!!7 N
(!!N O
	patientId!!O X
)!!X Y
;!!Y Z
return"" 
ServiceResult""  
<""  !
IEnumerable""! ,
<"", -
DiagnosisResponse""- >
>""> ?
>""? @
.""@ A
Success""A H
(""H I
	diagnoses## 
.## 
Select##  
(##  !
d##! "
=>### %
_mapper##& -
.##- .
ToDiagnosisResponse##. A
(##A B
d##B C
)##C D
)##D E
)$$ 
;$$ 
}%% 	
public'' 
async'' 
Task'' 
<'' 
ServiceResult'' '
<''' (
DiagnosisResponse''( 9
>''9 :
>'': ;
GetByIdAsync''< H
(''H I
int''I L
diagnosisId''M X
,''X Y
string''Z `
?''` a
userId''b h
)''h i
{(( 	
var)) 
	diagnosis)) 
=)) 
await)) ! 
_diagnosisRepository))" 6
.))6 7
FindByIdAsync))7 D
())D E
diagnosisId))E P
)))P Q
;))Q R
if++ 
(++ 
	diagnosis++ 
==++ 
null++ !
)++! "
return,, 
ServiceResult,, $
<,,$ %
DiagnosisResponse,,% 6
>,,6 7
.,,7 8
NotFound,,8 @
(,,@ A
$",,A C
$str,,C L
{,,L M
diagnosisId,,M X
},,X Y
$str,,Y j
",,j k
),,k l
;,,l m
var.. 
patient.. 
=.. 
await.. 
_patientRepository..  2
...2 3
FindByIdAsync..3 @
(..@ A
	diagnosis..A J
...J K
	PatientId..K T
)..T U
;..U V
if00 
(00 
userId00 
!=00 
null00 
&&00 !
(00" #
patient00# *
==00+ -
null00. 2
||003 5
patient006 =
.00= >
UserId00> D
!=00E G
userId00H N
)00N O
)00O P
return11 
ServiceResult11 $
<11$ %
DiagnosisResponse11% 6
>116 7
.117 8
	Forbidden118 A
(11A B
$str11B d
)11d e
;11e f
return33 
ServiceResult33  
<33  !
DiagnosisResponse33! 2
>332 3
.333 4
Success334 ;
(33; <
_mapper33< C
.33C D
ToDiagnosisResponse33D W
(33W X
	diagnosis33X a
)33a b
)33b c
;33c d
}44 	
public66 
async66 
Task66 
<66 
ServiceResult66 '
<66' (
DiagnosisResponse66( 9
>669 :
>66: ;
CreateAsync66< G
(66G H
int66H K
	patientId66L U
,66U V"
CreateDiagnosisRequest66W m
request66n u
,66u v
string66w }
?66} ~
userId	66 Ö
)
66Ö Ü
{77 	
var88 
patient88 
=88 
await88 
_patientRepository88  2
.882 3
FindByIdAsync883 @
(88@ A
	patientId88A J
)88J K
;88K L
if:: 
(:: 
patient:: 
==:: 
null:: 
)::  
return;; 
ServiceResult;; $
<;;$ %
DiagnosisResponse;;% 6
>;;6 7
.;;7 8
NotFound;;8 @
(;;@ A
$";;A C
$str;;C K
{;;K L
request;;L S
.;;S T
	PatientId;;T ]
};;] ^
$str;;^ o
";;o p
);;p q
;;;q r
if== 
(== 
userId== 
!=== 
null== 
&&== !
patient==" )
.==) *
UserId==* 0
!===1 3
userId==4 :
)==: ;
return>> 
ServiceResult>> $
<>>$ %
DiagnosisResponse>>% 6
>>>6 7
.>>7 8
	Forbidden>>8 A
(>>A B
$str>>B f
)>>f g
;>>g h
var@@ 
	diagnosis@@ 
=@@ 
new@@ 
	Diagnosis@@  )
{AA 
	PatientIdBB 
=BB 
	patientIdBB %
,BB% &
TitleCC 
=CC 
requestCC 
.CC  
TitleCC  %
,CC% &
DescriptionDD 
=DD 
requestDD %
.DD% &
DescriptionDD& 1
??DD2 4
stringDD5 ;
.DD; <
EmptyDD< A
,DDA B
IcdCodeEE 
=EE 
requestEE !
.EE! "
IcdCodeEE" )
??EE* ,
stringEE- 3
.EE3 4
EmptyEE4 9
,EE9 :
SeverityFF 
=FF 
requestFF "
.FF" #
SeverityFF# +
??FF, .
stringFF/ 5
.FF5 6
EmptyFF6 ;
,FF; <
SideLocalizationGG  
=GG! "
requestGG# *
.GG* +
SideLocalizationGG+ ;
??GG< >
stringGG? E
.GGE F
EmptyGGF K
,GGK L
ConditionStatusHH 
=HH  !
requestHH" )
.HH) *
ConditionStatusHH* 9
,HH9 :
EntryByII 
=II 
requestII !
.II! "
EntryByII" )
,II) *
MedicationTextJJ 
=JJ  
requestJJ! (
.JJ( )
MedicationTextJJ) 7
??JJ8 :
stringJJ; A
.JJA B
EmptyJJB G
,JJG H
SymptomsKK 
=KK 
requestKK "
.KK" #
SymptomsKK# +
??KK, .
stringKK/ 5
.KK5 6
EmptyKK6 ;
,KK; <
FindingsLL 
=LL 
requestLL "
.LL" #
FindingsLL# +
??LL, .
stringLL/ 5
.LL5 6
EmptyLL6 ;
,LL; <
TherapeuticMeasuresMM #
=MM$ %
requestMM& -
.MM- .
TherapeuticMeasuresMM. A
??MMB D
stringMME K
.MMK L
EmptyMML Q
,MMQ R
NoteNN 
=NN 
requestNN 
.NN 
NoteNN #
??NN$ &
stringNN' -
.NN- .
EmptyNN. 3
,NN3 4
DiagnosisDateOO 
=OO 
requestOO  '
.OO' (
DiagnosisDateOO( 5
??OO6 8
DateTimeOO9 A
.OOA B
UtcNowOOB H
,OOH I
	CreatedAtPP 
=PP 
DateTimePP $
.PP$ %
UtcNowPP% +
,PP+ ,
	UpdatedAtQQ 
=QQ 
DateTimeQQ $
.QQ$ %
UtcNowQQ% +
}RR 
;RR 
varTT 
newDiagnosisTT 
=TT 
awaitTT $ 
_diagnosisRepositoryTT% 9
.TT9 :
AddAsyncTT: B
(TTB C
	diagnosisTTC L
)TTL M
;TTM N
returnUU 
ServiceResultUU  
<UU  !
DiagnosisResponseUU! 2
>UU2 3
.UU3 4
SuccessUU4 ;
(UU; <
_mapperUU< C
.UUC D
ToDiagnosisResponseUUD W
(UUW X
newDiagnosisUUX d
)UUd e
)UUe f
;UUf g
}VV 	
publicXX 
asyncXX 
TaskXX 
<XX 
ServiceResultXX '
<XX' (
DiagnosisResponseXX( 9
>XX9 :
>XX: ;
UpdateAsyncXX< G
(XXG H
intXXH K
	patientIdXXL U
,XXU V
intXXW Z
diagnosisIdXX[ f
,XXf g"
UpdateDiagnosisRequestXXh ~
request	XX Ü
,
XXÜ á
string
XXà é
?
XXé è
userId
XXê ñ
)
XXñ ó
{YY 	
varZZ 
patientZZ 
=ZZ 
awaitZZ 
_patientRepositoryZZ  2
.ZZ2 3
FindByIdAsyncZZ3 @
(ZZ@ A
	patientIdZZA J
)ZZJ K
;ZZK L
if\\ 
(\\ 
patient\\ 
==\\ 
null\\ 
)\\  
return]] 
ServiceResult]] $
<]]$ %
DiagnosisResponse]]% 6
>]]6 7
.]]7 8
NotFound]]8 @
(]]@ A
$"]]A C
$str]]C K
{]]K L
	patientId]]L U
}]]U V
$str]]V g
"]]g h
)]]h i
;]]i j
if__ 
(__ 
userId__ 
!=__ 
null__ 
&&__ !
patient__" )
.__) *
UserId__* 0
!=__1 3
userId__4 :
)__: ;
return`` 
ServiceResult`` $
<``$ %
DiagnosisResponse``% 6
>``6 7
.``7 8
	Forbidden``8 A
(``A B
$str``B d
)``d e
;``e f
varbb 
existingEntrybb 
=bb 
awaitbb  % 
_diagnosisRepositorybb& :
.bb: ;
FindByIdAsyncbb; H
(bbH I
diagnosisIdbbI T
)bbT U
;bbU V
ifdd 
(dd 
existingEntrydd 
==dd  
nulldd! %
||dd& (
existingEntrydd) 6
.dd6 7
	PatientIddd7 @
!=ddA C
	patientIdddD M
)ddM N
returnee 
ServiceResultee $
<ee$ %
DiagnosisResponseee% 6
>ee6 7
.ee7 8
NotFoundee8 @
(ee@ A
$"eeA C
$streeC S
{eeS T
diagnosisIdeeT _
}ee_ `
$stree` q
"eeq r
)eer s
;ees t
existingEntrygg 
.gg 
Titlegg 
=gg  !
requestgg" )
.gg) *
Titlegg* /
??gg0 2
existingEntrygg3 @
.gg@ A
TitleggA F
;ggF G
existingEntryhh 
.hh 
Descriptionhh %
=hh& '
requesthh( /
.hh/ 0
Descriptionhh0 ;
??hh< >
existingEntryhh? L
.hhL M
DescriptionhhM X
;hhX Y
existingEntryii 
.ii 
IcdCodeii !
=ii" #
requestii$ +
.ii+ ,
IcdCodeii, 3
??ii4 6
existingEntryii7 D
.iiD E
IcdCodeiiE L
;iiL M
existingEntryjj 
.jj 
Severityjj "
=jj# $
requestjj% ,
.jj, -
Severityjj- 5
??jj6 8
existingEntryjj9 F
.jjF G
SeverityjjG O
;jjO P
existingEntrykk 
.kk 
SideLocalizationkk *
=kk+ ,
requestkk- 4
.kk4 5
SideLocalizationkk5 E
??kkF H
existingEntrykkI V
.kkV W
SideLocalizationkkW g
;kkg h
existingEntryll 
.ll 
ConditionStatusll )
=ll* +
requestll, 3
.ll3 4
ConditionStatusll4 C
??llD F
existingEntryllG T
.llT U
ConditionStatusllU d
;lld e
existingEntrymm 
.mm 
MedicationTextmm (
=mm) *
requestmm+ 2
.mm2 3
MedicationTextmm3 A
??mmB D
existingEntrymmE R
.mmR S
MedicationTextmmS a
;mma b
existingEntrynn 
.nn 
Symptomsnn "
=nn# $
requestnn% ,
.nn, -
Symptomsnn- 5
??nn6 8
existingEntrynn9 F
.nnF G
SymptomsnnG O
;nnO P
existingEntryoo 
.oo 
Findingsoo "
=oo# $
requestoo% ,
.oo, -
Findingsoo- 5
??oo6 8
existingEntryoo9 F
.ooF G
FindingsooG O
;ooO P
existingEntrypp 
.pp 
TherapeuticMeasurespp -
=pp. /
requestpp0 7
.pp7 8
TherapeuticMeasurespp8 K
??ppL N
existingEntryppO \
.pp\ ]
TherapeuticMeasurespp] p
;ppp q
existingEntryqq 
.qq 
Noteqq 
=qq  
requestqq! (
.qq( )
Noteqq) -
??qq. 0
existingEntryqq1 >
.qq> ?
Noteqq? C
;qqC D
existingEntryrr 
.rr 
DiagnosisDaterr '
=rr( )
requestrr* 1
.rr1 2
DiagnosisDaterr2 ?
??rr@ B
existingEntryrrC P
.rrP Q
DiagnosisDaterrQ ^
;rr^ _
existingEntryss 
.ss 
	UpdatedAtss #
=ss$ %
DateTimess& .
.ss. /
UtcNowss/ 5
;ss5 6
varuu 
updatedEntryuu 
=uu 
awaituu $ 
_diagnosisRepositoryuu% 9
.uu9 :
UpdateAsyncuu: E
(uuE F
existingEntryuuF S
)uuS T
;uuT U
returnvv 
ServiceResultvv  
<vv  !
DiagnosisResponsevv! 2
>vv2 3
.vv3 4
Successvv4 ;
(vv; <
_mappervv< C
.vvC D
ToDiagnosisResponsevvD W
(vvW X
updatedEntryvvX d
)vvd e
)vve f
;vvf g
}ww 	
publicyy 
asyncyy 
Taskyy 
<yy 
ServiceResultyy '
<yy' (
DiagnosisResponseyy( 9
>yy9 :
>yy: ;
UpdateAiExplanationyy< O
(yyO P
intyyP S
diagnosisIdyyT _
,yy_ `
stringyya g
?yyg h
aiExplanationyyi v
)yyv w
{zz 	
var{{ 
	diagnosis{{ 
={{ 
await{{ ! 
_diagnosisRepository{{" 6
.{{6 7
FindByIdAsync{{7 D
({{D E
diagnosisId{{E P
){{P Q
;{{Q R
if}} 
(}} 
	diagnosis}} 
==}} 
null}} !
)}}! "
return~~ 
ServiceResult~~ $
<~~$ %
DiagnosisResponse~~% 6
>~~6 7
.~~7 8
NotFound~~8 @
(~~@ A
$"~~A C
$str~~C L
{~~L M
diagnosisId~~M X
}~~X Y
$str~~Y j
"~~j k
)~~k l
;~~l m
	diagnosis
ÄÄ 
.
ÄÄ !
UpdateAiExplanation
ÄÄ )
(
ÄÄ) *
aiExplanation
ÄÄ* 7
)
ÄÄ7 8
;
ÄÄ8 9
var
ÇÇ 
updatedEntry
ÇÇ 
=
ÇÇ 
await
ÇÇ $"
_diagnosisRepository
ÇÇ% 9
.
ÇÇ9 :
UpdateAsync
ÇÇ: E
(
ÇÇE F
	diagnosis
ÇÇF O
)
ÇÇO P
;
ÇÇP Q
return
ÉÉ 
ServiceResult
ÉÉ  
<
ÉÉ  !
DiagnosisResponse
ÉÉ! 2
>
ÉÉ2 3
.
ÉÉ3 4
Success
ÉÉ4 ;
(
ÉÉ; <
_mapper
ÉÉ< C
.
ÉÉC D!
ToDiagnosisResponse
ÉÉD W
(
ÉÉW X
updatedEntry
ÉÉX d
)
ÉÉd e
)
ÉÉe f
;
ÉÉf g
}
ÑÑ 	
public
ÜÜ 
async
ÜÜ 
Task
ÜÜ 
<
ÜÜ 
ServiceResult
ÜÜ '
>
ÜÜ' (
DeleteAsync
ÜÜ) 4
(
ÜÜ4 5
int
ÜÜ5 8
diagnosisId
ÜÜ9 D
,
ÜÜD E
string
ÜÜF L
?
ÜÜL M
userId
ÜÜN T
)
ÜÜT U
{
áá 	
var
àà 
existing
àà 
=
àà 
await
àà  "
_diagnosisRepository
àà! 5
.
àà5 6
FindByIdAsync
àà6 C
(
ààC D
diagnosisId
ààD O
)
ààO P
;
ààP Q
if
ää 
(
ää 
existing
ää 
==
ää 
null
ää  
)
ää  !
return
ãã 
ServiceResult
ãã $
.
ãã$ %
NotFound
ãã% -
(
ãã- .
$"
ãã. 0
$str
ãã0 9
{
ãã9 :
diagnosisId
ãã: E
}
ããE F
$str
ããF W
"
ããW X
)
ããX Y
;
ããY Z
var
çç 
patient
çç 
=
çç 
await
çç  
_patientRepository
çç  2
.
çç2 3
FindByIdAsync
çç3 @
(
çç@ A
existing
ççA I
.
ççI J
	PatientId
ççJ S
)
ççS T
;
ççT U
if
èè 
(
èè 
userId
èè 
!=
èè 
null
èè 
&&
èè !
(
èè" #
patient
èè# *
==
èè+ -
null
èè. 2
||
èè3 5
patient
èè6 =
.
èè= >
UserId
èè> D
!=
èèE G
userId
èèH N
)
èèN O
)
èèO P
return
êê 
ServiceResult
êê $
.
êê$ %
	Forbidden
êê% .
(
êê. /
$str
êê/ Q
)
êêQ R
;
êêR S
await
íí "
_diagnosisRepository
íí &
.
íí& '
DeleteAsync
íí' 2
(
íí2 3
existing
íí3 ;
)
íí; <
;
íí< =
return
ìì 
ServiceResult
ìì  
.
ìì  !
Success
ìì! (
(
ìì( )
)
ìì) *
;
ìì* +
}
îî 	
}
ïï 
}ññ õ
lC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\DiagnosisService\Dto\CreateDiagnosisRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
DiagnosisService' 7
.7 8
Dto8 ;
;; <
public 
class "
CreateDiagnosisRequest #
{ 
[ 
Required 
] 
public		 

int		 
	PatientId		 
{		 
get		 
;		 
set		  #
;		# $
}		% &
[ 
Required 
] 
[ 
	MaxLength 
( 
$num 
) 
] 
public 

required 
string 
Title  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 

string 
? 
Description 
{  
get! $
;$ %
set& )
;) *
}+ ,
[ 
	MaxLength 
( 
$num 
) 
] 
public 

string 
? 
IcdCode 
{ 
get  
;  !
set" %
;% &
}' (
public 

string 
? 
Severity 
{ 
get !
;! "
set# &
;& '
}( )
public 

string 
? 
SideLocalization #
{$ %
get& )
;) *
set+ .
;. /
}0 1
[ 
Required 
] 
public 

ConditionStatus 
ConditionStatus *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
[ 
Required 
] 
public 

EntryBy 
EntryBy 
{ 
get  
;  !
set" %
;% &
}' (
public 

string 
? 
MedicationText !
{" #
get$ '
;' (
set) ,
;, -
}. /
public   

string   
?   
Symptoms   
{   
get   !
;  ! "
set  # &
;  & '
}  ( )
public"" 

string"" 
?"" 
Findings"" 
{"" 
get"" !
;""! "
set""# &
;""& '
}""( )
public$$ 

string$$ 
?$$ 
TherapeuticMeasures$$ &
{$$' (
get$$) ,
;$$, -
set$$. 1
;$$1 2
}$$3 4
public&& 

string&& 
?&& 
Note&& 
{&& 
get&& 
;&& 
set&& "
;&&" #
}&&$ %
public(( 

DateTime(( 
?(( 
DiagnosisDate(( "
{((# $
get((% (
;((( )
set((* -
;((- .
}((/ 0
})) í
uC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CommunicationLevelService\ICommunicationLevelService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '%
CommunicationLevelService' @
{ 
public 

	interface &
ICommunicationLevelService /
{ 
Task 
< 
ServiceResult 
< 
IEnumerable &
<& ')
CommunicationQuestionResponse' D
>D E
>E F
>F G
GetQuestionsAsyncH Y
(Y Z
)Z [
;[ \
Task		 
<		 
ServiceResult		 
<		 &
CommunicationLevelResponse		 5
>		5 6
>		6 7
CreateAsync		8 C
(		C D
int		D G
	patientId		H Q
,		Q R+
CreateCommunicationLevelRequest		S r
request		s z
,		z {
string			| Ç
userId
		É â
)
		â ä
;
		ä ã
Task

 
<

 
ServiceResult

 
<

 &
CommunicationLevelResponse

 5
>

5 6
>

6 7
GetByPatientIdAsync

8 K
(

K L
int

L O
	patientId

P Y
,

Y Z
string

[ a
userId

b h
)

h i
;

i j
} 
} ¯
~C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CommunicationLevelService\Dto\CreateCommunicationLevelRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '%
CommunicationLevelService' @
.@ A
DtoA D
{ 
public 

class +
CreateCommunicationLevelRequest 0
{ 
public 
List 
< 
int 
> 
SelectedAnswerIds *
{+ ,
get- 0
;0 1
set2 5
;5 6
}7 8
=9 :
new; >
(> ?
)? @
;@ A
} 
} Ó
|C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CommunicationLevelService\Dto\CommunicationQuestionResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '%
CommunicationLevelService' @
.@ A
DtoA D
{ 
public 

class )
CommunicationQuestionResponse .
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
Text 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
public 
List 
< '
CommunicationAnswerResponse /
>/ 0
Answers1 8
{9 :
get; >
;> ?
set@ C
;C D
}E F
=G H
newI L
(L M
)M N
;N O
} 
public

 

class

 '
CommunicationAnswerResponse

 ,
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
Text 
{ 
get  
;  !
set" %
;% &
}' (
=) *
string+ 1
.1 2
Empty2 7
;7 8
} 
} ·
yC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CommunicationLevelService\Dto\CommunicationLevelResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '%
CommunicationLevelService' @
.@ A
DtoA D
{ 
public 

class &
CommunicationLevelResponse +
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
int 
	PatientId 
{ 
get "
;" #
set$ '
;' (
}) *
public 
string 
	LevelName 
{  !
get" %
;% &
set' *
;* +
}, -
=. /
string0 6
.6 7
Empty7 <
;< =
public 
string 
LevelDescription &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
=5 6
string7 =
.= >
Empty> C
;C D
public		 
string		  
ActionRecommendation		 *
{		+ ,
get		- 0
;		0 1
set		2 5
;		5 6
}		7 8
=		9 :
string		; A
.		A B
Empty		B G
;		G H
}

 
} ä]
tC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CommunicationLevelService\CommunicationLevelService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '%
CommunicationLevelService' @
{ 
public		 

class		 %
CommunicationLevelService		 *
:		+ ,&
ICommunicationLevelService		- G
{

 
private 
readonly 
IPatientRepository +
_patientRepository, >
;> ?
private 
readonly )
ICommunicationLevelRepository 6
_levelRepository7 G
;G H
private 
readonly 
List 
< !
CommunicationQuestion 3
>3 4

_questions5 ?
;? @
public %
CommunicationLevelService (
(( )
IPatientRepository) ;
patientRepository< M
,M N)
ICommunicationLevelRepositoryO l
levelRepositorym |
)| }
{ 	
_patientRepository 
=  
patientRepository! 2
;2 3
_levelRepository 
= 
levelRepository .
;. /
var 
filePath 
= 
Path 
.  
Combine  '
(' (

AppContext( 2
.2 3
BaseDirectory3 @
,@ A
$strB G
,G H
$strI ]
,] ^
$str_ }
)} ~
;~ 
if 
( 
! 
File 
. 
Exists 
( 
filePath %
)% &
)& '
{ 
throw 
new !
FileNotFoundException /
(/ 0
$"0 2
$str2 X
{X Y
filePathY a
}a b
"b c
)c d
;d e
} 
var 
json 
= 
File 
. 
ReadAllText '
(' (
filePath( 0
)0 1
;1 2

_questions 
= 
JsonSerializer '
.' (
Deserialize( 3
<3 4
List4 8
<8 9!
CommunicationQuestion9 N
>N O
>O P
(P Q
jsonQ U
,U V
new !
JsonSerializerOptions )
{* +'
PropertyNameCaseInsensitive, G
=H I
trueJ N
}O P
)P Q
??R T
newU X
(X Y
)Y Z
;Z [
} 	
public   
Task   
<   
ServiceResult   !
<  ! "
IEnumerable  " -
<  - .)
CommunicationQuestionResponse  . K
>  K L
>  L M
>  M N
GetQuestionsAsync  O `
(  ` a
)  a b
{!! 	
var"" 
response"" 
="" 

_questions"" %
.""% &
Select""& ,
("", -
q""- .
=>""/ 1
new""2 5)
CommunicationQuestionResponse""6 S
{## 
Id$$ 
=$$ 
q$$ 
.$$ 
Id$$ 
,$$ 
Text%% 
=%% 
q%% 
.%% 
Text%% 
,%% 
Answers&& 
=&& 
q&& 
.&& 
Answers&& #
.&&# $
Select&&$ *
(&&* +
a&&+ ,
=>&&- /
new&&0 3'
CommunicationAnswerResponse&&4 O
{'' 
Id(( 
=(( 
a(( 
.(( 
Id(( 
,(( 
Text)) 
=)) 
a)) 
.)) 
Text)) !
}** 
)** 
.** 
ToList** 
(** 
)** 
}++ 
)++ 
;++ 
return-- 
Task-- 
.-- 

FromResult-- "
(--" #
ServiceResult--# 0
<--0 1
IEnumerable--1 <
<--< =)
CommunicationQuestionResponse--= Z
>--Z [
>--[ \
.--\ ]
Success--] d
(--d e
response--e m
)--m n
)--n o
;--o p
}.. 	
public11 
async11 
Task11 
<11 
ServiceResult11 '
<11' (&
CommunicationLevelResponse11( B
>11B C
>11C D
CreateAsync11E P
(11P Q
int11Q T
	patientId11U ^
,11^ _+
CreateCommunicationLevelRequest11` 
request
11Ä á
,
11á à
string
11â è
userId
11ê ñ
)
11ñ ó
{22 	
var33 
patient33 
=33 
await33 
_patientRepository33  2
.332 3
FindByIdAsync333 @
(33@ A
	patientId33A J
)33J K
;33K L
if44 
(44 
patient44 
==44 
null44 
)44  
return44! '
ServiceResult44( 5
<445 6&
CommunicationLevelResponse446 P
>44P Q
.44Q R
NotFound44R Z
(44Z [
$str44[ o
)44o p
;44p q
if55 
(55 
patient55 
.55 
UserId55 
!=55 !
userId55" (
)55( )
return55* 0
ServiceResult551 >
<55> ?&
CommunicationLevelResponse55? Y
>55Y Z
.55Z [
	Forbidden55[ d
(55d e
$str55e u
)55u v
;55v w
var88 
levelKey88 
=88 
CalculateLevelKey88 ,
(88, -
request88- 4
.884 5
SelectedAnswerIds885 F
)88F G
;88G H
var;; 
levelEntity;; 
=;; 
await;; #
_levelRepository;;$ 4
.;;4 5
FindByNameAsync;;5 D
(;;D E
levelKey;;E M
);;M N
;;;N O
if<< 
(<< 
levelEntity<< 
==<< 
null<< #
)<<# $
return<<% +
ServiceResult<<, 9
<<<9 :&
CommunicationLevelResponse<<: T
><<T U
.<<U V
Conflict<<V ^
(<<^ _
$str	<<_ É
)
<<É Ñ
;
<<Ñ Ö
patient?? 
.??  
CommunicationLevelId?? (
=??) *
levelEntity??+ 6
.??6 7
Id??7 9
;??9 :
await@@ 
_patientRepository@@ $
.@@$ %
UpdateAsync@@% 0
(@@0 1
patient@@1 8
)@@8 9
;@@9 :
returnBB 
ServiceResultBB  
<BB  !&
CommunicationLevelResponseBB! ;
>BB; <
.BB< =
SuccessBB= D
(BBD E
newBBE H&
CommunicationLevelResponseBBI c
{CC 
IdDD 
=DD 
levelEntityDD  
.DD  !
IdDD! #
,DD# $
	PatientIdEE 
=EE 
patientEE #
.EE# $
IdEE$ &
,EE& '
	LevelNameFF 
=FF 
levelEntityFF '
.FF' (
NameFF( ,
,FF, -
LevelDescriptionGG  
=GG! "
levelEntityGG# .
.GG. /
DescriptionGG/ :
,GG: ; 
ActionRecommendationHH $
=HH% &
levelEntityHH' 2
.HH2 3 
ActionRecommendationHH3 G
}II 
)II 
;II 
}JJ 	
publicLL 
asyncLL 
TaskLL 
<LL 
ServiceResultLL '
<LL' (&
CommunicationLevelResponseLL( B
>LLB C
>LLC D
GetByPatientIdAsyncLLE X
(LLX Y
intLLY \
	patientIdLL] f
,LLf g
stringLLh n
userIdLLo u
)LLu v
{MM 	
varNN 
patientNN 
=NN 
awaitNN 
_patientRepositoryNN  2
.NN2 3
FindByIdAsyncNN3 @
(NN@ A
	patientIdNNA J
)NNJ K
;NNK L
ifOO 
(OO 
patientOO 
==OO 
nullOO 
)OO  
returnOO! '
ServiceResultOO( 5
<OO5 6&
CommunicationLevelResponseOO6 P
>OOP Q
.OOQ R
NotFoundOOR Z
(OOZ [
$strOO[ o
)OOo p
;OOp q
ifPP 
(PP 
patientPP 
.PP 
UserIdPP 
!=PP !
userIdPP" (
)PP( )
returnPP* 0
ServiceResultPP1 >
<PP> ?&
CommunicationLevelResponsePP? Y
>PPY Z
.PPZ [
	ForbiddenPP[ d
(PPd e
$strPPe u
)PPu v
;PPv w
varRR 
communicationLevelRR "
=RR# $
awaitRR% *
_levelRepositoryRR+ ;
.RR; < 
FindByPatientIdAsyncRR< P
(RRP Q
	patientIdRRQ Z
)RRZ [
;RR[ \
ifSS 
(SS 
communicationLevelSS "
==SS# %
nullSS& *
)SS* +
returnTT 
ServiceResultTT $
<TT$ %&
CommunicationLevelResponseTT% ?
>TT? @
.TT@ A
NotFoundTTA I
(TTI J
$strTTJ ^
)TT^ _
;TT_ `
returnVV 
ServiceResultVV  
<VV  !&
CommunicationLevelResponseVV! ;
>VV; <
.VV< =
SuccessVV= D
(VVD E
newVVE H&
CommunicationLevelResponseVVI c
{WW 
IdXX 
=XX 
communicationLevelXX '
.XX' (
IdXX( *
,XX* +
	PatientIdYY 
=YY 
patientYY #
.YY# $
IdYY$ &
,YY& '
	LevelNameZZ 
=ZZ 
communicationLevelZZ .
.ZZ. /
NameZZ/ 3
,ZZ3 4
LevelDescription[[  
=[[! "
communicationLevel[[# 5
.[[5 6
Description[[6 A
,[[A B 
ActionRecommendation\\ $
=\\% &
communicationLevel\\' 9
.\\9 : 
ActionRecommendation\\: N
}]] 
)]] 
;]] 
}^^ 	
private`` 
string`` 
CalculateLevelKey`` (
(``( )
List``) -
<``- .
int``. 1
>``1 2
selectedAnswerIds``3 D
)``D E
{aa 	
varbb 
selectedPointsbb 
=bb  

_questionsbb! +
.bb+ ,

SelectManybb, 6
(bb6 7
qbb7 8
=>bb9 ;
qbb< =
.bb= >
Answersbb> E
)bbE F
.cc 
Wherecc 
(cc 
acc 
=>cc 
selectedAnswerIdscc -
.cc- .
Containscc. 6
(cc6 7
acc7 8
.cc8 9
Idcc9 ;
)cc; <
)cc< =
.dd 
Selectdd 
(dd 
add 
=>dd 
add 
.dd 
Pointsdd %
)dd% &
.dd& '
ToListdd' -
(dd- .
)dd. /
;dd/ 0
ifff 
(ff 
!ff 
selectedPointsff 
.ff  
Anyff  #
(ff# $
)ff$ %
)ff% &
returnff' -
$strff. 2
;ff2 3
vargg 
avggg 
=gg 
selectedPointsgg $
.gg$ %
Averagegg% ,
(gg, -
)gg- .
;gg. /
returnii 
avgii 
<=ii 
$numii 
?ii 
$strii  $
:ii% &
avgii' *
<=ii+ -
$numii. 1
?ii2 3
$strii4 8
:ii9 :
$strii; ?
;ii? @
}jj 	
}ll 
}mm ú
_C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CheckupService\ICheckupService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
CheckupService' 5
{ 
public 

	interface 
ICheckupService $
{ 
Task 
< 
ServiceResult 
< "
CheckupSummaryResponse 1
>1 2
>2 3"
GenerateCheckupSummary4 J
(J K
intK N
	patientIdO X
,X Y
stringZ `
?` a
userIdb h
,h i!
CheckupSummaryRequestj 
request
Ä á
)
á à
;
à â
}		 
}

 ´#
dC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\AnonymizerService\AnonymizerService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
AnonymizerService' 8
{ 
public 

class 
AnonymizerService "
:# $
IAnonymizerService% 7
{ 
private 
readonly 
string 
_pythonScriptPath  1
=2 3
Path4 8
.8 9
Combine9 @
(@ A

AppContextA K
.K L
BaseDirectoryL Y
,Y Z
$str[ `
,` a
$strb q
)q r
;r s
public 
async 
Task 
< 
string  
>  !
AnonymizeTextAsync" 4
(4 5
string5 ;
rawText< C
)C D
{		 	
var

 
	startInfo

 
=

 
new

 
ProcessStartInfo

  0
{ 
FileName 
= 
$str #
,# $
	Arguments 
= 
$" 
$str  
{  !
_pythonScriptPath! 2
}2 3
$str3 5
"5 6
,6 7!
RedirectStandardInput %
=& '
true( ,
,, -"
RedirectStandardOutput &
=' (
true) -
,- .!
RedirectStandardError %
=& '
true( ,
,, -
UseShellExecute 
=  !
false" '
,' (
CreateNoWindow 
=  
true! %
} 
; 
using 
( 
var 
process 
=  
new! $
Process% ,
{- .
	StartInfo/ 8
=9 :
	startInfo; D
}E F
)F G
{ 
try 
{ 
process 
. 
Start !
(! "
)" #
;# $
} 
catch 
( 
	Exception  
ex! #
)# $
{ 
throw 
new 
	Exception '
(' (
$"( *
$str	* Ä
{
Ä Å
ex
Å É
.
É Ñ
Message
Ñ ã
}
ã å
"
å ç
)
ç é
;
é è
} 
var   

outputTask   
=    
process  ! (
.  ( )
StandardOutput  ) 7
.  7 8
ReadToEndAsync  8 F
(  F G
)  G H
;  H I
var!! 
	errorTask!! 
=!! 
process!!  '
.!!' (
StandardError!!( 5
.!!5 6
ReadToEndAsync!!6 D
(!!D E
)!!E F
;!!F G
try## 
{$$ 
using%% 
(%% 
var%% 
writer%% %
=%%& '
process%%( /
.%%/ 0
StandardInput%%0 =
)%%= >
{&& 
await'' 
writer'' $
.''$ %

WriteAsync''% /
(''/ 0
rawText''0 7
)''7 8
;''8 9
}(( 
})) 
catch)) 
()) 
IOException)) $
)))$ %
{** 
},, 
await.. 
process.. 
... 
WaitForExitAsync.. .
(... /
)../ 0
;..0 1
string00 
errors00 
=00 
await00  %
	errorTask00& /
;00/ 0
if11 
(11 
process11 
.11 
ExitCode11 #
!=11$ &
$num11' (
||11) +
!11, -
string11- 3
.113 4
IsNullOrWhiteSpace114 F
(11F G
errors11G M
)11M N
)11N O
{22 
throw33 
new33 
	Exception33 '
(33' (
$"33( *
$str33* M
{33M N
process33N U
.33U V
ExitCode33V ^
}33^ _
$str33_ b
{33b c
errors33c i
}33i j
"33j k
)33k l
;33l m
}44 
string66 
result66 
=66 
await66  %

outputTask66& 0
;660 1
return77 
result77 
;77 
}88 
}99 	
}:: 
};; ∏ä
^C:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CheckupService\CheckupService.cs
	namespace		 	
Backend		
 
.		 
Application		 
.		 
Services		 &
.		& '
CheckupService		' 5
{

 
public 

class 
CheckupService 
:  !
ICheckupService" 1
{ 
private 
readonly 
IPatientRepository +
_patientRepository, >
;> ?
private 
readonly  
IDiagnosisRepository - 
_diagnosisRepository. B
;B C
private 
readonly !
IMedicationRepository .!
_medicationRepository/ D
;D E
private 
readonly %
IPatientSymptomRepository 2%
_patientSymptomRepository3 L
;L M
private 
readonly )
ICommunicationLevelRepository 6)
_communicationLevelRepository7 T
;T U
private 
readonly 
IHttpClientFactory +
_httpClientFactory, >
;> ?
private 
readonly 
string #
_checkupSummaryEndpoint  7
;7 8
public 
CheckupService 
( 
IPatientRepository 
patientRepository 0
,0 1 
IDiagnosisRepository  
diagnosisRepository! 4
,4 5!
IMedicationRepository ! 
medicationRepository" 6
,6 7%
IPatientSymptomRepository %$
patientSymptomRepository& >
,> ?)
ICommunicationLevelRepository )(
communicationLevelRepository* F
,F G
IHttpClientFactory 
httpClientFactory 0
,0 1
IConfiguration 
configuration (
)( )
{ 	
_patientRepository 
=  
patientRepository! 2
;2 3 
_diagnosisRepository  
=! "
diagnosisRepository# 6
;6 7!
_medicationRepository   !
=  " # 
medicationRepository  $ 8
;  8 9%
_patientSymptomRepository!! %
=!!& '$
patientSymptomRepository!!( @
;!!@ A)
_communicationLevelRepository"" )
=""* +(
communicationLevelRepository"", H
;""H I
_httpClientFactory## 
=##  
httpClientFactory##! 2
;##2 3#
_checkupSummaryEndpoint$$ #
=$$$ %
configuration$$& 3
[$$3 4
$str$$4 ]
]$$] ^
??%% 
$str%% =
;%%= >
}&& 	
public(( 
async(( 
Task(( 
<(( 
ServiceResult(( '
<((' ("
CheckupSummaryResponse((( >
>((> ?
>((? @"
GenerateCheckupSummary((A W
(((W X
int((X [
	patientId((\ e
,((e f
string((g m
?((m n
userId((o u
,((u v"
CheckupSummaryRequest	((w å
request
((ç î
)
((î ï
{)) 	
var** 
patient** 
=** 
await** 
_patientRepository**  2
.**2 3
FindByIdAsync**3 @
(**@ A
	patientId**A J
)**J K
;**K L
if,, 
(,, 
patient,, 
==,, 
null,, 
),,  
{-- 
return.. 
ServiceResult.. $
<..$ %"
CheckupSummaryResponse..% ;
>..; <
...< =
NotFound..= E
(..E F
$"..F H
$str..H P
{..P Q
	patientId..Q Z
}..Z [
$str..[ l
"..l m
)..m n
;..n o
}// 
if11 
(11 
userId11 
!=11 
null11 
&&11 !
patient11" )
.11) *
UserId11* 0
!=111 3
userId114 :
)11: ;
{22 
return33 
ServiceResult33 $
<33$ %"
CheckupSummaryResponse33% ;
>33; <
.33< =
	Forbidden33= F
(33F G
$str33G k
)33k l
;33l m
}44 
var66 
communicationLevels66 #
=66$ %
await66& +)
_communicationLevelRepository66, I
.66I J
GetAllAsync66J U
(66U V
)66V W
;66W X
var77 
communicationLevel77 "
=77# $
communicationLevels77% 8
?778 9
.779 :
FirstOrDefault77: H
(77H I
level77I N
=>77O Q
level77R W
.77W X
Id77X Z
==77[ ]
patient77^ e
.77e f 
CommunicationLevelId77f z
)77z {
??88 
communicationLevels88 &
?88& '
.88' (
FirstOrDefault88( 6
(886 7
)887 8
;888 9
var:: 
from:: 
=:: 
request:: 
.:: 
From:: #
;::# $
var;; 
to;; 
=;; 
request;; 
.;; 
To;; 
;;;  
var== 
	diagnoses== 
=== 
await== ! 
_diagnosisRepository==" 6
.==6 7#
FindAllByPatientIdAsync==7 N
(==N O
	patientId==O X
)==X Y
;==Y Z
var>> 
medications>> 
=>> 
await>> #!
_medicationRepository>>$ 9
.>>9 :#
FindAllByPatientIdAsync>>: Q
(>>Q R
	patientId>>R [
)>>[ \
;>>\ ]
var?? 
symptoms?? 
=?? 
await??  %
_patientSymptomRepository??! :
.??: ;#
FindAllByPatientIdAsync??; R
(??R S
	patientId??S \
)??\ ]
;??] ^
varAA 
diagnosesInRangeAA  
=AA! "
	diagnosesAA# ,
.AA, -
WhereAA- 2
(AA2 3
dAA3 4
=>AA5 7
dBB 
.BB 
DiagnosisDateBB 
>=BB  "
fromBB# '
&&BB( *
dBB+ ,
.BB, -
DiagnosisDateBB- :
<=BB; =
toBB> @
)CC 
.CC 
ToListCC 
(CC 
)CC 
;CC 
varEE 
medicationsInRangeEE "
=EE# $
medicationsEE% 0
.EE0 1
WhereEE1 6
(EE6 7
mEE7 8
=>EE9 ;
mFF 
.FF 
IntakeStartDateFF !
.FF! "
HasValueFF" *
&&FF+ -
mGG 
.GG 
IntakeStartDateGG !
.GG! "
ValueGG" '
<=GG( *
toGG+ -
&&GG. 0
(HH 
mHH 
.HH 
EndDateHH 
==HH 
nullHH "
||HH# %
mHH& '
.HH' (
EndDateHH( /
>=HH0 2
fromHH3 7
)HH7 8
)II 
.II 
ToListII 
(II 
)II 
;II 
varKK 
symptomsInRangeKK 
=KK  !
symptomsKK" *
.KK* +
WhereKK+ 0
(KK0 1
sKK1 2
=>KK3 5
sLL 
.LL 
OccurrenceTimeLL  
>=LL! #
fromLL$ (
&&LL) +
sLL, -
.LL- .
OccurrenceTimeLL. <
<=LL= ?
toLL@ B
)MM 
.MM 
ToListMM 
(MM 
)MM 
;MM 
varOO 
responseOO 
=OO 
newOO "
CheckupSummaryResponseOO 5
{PP 
FromQQ 
=QQ 
fromQQ 
,QQ 
ToRR 
=RR 
toRR 
,RR 
	DiagnosesSS 
=SS 
diagnosesInRangeSS ,
.SS, -
SelectSS- 3
(SS3 4
dSS4 5
=>SS6 8
newSS9 <
CheckupDiagnosisSS= M
{TT 
IdUU 
=UU 
dUU 
.UU 
IdUU 
,UU 
	ICD10CodeVV 
=VV 
dVV  !
.VV! "
IcdCodeVV" )
,VV) *
	DiagnosisWW 
=WW 
dWW  !
.WW! "
TitleWW" '
,WW' (
YearXX 
=XX 
dXX 
.XX 
DiagnosisDateXX *
.XX* +
YearXX+ /
,XX/ 0
StatusYY 
=YY 
dYY 
.YY 
ConditionStatusYY .
.YY. /
ToStringYY/ 7
(YY7 8
)YY8 9
,YY9 :
CommentZZ 
=ZZ 
dZZ 
.ZZ  
NoteZZ  $
}[[ 
)[[ 
.[[ 
ToList[[ 
([[ 
)[[ 
,[[ 
Medications\\ 
=\\ 
medicationsInRange\\ 0
.\\0 1
Select\\1 7
(\\7 8
m\\8 9
=>\\: <
new\\= @
CheckupMedication\\A R
{]] 
Id^^ 
=^^ 
m^^ 
.^^ 
Id^^ 
,^^ 
Name__ 
=__ 
m__ 
.__ 
Name__ !
,__! "
Dosage`` 
=`` 
m`` 
.`` 
Dosage`` %
,``% &
IntakeFrequencyaa #
=aa$ %
maa& '
.aa' (
IntakeFrequencyaa( 7
,aa7 8
IntakeStartDatebb #
=bb$ %
mbb& '
.bb' (
IntakeStartDatebb( 7
,bb7 8
EndDatecc 
=cc 
mcc 
.cc  
EndDatecc  '
,cc' (

Indicationdd 
=dd  
mdd! "
.dd" #

Indicationdd# -
,dd- .
AtcCodeee 
=ee 
mee 
.ee  
AtcCodeee  '
}ff 
)ff 
.ff 
ToListff 
(ff 
)ff 
,ff 
Symptomsgg 
=gg 
symptomsInRangegg *
.gg* +
Selectgg+ 1
(gg1 2
sgg2 3
=>gg4 6
newgg7 :
CheckupSymptomgg; I
{hh 
Idii 
=ii 
sii 
.ii 
Idii 
,ii 
SymptomNamejj 
=jj  !
sjj" #
.jj# $
SymptomNamejj$ /
,jj/ 0
OccurrenceTimekk "
=kk# $
skk% &
.kk& '
OccurrenceTimekk' 5
,kk5 6
	Intensityll 
=ll 
sll  !
.ll! "
	Intensityll" +
,ll+ ,
Durationmm 
=mm 
smm  
.mm  !
Durationmm! )
,mm) *
PossibleTriggernn #
=nn$ %
snn& '
.nn' (
PossibleTriggernn( 7
,nn7 8
Notesoo 
=oo 
soo 
.oo 
Notesoo #
}pp 
)pp 
.pp 
ToListpp 
(pp 
)pp 
}qq 
;qq 
responsess 
.ss 
	AiSummaryss 
=ss  
awaitss! &*
CallAiServiceForCheckupSummaryss' E
(ssE F
responsett 
,tt 
communicationLeveluu "
?uu" #
.uu# $
Nameuu$ (
??uu) +
$struu, 0
,uu0 1
communicationLevelvv "
?vv" #
.vv# $
KiPromptvv$ ,
??vv- /
stringvv0 6
.vv6 7
Emptyvv7 <
)vv< =
;vv= >
returnxx 
ServiceResultxx  
<xx  !"
CheckupSummaryResponsexx! 7
>xx7 8
.xx8 9
Successxx9 @
(xx@ A
responsexxA I
)xxI J
;xxJ K
}yy 	
private{{ 
async{{ 
Task{{ 
<{{ 
string{{ !
?{{! "
>{{" #*
CallAiServiceForCheckupSummary{{$ B
({{B C"
CheckupSummaryResponse{{C Y
data{{Z ^
,{{^ _
string{{` f
	langLevel{{g p
,{{p q
string{{r x
kiPrompt	{{y Å
)
{{Å Ç
{|| 	
var}} 
payload}} 
=}} 
new}} 
{~~ 
	langLevel 
, 
kiPrompt
ÄÄ 
,
ÄÄ 
from
ÅÅ 
=
ÅÅ 
data
ÅÅ 
.
ÅÅ 
From
ÅÅ  
,
ÅÅ  !
to
ÇÇ 
=
ÇÇ 
data
ÇÇ 
.
ÇÇ 
To
ÇÇ 
,
ÇÇ 
	diagnoses
ÉÉ 
=
ÉÉ 
data
ÉÉ  
.
ÉÉ  !
	Diagnoses
ÉÉ! *
.
ÉÉ* +
Select
ÉÉ+ 1
(
ÉÉ1 2
d
ÉÉ2 3
=>
ÉÉ4 6
new
ÉÉ7 :
{
ÑÑ 
	diagnosis
ÖÖ 
=
ÖÖ 
d
ÖÖ  !
.
ÖÖ! "
	Diagnosis
ÖÖ" +
,
ÖÖ+ ,
	icd10Code
ÜÜ 
=
ÜÜ 
d
ÜÜ  !
.
ÜÜ! "
	ICD10Code
ÜÜ" +
,
ÜÜ+ ,
year
áá 
=
áá 
d
áá 
.
áá 
Year
áá !
,
áá! "
status
àà 
=
àà 
d
àà 
.
àà 
Status
àà %
,
àà% &
comment
ââ 
=
ââ 
d
ââ 
.
ââ  
Comment
ââ  '
}
ää 
)
ää 
,
ää 
medications
ãã 
=
ãã 
data
ãã "
.
ãã" #
Medications
ãã# .
.
ãã. /
Select
ãã/ 5
(
ãã5 6
m
ãã6 7
=>
ãã8 :
new
ãã; >
{
åå 
name
çç 
=
çç 
m
çç 
.
çç 
Name
çç !
,
çç! "
dosage
éé 
=
éé 
m
éé 
.
éé 
Dosage
éé %
,
éé% &
intakeFrequency
èè #
=
èè$ %
m
èè& '
.
èè' (
IntakeFrequency
èè( 7
,
èè7 8
intakeStartDate
êê #
=
êê$ %
m
êê& '
.
êê' (
IntakeStartDate
êê( 7
,
êê7 8
endDate
ëë 
=
ëë 
m
ëë 
.
ëë  
EndDate
ëë  '
,
ëë' (

indication
íí 
=
íí  
m
íí! "
.
íí" #

Indication
íí# -
,
íí- .
atcCode
ìì 
=
ìì 
m
ìì 
.
ìì  
AtcCode
ìì  '
}
îî 
)
îî 
,
îî 
symptoms
ïï 
=
ïï 
data
ïï 
.
ïï  
Symptoms
ïï  (
.
ïï( )
Select
ïï) /
(
ïï/ 0
s
ïï0 1
=>
ïï2 4
new
ïï5 8
{
ññ 
symptomName
óó 
=
óó  !
s
óó" #
.
óó# $
SymptomName
óó$ /
,
óó/ 0
occurrenceTime
òò "
=
òò# $
s
òò% &
.
òò& '
OccurrenceTime
òò' 5
,
òò5 6
	intensity
ôô 
=
ôô 
s
ôô  !
.
ôô! "
	Intensity
ôô" +
,
ôô+ ,
duration
öö 
=
öö 
s
öö  
.
öö  !
Duration
öö! )
,
öö) *
possibleTrigger
õõ #
=
õõ$ %
s
õõ& '
.
õõ' (
PossibleTrigger
õõ( 7
,
õõ7 8
notes
úú 
=
úú 
s
úú 
.
úú 
Notes
úú #
}
ùù 
)
ùù 
}
ûû 
;
ûû 
try
†† 
{
°° 
var
¢¢ 

httpClient
¢¢ 
=
¢¢   
_httpClientFactory
¢¢! 3
.
¢¢3 4
CreateClient
¢¢4 @
(
¢¢@ A
)
¢¢A B
;
¢¢B C

httpClient
££ 
.
££ 
Timeout
££ "
=
££# $
TimeSpan
££% -
.
££- .
FromMinutes
££. 9
(
££9 :
$num
££: ;
)
££; <
;
££< =
using
•• 
var
•• 
response
•• "
=
••# $
await
••% *

httpClient
••+ 5
.
••5 6
PostAsJsonAsync
••6 E
(
••E F%
_checkupSummaryEndpoint
••F ]
,
••] ^
payload
••_ f
)
••f g
;
••g h
if
ßß 
(
ßß 
!
ßß 
response
ßß 
.
ßß !
IsSuccessStatusCode
ßß 1
)
ßß1 2
{
®® 
return
©© 
$str
©© @
;
©©@ A
}
™™ 
var
¨¨ 
body
¨¨ 
=
¨¨ 
await
¨¨  
response
¨¨! )
.
¨¨) *
Content
¨¨* 1
.
¨¨1 2
ReadAsStringAsync
¨¨2 C
(
¨¨C D
)
¨¨D E
;
¨¨E F
using
≠≠ 
var
≠≠ 
doc
≠≠ 
=
≠≠ 
JsonDocument
≠≠  ,
.
≠≠, -
Parse
≠≠- 2
(
≠≠2 3
body
≠≠3 7
)
≠≠7 8
;
≠≠8 9
if
ØØ 
(
ØØ 
doc
ØØ 
.
ØØ 
RootElement
ØØ #
.
ØØ# $
TryGetProperty
ØØ$ 2
(
ØØ2 3
$str
ØØ3 <
,
ØØ< =
out
ØØ> A
var
ØØB E
summary
ØØF M
)
ØØM N
)
ØØN O
{
∞∞ 
return
±± 
summary
±± "
.
±±" #
	GetString
±±# ,
(
±±, -
)
±±- .
;
±±. /
}
≤≤ 
return
¥¥ 
$str
¥¥ A
;
¥¥A B
}
µµ 
catch
∂∂ 
(
∂∂ 
	Exception
∂∂ 
)
∂∂ 
{
∑∑ 
return
∏∏ 
$str
∏∏ =
;
∏∏= >
}
ππ 
}
∫∫ 	
}
ªª 
}ºº …
eC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\AnonymizerService\IAnonymizerService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
AnonymizerService' 8
{ 
public 

	interface 
IAnonymizerService '
{ 
Task 
< 
string 
> 
AnonymizeTextAsync '
(' (
string( .
rawText/ 6
)6 7
;7 8
} 
} „+
jC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CheckupService\Dto\CheckupSummaryResponse.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
CheckupService' 5
.5 6
Dto6 9
{ 
public 

sealed 
class "
CheckupSummaryResponse .
{ 
public 
DateTime 
From 
{ 
get "
;" #
set$ '
;' (
}) *
public 
DateTime 
To 
{ 
get  
;  !
set" %
;% &
}' (
public 
List 
< 
CheckupDiagnosis $
>$ %
	Diagnoses& /
{0 1
get2 5
;5 6
set7 :
;: ;
}< =
=> ?
[@ A
]A B
;B C
public 
List 
< 
CheckupMedication %
>% &
Medications' 2
{3 4
get5 8
;8 9
set: =
;= >
}? @
=A B
[C D
]D E
;E F
public		 
List		 
<		 
CheckupSymptom		 "
>		" #
Symptoms		$ ,
{		- .
get		/ 2
;		2 3
set		4 7
;		7 8
}		9 :
=		; <
[		= >
]		> ?
;		? @
public

 
string

 
?

 
	AiSummary

  
{

! "
get

# &
;

& '
set

( +
;

+ ,
}

- .
} 
public 

sealed 
class 
CheckupDiagnosis (
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
? 
	ICD10Code  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
? 
	Diagnosis  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
int 
Year 
{ 
get 
; 
set "
;" #
}$ %
public 
string 
? 
Status 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
Comment 
{  
get! $
;$ %
set& )
;) *
}+ ,
} 
public 

sealed 
class 
CheckupMedication )
{ 
public 
int 
Id 
{ 
get 
; 
set  
;  !
}" #
public 
string 
? 
Name 
{ 
get !
;! "
set# &
;& '
}( )
public 
string 
? 
Dosage 
{ 
get  #
;# $
set% (
;( )
}* +
public 
string 
? 
IntakeFrequency &
{' (
get) ,
;, -
set. 1
;1 2
}3 4
public 
DateTime 
? 
IntakeStartDate (
{) *
get+ .
;. /
set0 3
;3 4
}5 6
public 
DateTime 
? 
EndDate  
{! "
get# &
;& '
set( +
;+ ,
}- .
public 
string 
? 

Indication !
{" #
get$ '
;' (
set) ,
;, -
}. /
public   
string   
?   
AtcCode   
{    
get  ! $
;  $ %
set  & )
;  ) *
}  + ,
}!! 
public## 

sealed## 
class## 
CheckupSymptom## &
{$$ 
public%% 
int%% 
Id%% 
{%% 
get%% 
;%% 
set%%  
;%%  !
}%%" #
public&& 
string&& 
?&& 
SymptomName&& "
{&&# $
get&&% (
;&&( )
set&&* -
;&&- .
}&&/ 0
public'' 
DateTime'' 
OccurrenceTime'' &
{''' (
get'') ,
;'', -
set''. 1
;''1 2
}''3 4
public(( 
int(( 
	Intensity(( 
{(( 
get(( "
;((" #
set(($ '
;((' (
}(() *
public)) 
string)) 
?)) 
Duration)) 
{))  !
get))" %
;))% &
set))' *
;))* +
})), -
public** 
string** 
?** 
PossibleTrigger** &
{**' (
get**) ,
;**, -
set**. 1
;**1 2
}**3 4
public++ 
string++ 
?++ 
Notes++ 
{++ 
get++ "
;++" #
set++$ '
;++' (
}++) *
},, 
}-- ı
iC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\CheckupService\Dto\CheckupSummaryRequest.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
CheckupService' 5
.5 6
Dto6 9
{ 
public 

sealed 
class !
CheckupSummaryRequest -
{ 
public 
DateTime 
From 
{ 
get "
;" #
set$ '
;' (
}) *
public 
DateTime 
To 
{ 
get  
;  !
set" %
;% &
}' (
} 
} ô
UC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\AIService\IAIService.cs
	namespace 	
Backend
 
. 
Application 
. 
Services &
.& '
	AIService' 0
{ 
public 

	interface 

IAIService 
{ 
Task 
< 
ServiceResult 
< 
AiExplainResponse ,
>, -
>- .
ExplainDiagnosis/ ?
(? @
int@ C
idD F
,F G
stringH N
?N O
userIdP V
,V W
intX [
diagnosisId\ g
)g h
;h i
Task		 
<		 
ServiceResult		 
<		 "
MedicationScanResponse		 1
>		1 2
>		2 3$
InterpretMedicationImage		4 L
(		L M
string		M S
base64		T Z
,		Z [
string		[ a
mimeType		b j
)		j k
;		k l
Task 
< 
ServiceResult 
< *
InterpretMedicalLetterResponse 9
>9 :
>: ;"
InterpretMedicalLetter< R
(R S
intS V
?V W
	patientIdX a
,a b
stringc i
?i j
userIdk q
,q r
strings y

letterText	z Ñ
)
Ñ Ö
;
Ö Ü
} 
} 
public 
sealed 
class *
InterpretMedicalLetterResponse 2
{ 
public 

object 
? 
	Extracted 
{ 
get "
;" #
set$ '
;' (
}) *
public 

object 
? 
Saved 
{ 
get 
; 
set  #
;# $
}% &
} ô–
TC:\sources\Fehldiagnosen\Backend\Backend\Application\Services\AIService\AIService.cs
	namespace		 	
Backend		
 
.		 
Application		 
.		 
Services		 &
.		& '
	AIService		' 0
{

 
public 

class 
	AIService 
: 

IAIService '
{ 
private 
readonly 
IPatientRepository +
_patientRepository, >
;> ?
private 
readonly  
IDiagnosisRepository - 
_diagnosisRepository. B
;B C
private 
readonly )
ICommunicationLevelRepository 6)
_communicationLevelRepository7 T
;T U
private 
readonly 
IDiagnosisService *
_diagnosisService+ <
;< =
private 
readonly 
IHttpClientFactory +
_httpClientFactory, >
;> ?
private 
readonly 
string  
_explanationEndpoint  4
;4 5
private 
readonly 
string 
_interpretEndpoint  2
;2 3
private 
readonly 
string #
_medicationScanEndpoint  7
;7 8
public 
	AIService 
( 
IPatientRepository +
patientRepository, =
,= > 
IDiagnosisRepository? S
diagnosisRepositoryT g
,g h*
ICommunicationLevelRepository	i Ü*
communicationLevelRepository
á £
,
£ § 
IHttpClientFactory
• ∑
httpClientFactory
∏ …
,
…  
IConfiguration
À Ÿ
configuration
⁄ Á
,
Á Ë
IDiagnosisService
È ˙
diagnosisService
˚ ã
)
ã å
{ 	
_patientRepository 
=  
patientRepository! 2
;2 3 
_diagnosisRepository  
=! "
diagnosisRepository# 6
;6 7)
_communicationLevelRepository )
=* +(
communicationLevelRepository, H
;H I
_httpClientFactory 
=  
httpClientFactory! 2
;2 3
_diagnosisService 
= 
diagnosisService  0
;0 1 
_explanationEndpoint    
=  ! "
configuration  # 0
[  0 1
$str  1 W
]  W X
??  Y [
string  \ b
.  b c
Empty  c h
;  h i
_interpretEndpoint!! 
=!!  
configuration!!! .
[!!. /
$str!!/ S
]!!S T
??!!U W
string!!X ^
.!!^ _
Empty!!_ d
;!!d e#
_medicationScanEndpoint"" #
=""$ %
configuration""& 3
[""3 4
$str""4 ]
]""] ^
??""_ a
string""b h
.""h i
Empty""i n
;""n o
}## 	
public%% 
async%% 
Task%% 
<%% 
ServiceResult%% '
<%%' (
AiExplainResponse%%( 9
>%%9 :
>%%: ;
ExplainDiagnosis%%< L
(%%L M
int%%M P
id%%Q S
,%%S T
string%%U [
?%%[ \
userId%%] c
,%%c d
int%%e h
diagnosisId%%i t
)%%t u
{&& 	
var'' 
	diagnosis'' 
='' 
await'' ! 
_diagnosisRepository''" 6
.''6 7
FindByIdAsync''7 D
(''D E
diagnosisId''E P
)''P Q
;''Q R
if)) 
()) 
	diagnosis)) 
==)) 
null)) !
)))! "
{** 
return++ 
ServiceResult++ $
<++$ %
AiExplainResponse++% 6
>++6 7
.++7 8
NotFound++8 @
(++@ A
$"++A C
$str++C S
{++S T
diagnosisId++T _
}++_ `
$str++` o
"++o p
)++p q
;++q r
},, 
var.. 
patient.. 
=.. 
await.. 
_patientRepository..  2
...2 3
FindByIdAsync..3 @
(..@ A
	diagnosis..A J
...J K
	PatientId..K T
)..T U
;..U V
if00 
(00 
userId00 
!=00 
null00 
&&00 !
(00" #
patient00# *
==00+ -
null00. 2
||003 5
patient006 =
.00= >
UserId00> D
!=00E G
userId00H N
)00N O
)00O P
{11 
return22 
ServiceResult22 $
<22$ %
AiExplainResponse22% 6
>226 7
.227 8
	Forbidden228 A
(22A B
$str22B d
)22d e
;22e f
}33 
var55 
communicationLevels55 #
=55$ %
await55& +)
_communicationLevelRepository55, I
.55I J
GetAllAsync55J U
(55U V
)55V W
;55W X
var77 
communicationLevel77 "
=77# $
communicationLevels77% 8
?778 9
.779 :
ToList77: @
(77@ A
)77A B
?77B C
.77C D
FirstOrDefault77D R
(77R S
level77S X
=>77Y [
level77\ a
.77a b
Id77b d
==77e g
patient77h o
?77o p
.77p q
CommunicationLevel	77q É
?
77É Ñ
.
77Ñ Ö
Id
77Ö á
)
77á à
??88 
communicationLevels88 /
?88/ 0
.880 1
ToList881 7
(887 8
)888 9
?889 :
.88: ;
FirstOrDefault88; I
(88I J
)88J K
;88K L
var:: 
payload:: 
=:: 
new:: 
{:: 
	langLevel;; 
=;; 
communicationLevel;; .
?;;. /
.;;/ 0
Name;;0 4
??;;5 7
$str;;8 <
,;;< =
kiPrompt<< 
=<< 
communicationLevel<< -
?<<- .
.<<. /
KiPrompt<</ 7
??<<8 :
$str<<; =
,<<= >
	diagnosis== 
=== 
	diagnosis== %
.==% &
Title==& +
,==+ ,
	icd10Code>> 
=>> 
	diagnosis>> %
.>>% &
IcdCode>>& -
??>>. 0
string>>1 7
.>>7 8
Empty>>8 =
,>>= >
year?? 
=?? 
	diagnosis??  
.??  !
DiagnosisDate??! .
.??. /
Year??/ 3
,??3 4
status@@ 
=@@ 
(@@ 
int@@ 
)@@ 
	diagnosis@@ '
.@@' (
ConditionStatus@@( 7
,@@7 8
entryByAA 
=AA 
(AA 
intAA 
)AA 
	diagnosisAA (
.AA( )
EntryByAA) 0
,AA0 1
commentBB 
=BB 
	diagnosisBB #
.BB# $
NoteBB$ (
??BB) +
stringBB, 2
.BB2 3
EmptyBB3 8
}CC 
;CC 
tryEE 
{FF 
varGG 

httpClientGG 
=GG  
_httpClientFactoryGG! 3
.GG3 4
CreateClientGG4 @
(GG@ A
)GGA B
;GGB C
usingHH 
varHH 
responseHH "
=HH# $
awaitHH% *

httpClientHH+ 5
.HH5 6
PostAsJsonAsyncHH6 E
(HHE F 
_explanationEndpointHHF Z
,HHZ [
payloadHH\ c
)HHc d
;HHd e
varII 
responseBodyII  
=II! "
awaitII# (
responseII) 1
.II1 2
ContentII2 9
.II9 :
ReadAsStringAsyncII: K
(IIK L
)IIL M
;IIM N
varKK 

aiResponseKK 
=KK  
JsonSerializerKK! /
.KK/ 0
DeserializeKK0 ;
<KK; <
AiExplainResponseKK< M
>KKM N
(KKN O
responseBodyKKO [
,KK[ \
newLL !
JsonSerializerOptionsLL -
{LL. /'
PropertyNameCaseInsensitiveLL0 K
=LLL M
trueLLN R
}LLS T
)LLT U
;LLU V
ifNN 
(NN 

aiResponseNN 
==NN !
nullNN" &
||NN' )
stringNN* 0
.NN0 1
IsNullOrWhiteSpaceNN1 C
(NNC D

aiResponseNND N
.NNN O
TextNNO S
)NNS T
)NNT U
{OO 
returnPP 
ServiceResultPP (
<PP( )
AiExplainResponsePP) :
>PP: ;
.PP; <
InternalServerErrorPP< O
(PPO P
$strPPP u
)PPu v
;PPv w
}QQ 
varSS 
updateResultSS  
=SS! "
awaitSS# (
_diagnosisServiceSS) :
.SS: ;
UpdateAiExplanationSS; N
(SSN O
	diagnosisSSO X
.SSX Y
IdSSY [
,SS[ \

aiResponseSS] g
.SSg h
TextSSh l
)SSl m
;SSm n
ifUU 
(UU 
!UU 
updateResultUU !
.UU! "
	IsSuccessUU" +
)UU+ ,
{VV 
returnWW 
ServiceResultWW (
<WW( )
AiExplainResponseWW) :
>WW: ;
.WW; <
InternalServerErrorWW< O
(WWO P
$strWWP ~
)WW~ 
;	WW Ä
}XX 

aiResponseZZ 
.ZZ 

DisclaimerZZ %
=ZZ& '
	DiagnosisZZ( 1
.ZZ1 2#
AiExplanationDisclaimerZZ2 I
;ZZI J
return\\ 
ServiceResult\\ $
<\\$ %
AiExplainResponse\\% 6
>\\6 7
.\\7 8
Success\\8 ?
(\\? @

aiResponse\\@ J
)\\J K
;\\K L
}]] 
catch^^ 
(^^ 
	Exception^^ 
)^^ 
{__ 
return`` 
ServiceResult`` $
<``$ %
AiExplainResponse``% 6
>``6 7
.``7 8
InternalServerError``8 K
(``K L
$str``L q
)``q r
;``r s
}aa 
}bb 	
publicdd 
asyncdd 
Taskdd 
<dd 
ServiceResultdd '
<dd' (*
InterpretMedicalLetterResponsedd( F
>ddF G
>ddG H"
InterpretMedicalLetterddI _
(dd_ `
intdd` c
?ddc d
	patientIddde n
,ddn o
stringddp v
?ddv w
userIdddx ~
,dd~ 
string
ddÄ Ü

letterText
ddá ë
)
ddë í
{ee 	
ifff 
(ff 
stringff 
.ff 
IsNullOrWhiteSpaceff )
(ff) *
_interpretEndpointff* <
)ff< =
)ff= >
{gg 
returnhh 
ServiceResulthh $
<hh$ %*
InterpretMedicalLetterResponsehh% C
>hhC D
.hhD E
InternalServerErrorhhE X
(hhX Y
$str	hhY É
)
hhÉ Ñ
;
hhÑ Ö
}ii 
varkk 
payloadkk 
=kk 
newkk 
{ll 

letterTextmm 
,mm 
	patientIdnn 
=nn 
(nn 
intnn  
?nn  !
)nn! "
nullnn" &
}oo 
;oo 
tryqq 
{rr 
varss 

httpClientss 
=ss  
_httpClientFactoryss! 3
.ss3 4
CreateClientss4 @
(ss@ A
)ssA B
;ssB C
usingtt 
vartt 
responsett "
=tt# $
awaittt% *

httpClienttt+ 5
.tt5 6
PostAsJsonAsynctt6 E
(ttE F
_interpretEndpointttF X
,ttX Y
payloadttZ a
)tta b
;ttb c
ifvv 
(vv 
!vv 
responsevv 
.vv 
IsSuccessStatusCodevv 1
)vv1 2
{ww 
returnxx 
ServiceResultxx (
<xx( )*
InterpretMedicalLetterResponsexx) G
>xxG H
.xxH I
InternalServerErrorxxI \
(xx\ ]
$strxx] 
)	xx Ä
;
xxÄ Å
}yy 
var{{ 
responseBody{{  
={{! "
await{{# (
response{{) 1
.{{1 2
Content{{2 9
.{{9 :
ReadAsStringAsync{{: K
({{K L
){{L M
;{{M N
var}} 

aiResponse}} 
=}}  
JsonSerializer}}! /
.}}/ 0
Deserialize}}0 ;
<}}; <
NodeResponseWrapper}}< O
>}}O P
(}}P Q
responseBody}}Q ]
,}}] ^
new~~ !
JsonSerializerOptions~~ -
{~~. /'
PropertyNameCaseInsensitive~~0 K
=~~L M
true~~N R
}~~S T
)~~T U
;~~U V
if
ÄÄ 
(
ÄÄ 

aiResponse
ÄÄ 
?
ÄÄ 
.
ÄÄ  
	Extracted
ÄÄ  )
==
ÄÄ* ,
null
ÄÄ- 1
)
ÄÄ1 2
{
ÅÅ 
return
ÇÇ 
ServiceResult
ÇÇ (
<
ÇÇ( ),
InterpretMedicalLetterResponse
ÇÇ) G
>
ÇÇG H
.
ÇÇH I!
InternalServerError
ÇÇI \
(
ÇÇ\ ]
$strÇÇ] Ç
)ÇÇÇ É
;ÇÇÉ Ñ
}
ÉÉ 
object
ÖÖ 
?
ÖÖ 
savedDiagnosis
ÖÖ &
=
ÖÖ' (
null
ÖÖ) -
;
ÖÖ- .
var
ÜÜ 
	createReq
ÜÜ 
=
ÜÜ 

aiResponse
ÜÜ  *
.
ÜÜ* +
	Extracted
ÜÜ+ 4
;
ÜÜ4 5
if
àà 
(
àà 
	patientId
àà 
.
àà 
HasValue
àà &
)
àà& '
{
ââ 
try
ää 
{
ãã 
	createReq
åå !
.
åå! "
	PatientId
åå" +
=
åå, -
	patientId
åå. 7
.
åå7 8
Value
åå8 =
;
åå= >
	createReq
çç !
.
çç! "
Title
çç" '
=
çç( )
string
çç* 0
.
çç0 1 
IsNullOrWhiteSpace
çç1 C
(
ççC D
	createReq
ççD M
.
ççM N
Title
ççN S
)
ççS T
?
ççU V
$str
ççW l
:
ççm n
	createReq
çço x
.
ççx y
Title
ççy ~
;
çç~ 
	createReq
éé !
.
éé! "
Description
éé" -
??=
éé. 1
string
éé2 8
.
éé8 9
Empty
éé9 >
;
éé> ?
	createReq
èè !
.
èè! "
IcdCode
èè" )
??=
èè* -
string
èè. 4
.
èè4 5
Empty
èè5 :
;
èè: ;
	createReq
êê !
.
êê! "
Severity
êê" *
??=
êê+ .
string
êê/ 5
.
êê5 6
Empty
êê6 ;
;
êê; <
	createReq
ëë !
.
ëë! "
SideLocalization
ëë" 2
??=
ëë3 6
string
ëë7 =
.
ëë= >
Empty
ëë> C
;
ëëC D
	createReq
íí !
.
íí! "
MedicationText
íí" 0
??=
íí1 4
string
íí5 ;
.
íí; <
Empty
íí< A
;
ííA B
	createReq
ìì !
.
ìì! "
Symptoms
ìì" *
??=
ìì+ .
string
ìì/ 5
.
ìì5 6
Empty
ìì6 ;
;
ìì; <
	createReq
îî !
.
îî! "
Findings
îî" *
??=
îî+ .
string
îî/ 5
.
îî5 6
Empty
îî6 ;
;
îî; <
	createReq
ïï !
.
ïï! "!
TherapeuticMeasures
ïï" 5
??=
ïï6 9
string
ïï: @
.
ïï@ A
Empty
ïïA F
;
ïïF G
if
óó 
(
óó 
	createReq
óó %
.
óó% &
DiagnosisDate
óó& 3
==
óó4 6
default
óó7 >
)
óó> ?
{
òò 
	createReq
ôô %
.
ôô% &
DiagnosisDate
ôô& 3
=
ôô4 5
DateTime
ôô6 >
.
ôô> ?
UtcNow
ôô? E
;
ôôE F
}
öö 
if
úú 
(
úú 
	createReq
úú %
.
úú% &
ConditionStatus
úú& 5
==
úú6 8
default
úú9 @
)
úú@ A
{
ùù 
	createReq
ûû %
.
ûû% &
ConditionStatus
ûû& 5
=
ûû6 7
ConditionStatus
ûû8 G
.
ûûG H
Active
ûûH N
;
ûûN O
}
üü 
var
°° 
createdResult
°° )
=
°°* +
await
°°, 1
_diagnosisService
°°2 C
.
°°C D
CreateAsync
°°D O
(
°°O P
	patientId
°°P Y
.
°°Y Z
Value
°°Z _
,
°°_ `
	createReq
°°a j
,
°°j k
userId
°°l r
)
°°r s
;
°°s t
if
¢¢ 
(
¢¢ 
createdResult
¢¢ )
.
¢¢) *
	IsSuccess
¢¢* 3
)
¢¢3 4
{
££ 
savedDiagnosis
§§ *
=
§§+ ,
createdResult
§§- :
.
§§: ;
Data
§§; ?
;
§§? @
}
•• 
}
¶¶ 
catch
ßß 
{
®® 
}
©© 
}
™™ 
var
¨¨ 
result
¨¨ 
=
¨¨ 
new
¨¨  ,
InterpretMedicalLetterResponse
¨¨! ?
{
≠≠ 
	Extracted
ÆÆ 
=
ÆÆ 
	createReq
ÆÆ  )
,
ÆÆ) *
Saved
ØØ 
=
ØØ 
savedDiagnosis
ØØ *
}
∞∞ 
;
∞∞ 
return
≤≤ 
ServiceResult
≤≤ $
<
≤≤$ %,
InterpretMedicalLetterResponse
≤≤% C
>
≤≤C D
.
≤≤D E
Success
≤≤E L
(
≤≤L M
result
≤≤M S
)
≤≤S T
;
≤≤T U
}
≥≥ 
catch
¥¥ 
(
¥¥ 
	Exception
¥¥ 
)
¥¥ 
{
µµ 
return
∂∂ 
ServiceResult
∂∂ $
<
∂∂$ %,
InterpretMedicalLetterResponse
∂∂% C
>
∂∂C D
.
∂∂D E!
InternalServerError
∂∂E X
(
∂∂X Y
$str
∂∂Y ~
)
∂∂~ 
;∂∂ Ä
}
∑∑ 
}
∏∏ 	
public
∫∫ 
async
∫∫ 
Task
∫∫ 
<
∫∫ 
ServiceResult
∫∫ '
<
∫∫' ($
MedicationScanResponse
∫∫( >
>
∫∫> ?
>
∫∫? @&
InterpretMedicationImage
∫∫A Y
(
∫∫Y Z
string
∫∫Z `
base64
∫∫a g
,
∫∫g h
string
∫∫i o
mimeType
∫∫p x
)
∫∫x y
{
ªª 	
if
ºº 
(
ºº 
string
ºº 
.
ºº  
IsNullOrWhiteSpace
ºº )
(
ºº) *%
_medicationScanEndpoint
ºº* A
)
ººA B
)
ººB C
{
ΩΩ 
return
ææ 
ServiceResult
ææ $
<
ææ$ %$
MedicationScanResponse
ææ% ;
>
ææ; <
.
ææ< =!
InternalServerError
ææ= P
(
ææP Q
$strææQ Ä
)ææÄ Å
;ææÅ Ç
}
øø 
var
¡¡ 
payload
¡¡ 
=
¡¡ 
new
¡¡ 
{
¡¡ 
imageBase64
¡¡  +
=
¡¡, -
base64
¡¡. 4
,
¡¡4 5
mimeType
¡¡6 >
}
¡¡? @
;
¡¡@ A
try
√√ 
{
ƒƒ 
var
≈≈ 

httpClient
≈≈ 
=
≈≈   
_httpClientFactory
≈≈! 3
.
≈≈3 4
CreateClient
≈≈4 @
(
≈≈@ A
)
≈≈A B
;
≈≈B C
using
∆∆ 
var
∆∆ 
response
∆∆ "
=
∆∆# $
await
∆∆% *

httpClient
∆∆+ 5
.
∆∆5 6
PostAsJsonAsync
∆∆6 E
(
∆∆E F%
_medicationScanEndpoint
∆∆F ]
,
∆∆] ^
payload
∆∆_ f
)
∆∆f g
;
∆∆g h
if
»» 
(
»» 
!
»» 
response
»» 
.
»» !
IsSuccessStatusCode
»» 1
)
»»1 2
{
…… 
return
   
ServiceResult
   (
<
  ( )$
MedicationScanResponse
  ) ?
>
  ? @
.
  @ A!
InternalServerError
  A T
(
  T U
$str
  U w
)
  w x
;
  x y
}
ÀÀ 
var
ÕÕ 
responseBody
ÕÕ  
=
ÕÕ! "
await
ÕÕ# (
response
ÕÕ) 1
.
ÕÕ1 2
Content
ÕÕ2 9
.
ÕÕ9 :
ReadAsStringAsync
ÕÕ: K
(
ÕÕK L
)
ÕÕL M
;
ÕÕM N
Console
œœ 
.
œœ 
	WriteLine
œœ !
(
œœ! "
$str
œœ" 9
)
œœ9 :
;
œœ: ;
Console
–– 
.
–– 
	WriteLine
–– !
(
––! "
responseBody
––" .
)
––. /
;
––/ 0
var
““ 
result
““ 
=
““ 
JsonSerializer
““ +
.
““+ ,
Deserialize
““, 7
<
““7 8$
MedicationScanResponse
““8 N
>
““N O
(
““O P
responseBody
““P \
,
““\ ]
new
”” #
JsonSerializerOptions
”” -
{
””. /)
PropertyNameCaseInsensitive
””0 K
=
””L M
true
””N R
}
””S T
)
””T U
;
””U V
if
÷÷ 
(
÷÷ 
result
÷÷ 
==
÷÷ 
null
÷÷ "
||
÷÷# %
string
÷÷& ,
.
÷÷, - 
IsNullOrWhiteSpace
÷÷- ?
(
÷÷? @
result
÷÷@ F
.
÷÷F G
Brand
÷÷G L
)
÷÷L M
)
÷÷M N
{
◊◊ 
return
ÿÿ 
ServiceResult
ÿÿ (
<
ÿÿ( )$
MedicationScanResponse
ÿÿ) ?
>
ÿÿ? @
.
ÿÿ@ A!
InternalServerError
ÿÿA T
(
ÿÿT U
$str
ÿÿU s
)
ÿÿs t
;
ÿÿt u
}
ŸŸ 
Console
€€ 
.
€€ 
	WriteLine
€€ !
(
€€! "
$"
€€" $
$str
€€$ 6
{
€€6 7
result
€€7 =
.
€€= >
Brand
€€> C
}
€€C D
$str
€€D R
{
€€R S
result
€€S Y
.
€€Y Z
ProductName
€€Z e
}
€€e f
$str
€€f y
{
€€y z
result€€z Ä
.€€Ä Å 
ActiveIngredient€€Å ë
}€€ë í
$str€€í õ
{€€õ ú
result€€ú ¢
.€€¢ £
Dosage€€£ ©
}€€© ™
$str€€™ ±
{€€± ≤
result€€≤ ∏
.€€∏ π
Form€€π Ω
}€€Ω æ
"€€æ ø
)€€ø ¿
;€€¿ ¡
return
›› 
ServiceResult
›› $
<
››$ %$
MedicationScanResponse
››% ;
>
››; <
.
››< =
Success
››= D
(
››D E
result
››E K
)
››K L
;
››L M
}
ﬁﬁ 
catch
ﬂﬂ 
(
ﬂﬂ 
	Exception
ﬂﬂ 
ex
ﬂﬂ 
)
ﬂﬂ  
{
‡‡ 
Console
·· 
.
·· 
	WriteLine
·· !
(
··! "
ex
··" $
)
··$ %
;
··% &
return
‚‚ 
ServiceResult
‚‚ $
<
‚‚$ %$
MedicationScanResponse
‚‚% ;
>
‚‚; <
.
‚‚< =!
InternalServerError
‚‚= P
(
‚‚P Q
$str
‚‚Q v
)
‚‚v w
;
‚‚w x
}
„„ 
}
‰‰ 	
}
ÂÂ 
public
ÁÁ 

sealed
ÁÁ 
class
ÁÁ ,
InterpretMedicalLetterResponse
ÁÁ 6
{
ËË 
public
ÈÈ 
object
ÈÈ 
?
ÈÈ 
	Extracted
ÈÈ  
{
ÈÈ! "
get
ÈÈ# &
;
ÈÈ& '
set
ÈÈ( +
;
ÈÈ+ ,
}
ÈÈ- .
public
ÍÍ 
object
ÍÍ 
?
ÍÍ 
Saved
ÍÍ 
{
ÍÍ 
get
ÍÍ "
;
ÍÍ" #
set
ÍÍ$ '
;
ÍÍ' (
}
ÍÍ) *
}
ÎÎ 
public
ÌÌ 

sealed
ÌÌ 
class
ÌÌ !
NodeResponseWrapper
ÌÌ +
{
ÓÓ 
public
ÔÔ $
CreateDiagnosisRequest
ÔÔ %
?
ÔÔ% &
	Extracted
ÔÔ' 0
{
ÔÔ1 2
get
ÔÔ3 6
;
ÔÔ6 7
set
ÔÔ8 ;
;
ÔÔ; <
}
ÔÔ= >
}
 
public
ÚÚ 

sealed
ÚÚ 
class
ÚÚ #
MedicationNodeWrapper
ÚÚ -
{
ÛÛ 
public
ÙÙ $
MedicationScanResponse
ÙÙ %
?
ÙÙ% &
	Extracted
ÙÙ' 0
{
ÙÙ1 2
get
ÙÙ3 6
;
ÙÙ6 7
set
ÙÙ8 ;
;
ÙÙ; <
}
ÙÙ= >
}
ıı 
public
˜˜ 

sealed
˜˜ 
class
˜˜ $
MedicationScanResponse
˜˜ .
{
¯¯ 
public
˘˘ 
string
˘˘ 
?
˘˘ 
Brand
˘˘ 
{
˘˘ 
get
˘˘ "
;
˘˘" #
set
˘˘$ '
;
˘˘' (
}
˘˘) *
public
˙˙ 
string
˙˙ 
?
˙˙ 
ProductName
˙˙ "
{
˙˙# $
get
˙˙% (
;
˙˙( )
set
˙˙* -
;
˙˙- .
}
˙˙/ 0
public
˚˚ 
string
˚˚ 
?
˚˚ 
ActiveIngredient
˚˚ '
{
˚˚( )
get
˚˚* -
;
˚˚- .
set
˚˚/ 2
;
˚˚2 3
}
˚˚4 5
public
¸¸ 
string
¸¸ 
?
¸¸ 
Dosage
¸¸ 
{
¸¸ 
get
¸¸  #
;
¸¸# $
set
¸¸% (
;
¸¸( )
}
¸¸* +
public
˝˝ 
string
˝˝ 
?
˝˝ 
Form
˝˝ 
{
˝˝ 
get
˝˝ !
;
˝˝! "
set
˝˝# &
;
˝˝& '
}
˝˝( )
}
˛˛ 
}ˇˇ 
publicÄÄ 
sealed
ÄÄ 
class
ÄÄ %
ExplainDiagnosisRequest
ÄÄ +
{ÅÅ 
public
ÇÇ 

string
ÇÇ 
?
ÇÇ 
	LangLevel
ÇÇ 
{
ÇÇ 
get
ÇÇ "
;
ÇÇ" #
set
ÇÇ$ '
;
ÇÇ' (
}
ÇÇ) *
}ÉÉ 
publicÖÖ 
sealed
ÖÖ 
class
ÖÖ 
AiExplainResponse
ÖÖ %
{ÜÜ 
public
áá 

string
áá 
?
áá 
Text
áá 
{
áá 
get
áá 
;
áá 
set
áá "
;
áá" #
}
áá$ %
public
àà 

string
àà 
?
àà 

Disclaimer
àà 
{
àà 
get
àà  #
;
àà# $
set
àà% (
;
àà( )
}
àà* +
}ââ »
aC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\ISymptomDefinitionRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface (
ISymptomDefinitionRepository 1
:2 3
IRepository4 ?
<? @
SymptomDefinition@ Q
>Q R
{ 
Task 
< 
IEnumerable 
< 
SymptomDefinition *
>* +
>+ ,
SearchByNameAsync- >
(> ?
string? E
nameF J
)J K
;K L
}		 
}

 ı

PC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IRepository.cs
	namespace 	
Backend
 
. 
Domain 
. 

Interfaces #
{ 
public 

	interface 
IRepository  
<  !
TEntity! (
>( )
where* /
TEntity0 7
:8 9
class: ?
,? @
IEntityA H
{ 
Task 
< 
List 
< 
TEntity 
> 
> 
FindAllAsync (
(( )
)) *
;* +
Task

 
<

 
TEntity

 
?

 
>

 
FindByIdAsync

 $
(

$ %
int

% (
id

) +
)

+ ,
;

, -
Task 
< 
TEntity 
> 
AddAsync 
( 
TEntity &
entity' -
)- .
;. /
Task 
< 
TEntity 
> 
UpdateAsync !
(! "
TEntity" )
entity* 0
)0 1
;1 2
Task 
< 
TEntity 
> 
DeleteAsync !
(! "
TEntity" )
entity* 0
)0 1
;1 2
} 
} â
^C:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IPatientSymptomRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface %
IPatientSymptomRepository .
:/ 0
IRepository1 <
<< =
PatientSymptom= K
>K L
{ 
Task 
< 
IEnumerable 
< 
PatientSymptom '
>' (
>( )#
FindAllByPatientIdAsync* A
(A B
intB E
	patientIdF O
)O P
;P Q
Task

 
<

 
IEnumerable

 
<

 
PatientSymptom

 '
>

' (
>

( )*
FindAllByPatientIdAndDateAsync

* H
(

H I
int

I L
symptomDefinitionId

M `
,

` a
DateTime

b j
date

k o
)

o p
;

p q
} 
} …
WC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IPatientRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface 
IPatientRepository '
{ 
Task 
< 
Patient 
? 
> 
FindByIdAsync $
($ %
int% (
id) +
)+ ,
;, -
Task		 
<		 
Patient		 
>		 
UpdateAsync		 !
(		! "
Patient		" )
patient		* 1
)		1 2
;		2 3
}

 
} ¥
ZC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IMedicationrepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface !
IMedicationRepository *
:* +
IRepository, 7
<7 8

Medication8 B
>B C
{ 
Task 
< 
IEnumerable 
< 

Medication #
># $
>$ %#
FindAllByPatientIdAsync& =
(= >
int> A
	patientIdB K
)K L
;L M
}		 
}

 ƒ
]C:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IMedicalLetterRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface $
IMedicalLetterRepository -
:. /
IRepository0 ;
<; <
MedicalLetter< I
>I J
{ 
} 
}		 ÿ
cC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IMedicalHistoryEntryRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface *
IMedicalHistoryEntryRepository 3
:4 5
IRepository6 A
<A B
MedicalHistoryEntryB U
>U V
{ 
Task 
< 
IEnumerable 
< 
MedicalHistoryEntry ,
>, -
>- .#
FindAllByPatientIdAsync/ F
(F G
intG J
	patientIdK T
)T U
;U V
}		 
}

 ï

_C:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IKnownMedicationRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface &
IKnownMedicationRepository /
{ 
Task 
< 
IEnumerable 
< 
KnownMedication (
>( )
>) *
SearchAsync+ 6
(6 7
string7 =
query> C
)C D
;D E
Task

 
RebuildFromCsvAsync

  
(

  !
string

! '
csvPath

( /
)

/ 0
;

0 1
Task 
< 
IEnumerable 
< 
KnownMedication (
>( )
>) *
IdentifyAsync+ 8
(8 9
string9 ?
?? @
brandA F
,F G
stringH N
?N O
productNameP [
,[ \
string] c
?c d
activeIngrediente u
,u v
stringw }
?} ~
dosage	 Ö
,
Ö Ü
string
á ç
?
ç é
form
è ì
)
ì î
;
î ï
} 
} ‘
bC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IFamilyHistoryEntryRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface )
IFamilyHistoryEntryRepository 2
:3 4
IRepository5 @
<@ A
FamilyHistoryEntryA S
>S T
{ 
Task 
< 
IEnumerable 
< 
FamilyHistoryEntry +
>+ ,
>, -#
FindAllByPatientIdAsync. E
(E F
intF I
	patientIdJ S
)S T
;T U
}		 
}

 ß
_C:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IDrugInteractionRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface &
IDrugInteractionRepository /
{ 
Task 
< 
string 
? 
> '
GetDrugBankIdByAtcCodeAsync 1
(1 2
string2 8
atcCode9 @
)@ A
;A B
Task		 
<		 
List		 
<		 
string		 
>		 
>		 )
GetDrugBankIdsByAtcCodesAsync		 8
(		8 9
List		9 =
<		= >
string		> D
>		D E
atcCode		F M
)		M N
;		N O
Task

 
<

 
List

 
<

 
DrugInteraction

 !
>

! "
>

" # 
GetInteractionsAsync

$ 8
(

8 9
string

9 ?
newDrugBankId

@ M
,

M N
List

O S
<

S T
string

T Z
>

Z [
existingDrugBankIds

\ o
)

o p
;

p q
Task 
RebuildFromXmlAsync  
(  !
string! '
csvPath( /
)/ 0
;0 1
Task 
< 
List 
< 
DrugInteraction !
>! "
>" #%
GetInteractionsAmongAsync$ =
(= >
List> B
<B C
stringC I
>I J
drugBankIdsK V
)V W
;W X
Task 
< 
List 
< 

DrugDetail 
> 
> 
GetDrugDetailsAsync 2
(2 3
List3 7
<7 8
string8 >
>> ?
drugBankIds@ K
)K L
;L M
} 
} ∞
YC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\IDiagnosisRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface  
IDiagnosisRepository )
:* +
IRepository, 7
<7 8
	Diagnosis8 A
>A B
{ 
Task 
< 
IEnumerable 
< 
	Diagnosis "
>" #
># $#
FindAllByPatientIdAsync% <
(< =
int= @
	patientIdA J
)J K
;K L
}		 
}

 ≤	
bC:\sources\Fehldiagnosen\Backend\Backend\Application\Repositories\ICommunicationLevelRepository.cs
	namespace 	
Backend
 
. 
Application 
. 
Repositories *
{ 
public 

	interface )
ICommunicationLevelRepository 2
{ 
Task 
< 
CommunicationLevel 
?  
>  !
FindByNameAsync" 1
(1 2
string2 8
name9 =
)= >
;> ?
Task 
< 
CommunicationLevel 
?  
>  ! 
FindByPatientIdAsync" 6
(6 7
int7 :
	patientId; D
)D E
;E F
Task		 
<		 
CommunicationLevel		 
>		  
AddAsync		! )
(		) *
CommunicationLevel		* <
communicationLevel		= O
)		O P
;		P Q
Task

 
<

 
IEnumerable

 
<

 
CommunicationLevel

 +
>

+ ,
>

, -
GetAllAsync

. 9
(

9 :
)

: ;
;

; <
} 
} œC
TC:\sources\Fehldiagnosen\Backend\Backend\Application\Common\Results\ServiceResult.cs
	namespace 	
Backend
 
. 
Application 
. 
Common $
.$ %
Results% ,
{ 
public 

class 
ServiceResult 
{ 
public 
bool 
	IsSuccess 
=>  
	ErrorType! *
==+ -
ServiceErrorType. >
.> ?
None? C
;C D
public 
string 
? 
ErrorMessage #
{$ %
get& )
;) *
set+ .
;. /
}0 1
public 
ServiceErrorType 
	ErrorType  )
{* +
get, /
;/ 0
set1 4
;4 5
}6 7
public

 
static

 
ServiceResult

 #
Success

$ +
(

+ ,
)

, -
{ 	
return 
new 
ServiceResult $
{% &
	ErrorType' 0
=1 2
ServiceErrorType3 C
.C D
NoneD H
}I J
;J K
} 	
public 
static 
ServiceResult #
Conflict$ ,
(, -
string- 3
errorMessage4 @
)@ A
{ 	
return 
new 
ServiceResult $
{% &
ErrorMessage' 3
=4 5
errorMessage6 B
,B C
	ErrorTypeD M
=N O
ServiceErrorTypeP `
.` a
Conflicta i
}j k
;k l
} 	
public 
static 
ServiceResult #
NotFound$ ,
(, -
string- 3
errorMessage4 @
)@ A
{ 	
return 
new 
ServiceResult $
{% &
ErrorMessage' 3
=4 5
errorMessage6 B
,B C
	ErrorTypeD M
=N O
ServiceErrorTypeP `
.` a
NotFounda i
}j k
;k l
} 	
public 
static 
ServiceResult #
Invalid$ +
(+ ,
string, 2
errorMessage3 ?
)? @
{ 	
return 
new 
ServiceResult $
{% &
ErrorMessage' 3
=4 5
errorMessage6 B
,B C
	ErrorTypeD M
=N O
ServiceErrorTypeP `
.` a
ValidationErrora p
}q r
;r s
} 	
public 
static 
ServiceResult #
Unauthorized$ 0
(0 1
string1 7
errorMessage8 D
)D E
{ 	
return   
new   
ServiceResult   $
{  % &
ErrorMessage  ' 3
=  4 5
errorMessage  6 B
,  B C
	ErrorType  D M
=  N O
ServiceErrorType  P `
.  ` a
Unauthorized  a m
}  n o
;  o p
}!! 	
public## 
static## 
ServiceResult## #
InternalServerError##$ 7
(##7 8
string##8 >
errorMessage##? K
)##K L
{$$ 	
return%% 
new%% 
ServiceResult%% $
{%%% &
ErrorMessage%%' 3
=%%4 5
errorMessage%%6 B
,%%B C
	ErrorType%%D M
=%%N O
ServiceErrorType%%P `
.%%` a
InternalServerError%%a t
}%%u v
;%%v w
}&& 	
public(( 
static(( 
ServiceResult(( #
	Forbidden(($ -
(((- .
string((. 4
errorMessage((5 A
)((A B
{)) 	
return** 
new** 
ServiceResult** $
{**% &
ErrorMessage**' 3
=**4 5
errorMessage**6 B
,**B C
	ErrorType**D M
=**N O
ServiceErrorType**P `
.**` a
	Forbidden**a j
}**k l
;**l m
}++ 	
}-- 
public.. 

class.. 
ServiceResult.. 
<.. 
T..  
>..  !
:.." #
ServiceResult..$ 1
{// 
public00 
T00 
?00 
Data00 
{00 
get00 
;00 
set00 !
;00! "
}00# $
public44 
static44 
ServiceResult44 #
<44# $
T44$ %
>44% &
Success44' .
(44. /
T44/ 0
data441 5
)445 6
{55 	
return66 
new66 
ServiceResult66 $
<66$ %
T66% &
>66& '
{66( )
Data66* .
=66/ 0
data661 5
,665 6
	ErrorType667 @
=66A B
ServiceErrorType66C S
.66S T
None66T X
}66Y Z
;66Z [
}77 	
public99 
static99 
ServiceResult99 #
<99# $
T99$ %
>99% &
Conflict99' /
(99/ 0
string990 6
errorMessage997 C
)99C D
{:: 	
return;; 
new;; 
ServiceResult;; $
<;;$ %
T;;% &
>;;& '
{;;( )
ErrorMessage;;* 6
=;;7 8
errorMessage;;9 E
,;;E F
	ErrorType;;G P
=;;Q R
ServiceErrorType;;S c
.;;c d
Conflict;;d l
};;m n
;;;n o
}<< 	
public>> 
static>> 
ServiceResult>> #
<>># $
T>>$ %
>>>% &
NotFound>>' /
(>>/ 0
string>>0 6
errorMessage>>7 C
)>>C D
{?? 	
return@@ 
new@@ 
ServiceResult@@ $
<@@$ %
T@@% &
>@@& '
{@@( )
ErrorMessage@@* 6
=@@7 8
errorMessage@@9 E
,@@E F
	ErrorType@@G P
=@@Q R
ServiceErrorType@@S c
.@@c d
NotFound@@d l
}@@m n
;@@n o
}AA 	
publicCC 
staticCC 
ServiceResultCC #
<CC# $
TCC$ %
>CC% &
InvalidCC' .
(CC. /
stringCC/ 5
errorMessageCC6 B
)CCB C
{DD 	
returnEE 
newEE 
ServiceResultEE $
<EE$ %
TEE% &
>EE& '
{EE( )
ErrorMessageEE* 6
=EE7 8
errorMessageEE9 E
,EEE F
	ErrorTypeEEG P
=EEQ R
ServiceErrorTypeEES c
.EEc d
ValidationErrorEEd s
}EEt u
;EEu v
}FF 	
publicHH 
staticHH 
ServiceResultHH #
<HH# $
THH$ %
>HH% &
UnauthorizedHH' 3
(HH3 4
stringHH4 :
errorMessageHH; G
)HHG H
{II 	
returnJJ 
newJJ 
ServiceResultJJ $
<JJ$ %
TJJ% &
>JJ& '
{JJ( )
ErrorMessageJJ* 6
=JJ7 8
errorMessageJJ9 E
,JJE F
	ErrorTypeJJG P
=JJQ R
ServiceErrorTypeJJS c
.JJc d
UnauthorizedJJd p
}JJq r
;JJr s
}KK 	
publicMM 
staticMM 
ServiceResultMM #
<MM# $
TMM$ %
>MM% &
InternalServerErrorMM' :
(MM: ;
stringMM; A
errorMessageMMB N
)MMN O
{NN 	
returnOO 
newOO 
ServiceResultOO $
<OO$ %
TOO% &
>OO& '
{OO( )
ErrorMessageOO* 6
=OO7 8
errorMessageOO9 E
,OOE F
	ErrorTypeOOG P
=OOQ R
ServiceErrorTypeOOS c
.OOc d
InternalServerErrorOOd w
}OOx y
;OOy z
}PP 	
publicRR 
staticRR 
ServiceResultRR #
<RR# $
TRR$ %
>RR% &
	ForbiddenRR' 0
(RR0 1
stringRR1 7
errorMessageRR8 D
)RRD E
{SS 	
returnTT 
newTT 
ServiceResultTT $
<TT$ %
TTT% &
>TT& '
{TT( )
ErrorMessageTT* 6
=TT7 8
errorMessageTT9 E
,TTE F
	ErrorTypeTTG P
=TTQ R
ServiceErrorTypeTTS c
.TTc d
	ForbiddenTTd m
}TTn o
;TTo p
}UU 	
}VV 
}WW ∏t
HC:\sources\Fehldiagnosen\Backend\Backend\Application\Mapper\DtoMapper.cs
	namespace 	
Backend
 
. 
Application 
. 
Mapper $
{ 
public 

class 
	DtoMapper 
{ 
public "
PatientSymptomResponse %$
ToPatientSymptomResponse& >
(> ?
PatientSymptom? M
symptomN U
)U V
{ 	
return 
new "
PatientSymptomResponse -
{ 
Id 
= 
symptom 
. 
Id 
,  
	PatientId 
= 
symptom #
.# $
	PatientId$ -
,- .
	SymptomId 
= 
symptom #
.# $
SymptomDefinitionId$ 7
,7 8
SymptomName 
= 
symptom %
.% &
SymptomName& 1
,1 2
DefinedSymptomName "
=# $
symptom% ,
., -
SymptomDefinition- >
?> ?
.? @
Name@ D
,D E
OccurrenceTime 
=  
symptom! (
.( )
OccurrenceTime) 7
,7 8
	Intensity 
= 
symptom #
.# $
	Intensity$ -
,- .
Duration 
= 
symptom "
." #
Duration# +
,+ ,
PossibleTrigger 
=  !
symptom" )
.) *
PossibleTrigger* 9
,9 :
Notes 
= 
symptom 
.  
Notes  %
,% &
Details 
= 
symptom !
.! "
Details" )
??* ,
new- 0

Dictionary1 ;
<; <
string< B
,B C
stringD J
?J K
>K L
(L M
)M N
,N O
	CreatedAt 
= 
symptom #
.# $
	CreatedAt$ -
} 
; 
}   	
public"" %
SymptomDefinitionResponse"" ('
ToSymptomDefinitionResponse"") D
(""D E
SymptomDefinition""E V

definition""W a
)""a b
{## 	
return$$ 
new$$ %
SymptomDefinitionResponse$$ 0
{%% 
Id&& 
=&& 

definition&& 
.&&  
Id&&  "
,&&" #
Name'' 
='' 

definition'' !
.''! "
Name''" &
,''& '
Aliases(( 
=(( 

definition(( $
.(($ %
Aliases((% ,
?((, -
.((- .
ToList((. 4
(((4 5
)((5 6
??((7 9
new((: =
List((> B
<((B C
string((C I
>((I J
(((J K
)((K L
,((L M
Fields)) 
=)) 

definition)) #
.))# $
Fields))$ *
?))* +
.))+ ,
Select)), 2
())2 3
field))3 8
=>))9 ;
new))< ? 
SymptomFieldResponse))@ T
{** 
Name++ 
=++ 
field++  
.++  !
Name++! %
,++% &
Type,, 
=,, 
field,,  
.,,  !
Type,,! %
,,,% &
Options-- 
=-- 
field-- #
.--# $
Options--$ +
?--+ ,
.--, -
ToList--- 3
(--3 4
)--4 5
??--6 8
new--9 <
List--= A
<--A B
string--B H
?--H I
>--I J
(--J K
)--K L
,--L M

IsRequired.. 
=..  
field..! &
...& '

IsRequired..' 1
}// 
)// 
.// 
ToList// 
(// 
)// 
??// 
new// "
List//# '
<//' ( 
SymptomFieldResponse//( <
>//< =
(//= >
)//> ?
}00 
;00 
}11 	
public33 
IEnumerable33 
<33 "
PatientSymptomResponse33 1
>331 2(
ToPatientSymptomResponseList333 O
(33O P
IEnumerable33P [
<33[ \
PatientSymptom33\ j
>33j k
symptoms33l t
)33t u
{44 	
return55 
symptoms55 
.55 
Select55 "
(55" #
s55# $
=>55% '$
ToPatientSymptomResponse55( @
(55@ A
s55A B
)55B C
)55C D
;55D E
}66 	
public88 
IEnumerable88 
<88 %
SymptomDefinitionResponse88 4
>884 5#
ToSymptomDefinitionList886 M
(88M N
IEnumerable88N Y
<88Y Z
SymptomDefinition88Z k
>88k l
definitions88m x
)88x y
{99 	
return:: 
definitions:: 
.:: 
Select:: %
(::% &
d::& '
=>::( *'
ToSymptomDefinitionResponse::+ F
(::F G
d::G H
)::H I
)::I J
;::J K
};; 	
public== 
MedicationResponse== ! 
ToMedicationResponse==" 6
(==6 7

Medication==7 A

medication==B L
)==L M
{>> 	
return?? 
new?? 
MedicationResponse?? )
{@@ 
IdAA 
=AA 

medicationAA 
.AA  
IdAA  "
,AA" #
NameBB 
=BB 

medicationBB !
.BB! "
NameBB" &
,BB& '
	PatientIdCC 
=CC 

medicationCC &
.CC& '
	PatientIdCC' 0
,CC0 1
DosageDD 
=DD 

medicationDD #
.DD# $
DosageDD$ *
,DD* +
IntakeFrequencyEE 
=EE  !

medicationEE" ,
.EE, -
IntakeFrequencyEE- <
,EE< =
IntakeStartDateFF 
=FF  !

medicationFF" ,
.FF, -
IntakeStartDateFF- <
,FF< =
DurationInDaysGG 
=GG  

medicationGG! +
.GG+ ,
DurationInDaysGG, :
,GG: ;

IndicationHH 
=HH 

medicationHH '
.HH' (

IndicationHH( 2
,HH2 3
AtcCodeII 
=II 

medicationII $
.II$ %
AtcCodeII% ,
,II, -
EntryByJJ 
=JJ 

medicationJJ $
.JJ$ %
EntryByJJ% ,
,JJ, -
NotesKK 
=KK 

medicationKK "
.KK" #
NotesKK# (
}MM 
;MM 
}NN 	
publicPP '
MedicalHistoryEntryResponsePP *)
ToMedicalHistoryEntryResponsePP+ H
(PPH I
MedicalHistoryEntryPPI \
medicalHistoryEntryPP] p
)PPp q
{QQ 	
returnRR 
newRR '
MedicalHistoryEntryResponseRR 2
{SS 
IdTT 
=TT 
medicalHistoryEntryTT (
.TT( )
IdTT) +
,TT+ ,
	PatientIdUU 
=UU 
medicalHistoryEntryUU /
.UU/ 0
	PatientIdUU0 9
,UU9 :
	ICD10CodeVV 
=VV 
medicalHistoryEntryVV /
.VV/ 0
	ICD10CodeVV0 9
,VV9 :
	DiagnosisWW 
=WW 
medicalHistoryEntryWW /
.WW/ 0
	DiagnosisWW0 9
,WW9 :
YearXX 
=XX 
medicalHistoryEntryXX *
.XX* +
YearXX+ /
,XX/ 0
StatusYY 
=YY 
medicalHistoryEntryYY ,
.YY, -
StatusYY- 3
,YY3 4
CommentZZ 
=ZZ 
medicalHistoryEntryZZ -
.ZZ- .
CommentZZ. 5
,ZZ5 6
EntryBy[[ 
=[[ 
medicalHistoryEntry[[ -
.[[- .
EntryBy[[. 5
,[[5 6
AiExplanation\\ 
=\\ 
medicalHistoryEntry\\  3
.\\3 4
AiExplanation\\4 A
,\\A B
}]] 
;]] 
}^^ 	
public`` &
FamilyHistoryEntryResponse`` )(
ToFamilyHistoryEntryResponse``* F
(``F G
FamilyHistoryEntry``G Y
entry``Z _
)``_ `
{aa 	
returnbb 
newbb &
FamilyHistoryEntryResponsebb 1
{cc 
Iddd 
=dd 
entrydd 
.dd 
Iddd 
,dd 
	PatientIdee 
=ee 
entryee !
.ee! "
	PatientIdee" +
,ee+ ,
Relativeff 
=ff 
entryff  
.ff  !
Relativeff! )
,ff) *
	Diagnosisgg 
=gg 
entrygg !
.gg! "
	Diagnosisgg" +
,gg+ ,
Commenthh 
=hh 
entryhh 
.hh  
Commenthh  '
,hh' (
}ii 
;ii 
}jj 	
publicll 
IEnumerablell 
<ll &
FamilyHistoryEntryResponsell 5
>ll5 6,
 ToFamilyHistoryEntryResponseListll7 W
(llW X
IEnumerablellX c
<llc d
FamilyHistoryEntrylld v
>llv w
entriesllx 
)	ll Ä
{mm 	
returnnn 
entriesnn 
.nn 
Selectnn !
(nn! "
enn" #
=>nn$ &(
ToFamilyHistoryEntryResponsenn' C
(nnC D
ennD E
)nnE F
)nnF G
;nnG H
}oo 	
publicqq 
FamilyHistoryEntryqq ! 
ToFamilyHistoryEntryqq" 6
(qq6 7+
CreateFamilyHistoryEntryRequestqq7 V
requestqqW ^
)qq^ _
{rr 	
returnss 
newss 
FamilyHistoryEntryss )
{tt 
Relativeuu 
=uu 
requestuu "
.uu" #
Relativeuu# +
,uu+ ,
	Diagnosisvv 
=vv 
requestvv #
.vv# $
	Diagnosisvv$ -
,vv- .
Commentww 
=ww 
requestww !
.ww! "
Commentww" )
}xx 
;xx 
}yy 	
public{{ 
DiagnosisResponse{{  
ToDiagnosisResponse{{! 4
({{4 5
	Diagnosis{{5 >
	diagnosis{{? H
){{H I
{|| 	
return}} 
new}} 
DiagnosisResponse}} (
{~~ 
Id 
= 
	diagnosis 
. 
Id !
,! "
	PatientId
ÄÄ 
=
ÄÄ 
	diagnosis
ÄÄ %
.
ÄÄ% &
	PatientId
ÄÄ& /
,
ÄÄ/ 0
Title
ÅÅ 
=
ÅÅ 
	diagnosis
ÅÅ !
.
ÅÅ! "
Title
ÅÅ" '
,
ÅÅ' (
Description
ÇÇ 
=
ÇÇ 
	diagnosis
ÇÇ '
.
ÇÇ' (
Description
ÇÇ( 3
,
ÇÇ3 4
IcdCode
ÉÉ 
=
ÉÉ 
	diagnosis
ÉÉ #
.
ÉÉ# $
IcdCode
ÉÉ$ +
,
ÉÉ+ ,
Severity
ÑÑ 
=
ÑÑ 
	diagnosis
ÑÑ $
.
ÑÑ$ %
Severity
ÑÑ% -
,
ÑÑ- .
SideLocalization
ÖÖ  
=
ÖÖ! "
	diagnosis
ÖÖ# ,
.
ÖÖ, -
SideLocalization
ÖÖ- =
,
ÖÖ= >
ConditionStatus
ÜÜ 
=
ÜÜ  !
	diagnosis
ÜÜ" +
.
ÜÜ+ ,
ConditionStatus
ÜÜ, ;
,
ÜÜ; <
EntryBy
áá 
=
áá 
	diagnosis
áá #
.
áá# $
EntryBy
áá$ +
,
áá+ ,
AiExplanation
àà 
=
àà 
	diagnosis
àà  )
.
àà) *
AiExplanation
àà* 7
,
àà7 8

Disclaimer
ââ 
=
ââ 
	diagnosis
ââ &
.
ââ& '
AiExplanation
ââ' 4
!=
ââ5 7
null
ââ8 <
?
ââ= >
	Diagnosis
ââ? H
.
ââH I%
AiExplanationDisclaimer
ââI `
:
ââa b
null
ââc g
,
ââg h
MedicationText
ää 
=
ää  
	diagnosis
ää! *
.
ää* +
MedicationText
ää+ 9
,
ää9 :
Symptoms
ãã 
=
ãã 
	diagnosis
ãã $
.
ãã$ %
Symptoms
ãã% -
,
ãã- .
Findings
åå 
=
åå 
	diagnosis
åå $
.
åå$ %
Findings
åå% -
,
åå- .!
TherapeuticMeasures
çç #
=
çç$ %
	diagnosis
çç& /
.
çç/ 0!
TherapeuticMeasures
çç0 C
,
ççC D
Note
éé 
=
éé 
	diagnosis
éé  
.
éé  !
Note
éé! %
,
éé% &
DiagnosisDate
èè 
=
èè 
	diagnosis
èè  )
.
èè) *
DiagnosisDate
èè* 7
,
èè7 8
	CreatedAt
êê 
=
êê 
	diagnosis
êê %
.
êê% &
	CreatedAt
êê& /
,
êê/ 0
	UpdatedAt
ëë 
=
ëë 
	diagnosis
ëë %
.
ëë% &
	UpdatedAt
ëë& /
}
íí 
;
íí 
}
ìì 	
public
ïï #
MedicalLetterResponse
ïï $%
ToMedicalLetterResponse
ïï% <
(
ïï< =
MedicalLetter
ïï= J
letter
ïïK Q
)
ïïQ R
{
ññ 	
return
óó 
new
óó #
MedicalLetterResponse
óó ,
{
òò 
Id
ôô 
=
ôô 
letter
ôô 
.
ôô 
Id
ôô 
,
ôô 
	PatientId
öö 
=
öö 
letter
öö "
.
öö" #
	PatientId
öö# ,
,
öö, -
Subject
õõ 
=
õõ 
letter
õõ  
.
õõ  !
Subject
õõ! (
,
õõ( )
ReciverName
úú 
=
úú 
letter
úú $
.
úú$ %
ReciverName
úú% 0
,
úú0 1
AiSuggestion
ùù 
=
ùù 
letter
ùù %
.
ùù% &
AiSuggestion
ùù& 2
,
ùù2 3
ReworkedText
ûû 
=
ûû 
letter
ûû %
.
ûû% &
ReworkedText
ûû& 2
,
ûû2 3
Status
üü 
=
üü 
letter
üü 
.
üü  
Status
üü  &
.
üü& '
ToString
üü' /
(
üü/ 0
)
üü0 1
,
üü1 2
	Startdate
†† 
=
†† 
letter
†† "
.
††" #
	Startdate
††# ,
,
††, -
	CreatedAt
°° 
=
°° 
letter
°° "
.
°°" #
	CreatedAt
°°# ,
,
°°, -
	UpdatedAt
¢¢ 
=
¢¢ 
letter
¢¢ "
.
¢¢" #
	UpdatedAt
¢¢# ,
}
££ 
;
££ 
}
§§ 	
}
•• 
}¶¶ Ñ
WC:\sources\Fehldiagnosen\Backend\Backend\Application\Common\Results\ServiceErrorType.cs
	namespace 	
Backend
 
. 
Application 
. 
Common $
.$ %
Results% ,
{ 
public 

enum 
ServiceErrorType  
{ 
None 
, 
NotFound 
, 
Conflict 
, 
ValidationError 
, 
Unauthorized		 
,		 
InternalServerError

 
,

 
	Forbidden 
, 
} 
} Ã)
LC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\SymptomController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
[ 
	Authorize 
] 
[		 
Route		 

(		
 
$str		 
)		 
]		 
[

 
ApiController

 
]

 
public 

class 
SymptomController "
:# $
BaseApiController% 6
{ 
private 
readonly 
ISymptomService (
_symptomService) 8
;8 9
public 
SymptomController  
(  !
ISymptomService! 0
symptomService1 ?
)? @
{ 	
_symptomService 
= 
symptomService ,
;, -
} 	
[ 	
HttpGet	 
( 
$str 
) 
] 
[ 	 
ProducesResponseType	 
( 
StatusCodes )
.) *
Status200OK* 5
)5 6
]6 7
public 
async 
Task 
< 
ActionResult &
>& '*
GetAllSymptomDefinitionsByName( F
(F G
[G H
	FromQueryH Q
]Q R
stringS Y
nameZ ^
)^ _
{ 	
var 
result 
= 
await 
_symptomService .
.. /,
 GetSymptomDefinitionsByNameAsync/ O
(O P
nameP T
)T U
;U V
if 
( 
result 
. 
	IsSuccess  
)  !
return 
Ok 
( 
result  
.  !
Data! %
)% &
;& '
return 
HandleServiceError %
(% &
result& ,
., -
	ErrorType- 6
,6 7
result8 >
.> ?
ErrorMessage? K
)K L
;L M
} 	
[   	
HttpGet  	 
(   
$str   
)   
]   
[!! 	 
ProducesResponseType!!	 
(!! 
StatusCodes!! )
.!!) *
Status200OK!!* 5
)!!5 6
]!!6 7
["" 	 
ProducesResponseType""	 
("" 
StatusCodes"" )
."") *
Status404NotFound""* ;
)""; <
]""< =
public## 
async## 
Task## 
<## 
ActionResult## &
>##& '
GetById##( /
(##/ 0
int##0 3
id##4 6
)##6 7
{$$ 	
var%% 
userId%% 
=%% 
IsArzt%% 
(%%  
)%%  !
?%%" #
null%%$ (
:%%) *
GetCurrentUserId%%+ ;
(%%; <
)%%< =
;%%= >
var&& 
result&& 
=&& 
await&& 
_symptomService&& .
.&&. /
GetByIdAsync&&/ ;
(&&; <
id&&< >
,&&> ?
userId&&@ F
)&&F G
;&&G H
if(( 
((( 
result(( 
.(( 
	IsSuccess((  
)((  !
return)) 
Ok)) 
()) 
result))  
.))  !
Data))! %
)))% &
;))& '
return++ 
HandleServiceError++ %
(++% &
result++& ,
.++, -
	ErrorType++- 6
,++6 7
result++8 >
.++> ?
ErrorMessage++? K
)++K L
;++L M
},, 	
[.. 	

HttpDelete..	 
(.. 
$str.. 
).. 
].. 
[// 	 
ProducesResponseType//	 
(// 
StatusCodes// )
.//) *
Status204NoContent//* <
)//< =
]//= >
[00 	 
ProducesResponseType00	 
(00 
StatusCodes00 )
.00) *
Status404NotFound00* ;
)00; <
]00< =
public11 
async11 
Task11 
<11 
ActionResult11 &
>11& '
Delete11( .
(11. /
int11/ 2
id113 5
)115 6
{22 	
var33 
userId33 
=33 
IsArzt33 
(33  
)33  !
?33" #
null33$ (
:33) *
GetCurrentUserId33+ ;
(33; <
)33< =
;33= >
var44 
result44 
=44 
await44 
_symptomService44 .
.44. /
DeleteAsync44/ :
(44: ;
id44; =
,44= >
userId44? E
)44E F
;44F G
if66 
(66 
result66 
.66 
	IsSuccess66  
)66  !
return77 
	NoContent77  
(77  !
)77! "
;77" #
return99 
HandleServiceError99 %
(99% &
result99& ,
.99, -
	ErrorType99- 6
,996 7
result998 >
.99> ?
ErrorMessage99? K
)99K L
;99L M
}:: 	
};; 
}<< Òô
LC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\PatientController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[ 
	Authorize 

]
 
[ 
ApiController 
] 
[ 
Route 
( 
$str 
) 
] 
public 
class 
PatientController 
:  
BaseApiController! 2
{ 
private 
readonly 
ISymptomService $
_symptomService% 4
;4 5
private 
readonly 
IMedicationService '
_medicationService( :
;: ;
private 
readonly '
IMedicalHistoryEntryService 0'
_medicalHistoryEntryService1 L
;L M
private 
readonly &
IFamilyHistoryEntryService /&
_familyHistoryEntryService0 J
;J K
private 
readonly 
IDiagnosisService &
_diagnosisService' 8
;8 9
public 

PatientController 
( 
ISymptomService ,
symptomService- ;
,; <'
IMedicalHistoryEntryService= X&
medicalHistoryEntryServiceY s
,s t
IMedicationService	u á
medicationService
à ô
,
ô ö(
IFamilyHistoryEntryService
õ µ'
familyHistoryEntryService
∂ œ
,
œ –
IDiagnosisService
— ‚
diagnosisService
„ Û
)
Û Ù
{ 
_symptomService 
= 
symptomService (
;( )
_medicationService   
=   
medicationService   .
;  . /'
_medicalHistoryEntryService!! #
=!!$ %&
medicalHistoryEntryService!!& @
;!!@ A&
_familyHistoryEntryService"" "
=""# $%
familyHistoryEntryService""% >
;""> ?
_diagnosisService## 
=## 
diagnosisService## ,
;##, -
}$$ 
[(( 
HttpGet(( 
((( 
$str(( &
)((& '
]((' (
[))  
ProducesResponseType)) 
()) 
StatusCodes)) %
.))% &
Status200OK))& 1
)))1 2
]))2 3
[**  
ProducesResponseType** 
(** 
StatusCodes** %
.**% &
Status404NotFound**& 7
)**7 8
]**8 9
public++ 

async++ 
Task++ 
<++ 
ActionResult++ "
<++" #
IEnumerable++# .
<++. /
MedicationResponse++/ A
>++A B
>++B C
>++C D%
GetMedicationsByPatientId++E ^
(++^ _
int++_ b
	patientId++c l
)++l m
{,, 
var-- 
userId-- 
=-- 
IsArzt-- 
(-- 
)-- 
?-- 
null--  $
:--% &
GetCurrentUserId--' 7
(--7 8
)--8 9
;--9 :
var.. 
result.. 
=.. 
await.. 
_medicationService.. -
...- .
GetAllAsync... 9
(..9 :
	patientId..: C
,..C D
userId..E K
)..K L
;..L M
if00 

(00 
result00 
.00 
	IsSuccess00 
)00 
return11 
Ok11 
(11 
result11 
.11 
Data11 !
)11! "
;11" #
return33 
HandleServiceError33 !
(33! "
result33" (
.33( )
	ErrorType33) 2
,332 3
result334 :
.33: ;
ErrorMessage33; G
)33G H
;33H I
}44 
[66 
HttpPost66 
(66 
$str66 '
)66' (
]66( )
[77  
ProducesResponseType77 
(77 
StatusCodes77 %
.77% &
Status201Created77& 6
)776 7
]777 8
[88  
ProducesResponseType88 
(88 
StatusCodes88 %
.88% &
Status400BadRequest88& 9
)889 :
]88: ;
[99  
ProducesResponseType99 
(99 
StatusCodes99 %
.99% &
Status404NotFound99& 7
)997 8
]998 9
public:: 

async:: 
Task:: 
<:: 
ActionResult:: "
<::" #
MedicationResponse::# 5
>::5 6
>::6 7(
CreateMedicationForPatientId::8 T
(::T U
int::U X
	patientId::Y b
,::b c
[::d e
FromBody::e m
]::m n$
CreateMedicationRequest	::o Ü
request
::á é
)
::é è
{;; 
var<< 
userId<< 
=<< 
IsArzt<< 
(<< 
)<< 
?<< 
null<<  $
:<<% &
GetCurrentUserId<<' 7
(<<7 8
)<<8 9
;<<9 :
var== 
result== 
=== 
await== 
_medicationService== -
.==- .
CreateAsync==. 9
(==9 :
	patientId==: C
,==C D
request==E L
,==L M
userId==N T
)==T U
;==U V
if?? 

(?? 
result?? 
.?? 
	IsSuccess?? 
)?? 
return@@ 
CreatedAtAction@@ "
(@@" #
nameof@@# )
(@@) * 
MedicationController@@* >
.@@> ?
GetById@@? F
)@@F G
,@@G H
$str@@I U
,@@U V
new@@W Z
{@@[ \
id@@] _
=@@` a
result@@b h
.@@h i
Data@@i m
.@@m n
Id@@n p
}@@q r
,@@r s
result@@t z
.@@z {
Data@@{ 
)	@@ Ä
;
@@Ä Å
returnBB 
HandleServiceErrorBB !
(BB! "
resultBB" (
.BB( )
	ErrorTypeBB) 2
,BB2 3
resultBB4 :
.BB: ;
ErrorMessageBB; G
)BBG H
;BBH I
}CC 
[EE 
HttpPutEE 
(EE 
$strEE 5
)EE5 6
]EE6 7
[FF  
ProducesResponseTypeFF 
(FF 
StatusCodesFF %
.FF% &
Status200OKFF& 1
)FF1 2
]FF2 3
[GG  
ProducesResponseTypeGG 
(GG 
StatusCodesGG %
.GG% &
Status400BadRequestGG& 9
)GG9 :
]GG: ;
[HH  
ProducesResponseTypeHH 
(HH 
StatusCodesHH %
.HH% &
Status404NotFoundHH& 7
)HH7 8
]HH8 9
publicII 

asyncII 
TaskII 
<II 
ActionResultII "
<II" #
MedicationResponseII# 5
>II5 6
>II6 7(
UpdateMedicationForPatientIdII8 T
(IIT U
intIIU X
	patientIdIIY b
,IIb c
intIId g
medicationIdIIh t
,IIt u
[IIv w
FromBodyIIw 
]	II Ä%
UpdateMedicationRequest
IIÅ ò
request
IIô †
)
II† °
{JJ 
varKK 
userIdKK 
=KK 
IsArztKK 
(KK 
)KK 
?KK 
nullKK  $
:KK% &
GetCurrentUserIdKK' 7
(KK7 8
)KK8 9
;KK9 :
varLL 
resultLL 
=LL 
awaitLL 
_medicationServiceLL -
.LL- .
UpdateAsyncLL. 9
(LL9 :
	patientIdLL: C
,LLC D
medicationIdLLE Q
,LLQ R
requestLLS Z
,LLZ [
userIdLL\ b
)LLb c
;LLc d
ifNN 

(NN 
resultNN 
.NN 
	IsSuccessNN 
)NN 
returnOO 
OkOO 
(OO 
resultOO 
.OO 
DataOO !
)OO! "
;OO" #
returnQQ 
HandleServiceErrorQQ !
(QQ! "
resultQQ" (
.QQ( )
	ErrorTypeQQ) 2
,QQ2 3
resultQQ4 :
.QQ: ;
ErrorMessageQQ; G
)QQG H
;QQH I
}RR 
[XX 
HttpGetXX 
(XX 
$strXX #
)XX# $
]XX$ %
[YY  
ProducesResponseTypeYY 
(YY 
StatusCodesYY %
.YY% &
Status200OKYY& 1
)YY1 2
]YY2 3
[ZZ  
ProducesResponseTypeZZ 
(ZZ 
StatusCodesZZ %
.ZZ% &
Status404NotFoundZZ& 7
)ZZ7 8
]ZZ8 9
public[[ 

async[[ 
Task[[ 
<[[ 
ActionResult[[ "
<[[" #
IEnumerable[[# .
<[[. /"
PatientSymptomResponse[[/ E
>[[E F
>[[F G
>[[G H"
GetSymptomsByPatientId[[I _
([[_ `
int[[` c
	patientId[[d m
,[[m n
[[[o p
	FromQuery[[p y
][[y z
DateTime	[[{ É
?
[[É Ñ
date
[[Ö â
)
[[â ä
{\\ 
var]] 
userId]] 
=]] 
IsArzt]] 
(]] 
)]] 
?]] 
null]]  $
:]]% &
GetCurrentUserId]]' 7
(]]7 8
)]]8 9
;]]9 :
var^^ 
result^^ 
=^^ 
await^^ 
(^^ 
date^^  
!=^^! #
null^^$ (
?^^) *
_symptomService^^+ :
.^^: ;
GetAllByDateAsync^^; L
(^^L M
	patientId^^M V
,^^V W
date^^X \
.^^\ ]
Value^^] b
,^^b c
userId^^d j
)^^j k
:^^l m
_symptomService^^n }
.^^} ~
GetAllAsync	^^~ â
(
^^â ä
	patientId
^^ä ì
,
^^ì î
userId
^^ï õ
)
^^õ ú
)
^^ú ù
;
^^ù û
if`` 

(`` 
result`` 
.`` 
	IsSuccess`` 
)`` 
returnaa 
Okaa 
(aa 
resultaa 
.aa 
Dataaa !
)aa! "
;aa" #
returncc 
HandleServiceErrorcc !
(cc! "
resultcc" (
.cc( )
	ErrorTypecc) 2
,cc2 3
resultcc4 :
.cc: ;
ErrorMessagecc; G
)ccG H
;ccH I
}dd 
[ff 
HttpPostff 
(ff 
$strff $
)ff$ %
]ff% &
[gg  
ProducesResponseTypegg 
(gg 
StatusCodesgg %
.gg% &
Status201Createdgg& 6
)gg6 7
]gg7 8
[hh  
ProducesResponseTypehh 
(hh 
StatusCodeshh %
.hh% &
Status400BadRequesthh& 9
)hh9 :
]hh: ;
[ii  
ProducesResponseTypeii 
(ii 
StatusCodesii %
.ii% &
Status404NotFoundii& 7
)ii7 8
]ii8 9
publicjj 

asyncjj 
Taskjj 
<jj 
ActionResultjj "
<jj" #"
PatientSymptomResponsejj# 9
>jj9 :
>jj: ;%
CreateSymptomForPatientIdjj< U
(jjU V
intjjV Y
	patientIdjjZ c
,jjc d
[jje f
FromBodyjjf n
]jjn o(
CreatePatientSymptomRequest	jjp ã
request
jjå ì
)
jjì î
{kk 
varll 
userIdll 
=ll 
IsArztll 
(ll 
)ll 
?ll 
nullll  $
:ll% &
GetCurrentUserIdll' 7
(ll7 8
)ll8 9
;ll9 :
varmm 
resultmm 
=mm 
awaitmm 
_symptomServicemm *
.mm* +
CreateAsyncmm+ 6
(mm6 7
	patientIdmm7 @
,mm@ A
requestmmB I
,mmI J
userIdmmK Q
)mmQ R
;mmR S
ifoo 

(oo 
resultoo 
.oo 
	IsSuccessoo 
)oo 
returnpp 
CreatedAtActionpp "
(pp" #
nameofpp# )
(pp) *
SymptomControllerpp* ;
.pp; <
GetByIdpp< C
)ppC D
,ppD E
$strppF O
,ppO P
newppQ T
{ppU V
idppW Y
=ppZ [
resultpp\ b
.ppb c
Datappc g
.ppg h
Idpph j
}ppk l
,ppl m
resultppn t
.ppt u
Datappu y
)ppy z
;ppz {
returnrr 
HandleServiceErrorrr !
(rr! "
resultrr" (
.rr( )
	ErrorTyperr) 2
,rr2 3
resultrr4 :
.rr: ;
ErrorMessagerr; G
)rrG H
;rrH I
}ss 
[uu 
HttpPutuu 
(uu 
$struu /
)uu/ 0
]uu0 1
[vv  
ProducesResponseTypevv 
(vv 
StatusCodesvv %
.vv% &
Status200OKvv& 1
)vv1 2
]vv2 3
[ww  
ProducesResponseTypeww 
(ww 
StatusCodesww %
.ww% &
Status400BadRequestww& 9
)ww9 :
]ww: ;
[xx  
ProducesResponseTypexx 
(xx 
StatusCodesxx %
.xx% &
Status404NotFoundxx& 7
)xx7 8
]xx8 9
publicyy 

asyncyy 
Taskyy 
<yy 
ActionResultyy "
<yy" #"
PatientSymptomResponseyy# 9
>yy9 :
>yy: ;%
UpdateSymptomForPatientIdyy< U
(yyU V
intyyV Y
	patientIdyyZ c
,yyc d
intyye h
	symptomIdyyi r
,yyr s
[yyt u
FromBodyyyu }
]yy} ~(
UpdatePatientSymptomRequest	yy ö
request
yyõ ¢
)
yy¢ £
{zz 
var{{ 
userId{{ 
={{ 
IsArzt{{ 
({{ 
){{ 
?{{ 
null{{  $
:{{% &
GetCurrentUserId{{' 7
({{7 8
){{8 9
;{{9 :
var|| 
result|| 
=|| 
await|| 
_symptomService|| *
.||* +
UpdateAsync||+ 6
(||6 7
	patientId||7 @
,||@ A
	symptomId||B K
,||K L
request||M T
,||T U
userId||V \
)||\ ]
;||] ^
if~~ 

(~~ 
result~~ 
.~~ 
	IsSuccess~~ 
)~~ 
return 
Ok 
( 
result 
. 
Data !
)! "
;" #
return
ÅÅ  
HandleServiceError
ÅÅ !
(
ÅÅ! "
result
ÅÅ" (
.
ÅÅ( )
	ErrorType
ÅÅ) 2
,
ÅÅ2 3
result
ÅÅ4 :
.
ÅÅ: ;
ErrorMessage
ÅÅ; G
)
ÅÅG H
;
ÅÅH I
}
ÇÇ 
[
àà 
HttpGet
àà 
(
àà 
$str
àà 2
)
àà2 3
]
àà3 4
[
ââ "
ProducesResponseType
ââ 
(
ââ 
StatusCodes
ââ %
.
ââ% &
Status200OK
ââ& 1
)
ââ1 2
]
ââ2 3
[
ää "
ProducesResponseType
ää 
(
ää 
StatusCodes
ää %
.
ää% &
Status404NotFound
ää& 7
)
ää7 8
]
ää8 9
public
ãã 

async
ãã 
Task
ãã 
<
ãã 
ActionResult
ãã "
<
ãã" #
IEnumerable
ãã# .
<
ãã. /)
MedicalHistoryEntryResponse
ãã/ J
>
ããJ K
>
ããK L
>
ããL M1
#GetMedicalHistoryEntriesByPatientId
ããN q
(
ããq r
int
ããr u
	patientId
ããv 
)ãã Ä
{
åå 
var
çç 
userId
çç 
=
çç 
IsArzt
çç 
(
çç 
)
çç 
?
çç 
null
çç  $
:
çç% &
GetCurrentUserId
çç' 7
(
çç7 8
)
çç8 9
;
çç9 :
var
éé 
result
éé 
=
éé 
await
éé )
_medicalHistoryEntryService
éé 6
.
éé6 7
GetAllAsync
éé7 B
(
ééB C
	patientId
ééC L
,
ééL M
userId
ééN T
)
ééT U
;
ééU V
if
êê 

(
êê 
result
êê 
.
êê 
	IsSuccess
êê 
)
êê 
return
ëë 
Ok
ëë 
(
ëë 
result
ëë 
.
ëë 
Data
ëë !
)
ëë! "
;
ëë" #
return
ìì  
HandleServiceError
ìì !
(
ìì! "
result
ìì" (
.
ìì( )
	ErrorType
ìì) 2
,
ìì2 3
result
ìì4 :
.
ìì: ;
ErrorMessage
ìì; G
)
ììG H
;
ììH I
}
îî 
[
ññ 
HttpPost
ññ 
(
ññ 
$str
ññ 3
)
ññ3 4
]
ññ4 5
[
óó "
ProducesResponseType
óó 
(
óó 
StatusCodes
óó %
.
óó% &
Status201Created
óó& 6
)
óó6 7
]
óó7 8
[
òò "
ProducesResponseType
òò 
(
òò 
StatusCodes
òò %
.
òò% &
Status404NotFound
òò& 7
)
òò7 8
]
òò8 9
[
ôô "
ProducesResponseType
ôô 
(
ôô 
StatusCodes
ôô %
.
ôô% &!
Status400BadRequest
ôô& 9
)
ôô9 :
]
ôô: ;
public
öö 

async
öö 
Task
öö 
<
öö 
ActionResult
öö "
<
öö" #)
MedicalHistoryEntryResponse
öö# >
>
öö> ?
>
öö? @3
%CreateMedicalHistoryEntryForPatientId
ööA f
(
ööf g
int
öög j
	patientId
öök t
,
ööt u
[
ööv w
FromBody
ööw 
]öö Ä0
 CreateMedicalHistoryEntryRequestööÅ °
requestöö¢ ©
)öö© ™
{
õõ 
var
úú 
userId
úú 
=
úú 
IsArzt
úú 
(
úú 
)
úú 
?
úú 
null
úú  $
:
úú% &
GetCurrentUserId
úú' 7
(
úú7 8
)
úú8 9
;
úú9 :
var
ùù 
result
ùù 
=
ùù 
await
ùù )
_medicalHistoryEntryService
ùù 6
.
ùù6 7
CreateAsync
ùù7 B
(
ùùB C
	patientId
ùùC L
,
ùùL M
request
ùùN U
,
ùùU V
userId
ùùW ]
)
ùù] ^
;
ùù^ _
if
üü 

(
üü 
result
üü 
.
üü 
	IsSuccess
üü 
)
üü 
return
†† 
CreatedAtAction
†† "
(
††" #
nameof
††# )
(
††) *+
MedicalHistoryEntryController
††* G
.
††G H
GetById
††H O
)
††O P
,
††P Q
$str
††R g
,
††g h
new
††i l
{
††m n
id
††o q
=
††r s
result
††t z
.
††z {
Data
††{ 
.†† Ä
Id††Ä Ç
}††É Ñ
,††Ñ Ö
result††Ü å
.††å ç
Data††ç ë
)††ë í
;††í ì
return
¢¢  
HandleServiceError
¢¢ !
(
¢¢! "
result
¢¢" (
.
¢¢( )
	ErrorType
¢¢) 2
,
¢¢2 3
result
¢¢4 :
.
¢¢: ;
ErrorMessage
¢¢; G
)
¢¢G H
;
¢¢H I
}
££ 
[
•• 
HttpPut
•• 
(
•• 
$str
•• J
)
••J K
]
••K L
[
¶¶ "
ProducesResponseType
¶¶ 
(
¶¶ 
StatusCodes
¶¶ %
.
¶¶% &
Status200OK
¶¶& 1
)
¶¶1 2
]
¶¶2 3
[
ßß "
ProducesResponseType
ßß 
(
ßß 
StatusCodes
ßß %
.
ßß% &
Status404NotFound
ßß& 7
)
ßß7 8
]
ßß8 9
[
®® "
ProducesResponseType
®® 
(
®® 
StatusCodes
®® %
.
®®% &!
Status400BadRequest
®®& 9
)
®®9 :
]
®®: ;
public
©© 

async
©© 
Task
©© 
<
©© 
ActionResult
©© "
<
©©" #)
MedicalHistoryEntryResponse
©©# >
>
©©> ?
>
©©? @3
%UpdateMedicalHistoryEntryForPatientId
©©A f
(
©©f g
int
©©g j
	patientId
©©k t
,
©©t u
int
©©v y$
medicalHistoryEntryId©©z è
,©©è ê
[©©ë í
FromBody©©í ö
]©©ö õ0
 UpdateMedicalHistoryEntryRequest©©ú º
request©©Ω ƒ
)©©ƒ ≈
{
™™ 
var
´´ 
userId
´´ 
=
´´ 
IsArzt
´´ 
(
´´ 
)
´´ 
?
´´ 
null
´´  $
:
´´% &
GetCurrentUserId
´´' 7
(
´´7 8
)
´´8 9
;
´´9 :
var
¨¨ 
result
¨¨ 
=
¨¨ 
await
¨¨ )
_medicalHistoryEntryService
¨¨ 6
.
¨¨6 7
UpdateAsync
¨¨7 B
(
¨¨B C
	patientId
¨¨C L
,
¨¨L M#
medicalHistoryEntryId
¨¨N c
,
¨¨c d
request
¨¨e l
,
¨¨l m
userId
¨¨n t
)
¨¨t u
;
¨¨u v
if
ÆÆ 

(
ÆÆ 
result
ÆÆ 
.
ÆÆ 
	IsSuccess
ÆÆ 
)
ÆÆ 
return
ØØ 
Ok
ØØ 
(
ØØ 
result
ØØ 
.
ØØ 
Data
ØØ !
)
ØØ! "
;
ØØ" #
return
±±  
HandleServiceError
±± !
(
±±! "
result
±±" (
.
±±( )
	ErrorType
±±) 2
,
±±2 3
result
±±4 :
.
±±: ;
ErrorMessage
±±; G
)
±±G H
;
±±H I
}
≤≤ 
[
∏∏ 
HttpGet
∏∏ 
(
∏∏ 
$str
∏∏ 1
)
∏∏1 2
]
∏∏2 3
[
ππ "
ProducesResponseType
ππ 
(
ππ 
StatusCodes
ππ %
.
ππ% &
Status200OK
ππ& 1
)
ππ1 2
]
ππ2 3
[
∫∫ "
ProducesResponseType
∫∫ 
(
∫∫ 
StatusCodes
∫∫ %
.
∫∫% &
Status404NotFound
∫∫& 7
)
∫∫7 8
]
∫∫8 9
public
ªª 

async
ªª 
Task
ªª 
<
ªª 
ActionResult
ªª "
<
ªª" #
IEnumerable
ªª# .
<
ªª. /(
FamilyHistoryEntryResponse
ªª/ I
>
ªªI J
>
ªªJ K
>
ªªK L0
"GetFamilyHistoryEntriesByPatientId
ªªM o
(
ªªo p
int
ªªp s
	patientId
ªªt }
)
ªª} ~
{
ºº 
var
ΩΩ 
userId
ΩΩ 
=
ΩΩ 
IsArzt
ΩΩ 
(
ΩΩ 
)
ΩΩ 
?
ΩΩ 
null
ΩΩ  $
:
ΩΩ% &
GetCurrentUserId
ΩΩ' 7
(
ΩΩ7 8
)
ΩΩ8 9
;
ΩΩ9 :
var
ææ 
result
ææ 
=
ææ 
await
ææ (
_familyHistoryEntryService
ææ 5
.
ææ5 6
GetAllAsync
ææ6 A
(
ææA B
	patientId
ææB K
,
ææK L
userId
ææM S
)
ææS T
;
ææT U
if
¿¿ 

(
¿¿ 
result
¿¿ 
.
¿¿ 
	IsSuccess
¿¿ 
)
¿¿ 
return
¡¡ 
Ok
¡¡ 
(
¡¡ 
result
¡¡ 
.
¡¡ 
Data
¡¡ !
)
¡¡! "
;
¡¡" #
return
√√  
HandleServiceError
√√ !
(
√√! "
result
√√" (
.
√√( )
	ErrorType
√√) 2
,
√√2 3
result
√√4 :
.
√√: ;
ErrorMessage
√√; G
)
√√G H
;
√√H I
}
ƒƒ 
[
∆∆ 
HttpPost
∆∆ 
(
∆∆ 
$str
∆∆ 2
)
∆∆2 3
]
∆∆3 4
[
«« "
ProducesResponseType
«« 
(
«« 
StatusCodes
«« %
.
««% &
Status201Created
««& 6
)
««6 7
]
««7 8
[
»» "
ProducesResponseType
»» 
(
»» 
StatusCodes
»» %
.
»»% &!
Status400BadRequest
»»& 9
)
»»9 :
]
»»: ;
[
…… "
ProducesResponseType
…… 
(
…… 
StatusCodes
…… %
.
……% &
Status404NotFound
……& 7
)
……7 8
]
……8 9
public
   

async
   
Task
   
<
   
ActionResult
   "
<
  " #(
FamilyHistoryEntryResponse
  # =
>
  = >
>
  > ?2
$CreateFamilyHistoryEntryForPatientId
  @ d
(
  d e
int
  e h
	patientId
  i r
,
  r s
[
  t u
FromBody
  u }
]
  } ~.
CreateFamilyHistoryEntryRequest   û
request  ü ¶
)  ¶ ß
{
ÀÀ 
var
ÃÃ 
userId
ÃÃ 
=
ÃÃ 
IsArzt
ÃÃ 
(
ÃÃ 
)
ÃÃ 
?
ÃÃ 
null
ÃÃ  $
:
ÃÃ% &
GetCurrentUserId
ÃÃ' 7
(
ÃÃ7 8
)
ÃÃ8 9
;
ÃÃ9 :
var
ÕÕ 
result
ÕÕ 
=
ÕÕ 
await
ÕÕ (
_familyHistoryEntryService
ÕÕ 5
.
ÕÕ5 6
CreateAsync
ÕÕ6 A
(
ÕÕA B
	patientId
ÕÕB K
,
ÕÕK L
request
ÕÕM T
,
ÕÕT U
userId
ÕÕV \
)
ÕÕ\ ]
;
ÕÕ] ^
if
œœ 

(
œœ 
result
œœ 
.
œœ 
	IsSuccess
œœ 
)
œœ 
return
–– 
CreatedAtAction
–– "
(
––" #
nameof
––# )
(
––) **
FamilyHistoryEntryController
––* F
.
––F G
GetById
––G N
)
––N O
,
––O P
$str
––Q e
,
––e f
new
––g j
{
––k l
id
––m o
=
––p q
result
––r x
.
––x y
Data
––y }
.
––} ~
Id––~ Ä
}––Å Ç
,––Ç É
result––Ñ ä
.––ä ã
Data––ã è
)––è ê
;––ê ë
return
““  
HandleServiceError
““ !
(
““! "
result
““" (
.
““( )
	ErrorType
““) 2
,
““2 3
result
““4 :
.
““: ;
ErrorMessage
““; G
)
““G H
;
““H I
}
”” 
[
’’ 
HttpPut
’’ 
(
’’ 
$str
’’ H
)
’’H I
]
’’I J
[
÷÷ "
ProducesResponseType
÷÷ 
(
÷÷ 
StatusCodes
÷÷ %
.
÷÷% &
Status200OK
÷÷& 1
)
÷÷1 2
]
÷÷2 3
[
◊◊ "
ProducesResponseType
◊◊ 
(
◊◊ 
StatusCodes
◊◊ %
.
◊◊% &!
Status400BadRequest
◊◊& 9
)
◊◊9 :
]
◊◊: ;
[
ÿÿ "
ProducesResponseType
ÿÿ 
(
ÿÿ 
StatusCodes
ÿÿ %
.
ÿÿ% &
Status404NotFound
ÿÿ& 7
)
ÿÿ7 8
]
ÿÿ8 9
public
ŸŸ 

async
ŸŸ 
Task
ŸŸ 
<
ŸŸ 
ActionResult
ŸŸ "
<
ŸŸ" #(
FamilyHistoryEntryResponse
ŸŸ# =
>
ŸŸ= >
>
ŸŸ> ?2
$UpdateFamilyHistoryEntryForPatientId
ŸŸ@ d
(
ŸŸd e
int
ŸŸe h
	patientId
ŸŸi r
,
ŸŸr s
int
ŸŸt w#
familyHistoryEntryIdŸŸx å
,ŸŸå ç
[ŸŸé è
FromBodyŸŸè ó
]ŸŸó ò/
UpdateFamilyHistoryEntryRequestŸŸô ∏
requestŸŸπ ¿
)ŸŸ¿ ¡
{
⁄⁄ 
var
€€ 
userId
€€ 
=
€€ 
IsArzt
€€ 
(
€€ 
)
€€ 
?
€€ 
null
€€  $
:
€€% &
GetCurrentUserId
€€' 7
(
€€7 8
)
€€8 9
;
€€9 :
var
‹‹ 
result
‹‹ 
=
‹‹ 
await
‹‹ (
_familyHistoryEntryService
‹‹ 5
.
‹‹5 6
UpdateAsync
‹‹6 A
(
‹‹A B
	patientId
‹‹B K
,
‹‹K L"
familyHistoryEntryId
‹‹M a
,
‹‹a b
request
‹‹c j
,
‹‹j k
userId
‹‹l r
)
‹‹r s
;
‹‹s t
if
ﬁﬁ 

(
ﬁﬁ 
result
ﬁﬁ 
.
ﬁﬁ 
	IsSuccess
ﬁﬁ 
)
ﬁﬁ 
return
ﬂﬂ 
Ok
ﬂﬂ 
(
ﬂﬂ 
result
ﬂﬂ 
.
ﬂﬂ 
Data
ﬂﬂ !
)
ﬂﬂ! "
;
ﬂﬂ" #
return
··  
HandleServiceError
·· !
(
··! "
result
··" (
.
··( )
	ErrorType
··) 2
,
··2 3
result
··4 :
.
··: ;
ErrorMessage
··; G
)
··G H
;
··H I
}
‚‚ 
[
ËË 
HttpGet
ËË 
(
ËË 
$str
ËË $
)
ËË$ %
]
ËË% &
[
ÈÈ "
ProducesResponseType
ÈÈ 
(
ÈÈ 
StatusCodes
ÈÈ %
.
ÈÈ% &
Status200OK
ÈÈ& 1
)
ÈÈ1 2
]
ÈÈ2 3
[
ÍÍ "
ProducesResponseType
ÍÍ 
(
ÍÍ 
StatusCodes
ÍÍ %
.
ÍÍ% &
Status404NotFound
ÍÍ& 7
)
ÍÍ7 8
]
ÍÍ8 9
public
ÎÎ 

async
ÎÎ 
Task
ÎÎ 
<
ÎÎ 
ActionResult
ÎÎ "
<
ÎÎ" #
IEnumerable
ÎÎ# .
<
ÎÎ. /
DiagnosisResponse
ÎÎ/ @
>
ÎÎ@ A
>
ÎÎA B
>
ÎÎB C%
GetDiagnosesByPatientId
ÎÎD [
(
ÎÎ[ \
int
ÎÎ\ _
	patientId
ÎÎ` i
)
ÎÎi j
{
ÏÏ 
var
ÌÌ 
userId
ÌÌ 
=
ÌÌ 
IsArzt
ÌÌ 
(
ÌÌ 
)
ÌÌ 
?
ÌÌ 
null
ÌÌ  $
:
ÌÌ% &
GetCurrentUserId
ÌÌ' 7
(
ÌÌ7 8
)
ÌÌ8 9
;
ÌÌ9 :
var
ÓÓ 
result
ÓÓ 
=
ÓÓ 
await
ÓÓ 
_diagnosisService
ÓÓ ,
.
ÓÓ, -
GetAllAsync
ÓÓ- 8
(
ÓÓ8 9
	patientId
ÓÓ9 B
,
ÓÓB C
userId
ÓÓD J
)
ÓÓJ K
;
ÓÓK L
if
 

(
 
result
 
.
 
	IsSuccess
 
)
 
return
ÒÒ 
Ok
ÒÒ 
(
ÒÒ 
result
ÒÒ 
.
ÒÒ 
Data
ÒÒ !
)
ÒÒ! "
;
ÒÒ" #
return
ÛÛ  
HandleServiceError
ÛÛ !
(
ÛÛ! "
result
ÛÛ" (
.
ÛÛ( )
	ErrorType
ÛÛ) 2
,
ÛÛ2 3
result
ÛÛ4 :
.
ÛÛ: ;
ErrorMessage
ÛÛ; G
)
ÛÛG H
;
ÛÛH I
}
ÙÙ 
[
ˆˆ 
HttpPost
ˆˆ 
(
ˆˆ 
$str
ˆˆ %
)
ˆˆ% &
]
ˆˆ& '
[
˜˜ "
ProducesResponseType
˜˜ 
(
˜˜ 
StatusCodes
˜˜ %
.
˜˜% &
Status201Created
˜˜& 6
)
˜˜6 7
]
˜˜7 8
[
¯¯ "
ProducesResponseType
¯¯ 
(
¯¯ 
StatusCodes
¯¯ %
.
¯¯% &!
Status400BadRequest
¯¯& 9
)
¯¯9 :
]
¯¯: ;
[
˘˘ "
ProducesResponseType
˘˘ 
(
˘˘ 
StatusCodes
˘˘ %
.
˘˘% &
Status404NotFound
˘˘& 7
)
˘˘7 8
]
˘˘8 9
public
˙˙ 

async
˙˙ 
Task
˙˙ 
<
˙˙ 
ActionResult
˙˙ "
<
˙˙" #
DiagnosisResponse
˙˙# 4
>
˙˙4 5
>
˙˙5 6)
CreateDiagnosisForPatientId
˙˙7 R
(
˙˙R S
int
˙˙S V
	patientId
˙˙W `
,
˙˙` a
[
˙˙b c
FromBody
˙˙c k
]
˙˙k l%
CreateDiagnosisRequest˙˙m É
request˙˙Ñ ã
)˙˙ã å
{
˚˚ 
var
¸¸ 
userId
¸¸ 
=
¸¸ 
IsArzt
¸¸ 
(
¸¸ 
)
¸¸ 
?
¸¸ 
null
¸¸  $
:
¸¸% &
GetCurrentUserId
¸¸' 7
(
¸¸7 8
)
¸¸8 9
;
¸¸9 :
var
˝˝ 
result
˝˝ 
=
˝˝ 
await
˝˝ 
_diagnosisService
˝˝ ,
.
˝˝, -
CreateAsync
˝˝- 8
(
˝˝8 9
	patientId
˝˝9 B
,
˝˝B C
request
˝˝D K
,
˝˝K L
userId
˝˝M S
)
˝˝S T
;
˝˝T U
if
ˇˇ 

(
ˇˇ 
result
ˇˇ 
.
ˇˇ 
	IsSuccess
ˇˇ 
)
ˇˇ 
return
ÄÄ 
CreatedAtAction
ÄÄ "
(
ÄÄ" #
nameof
ÄÄ# )
(
ÄÄ) *!
DiagnosisController
ÄÄ* =
.
ÄÄ= >
GetById
ÄÄ> E
)
ÄÄE F
,
ÄÄF G
$str
ÄÄH S
,
ÄÄS T
new
ÄÄU X
{
ÄÄY Z
id
ÄÄ[ ]
=
ÄÄ^ _
result
ÄÄ` f
.
ÄÄf g
Data
ÄÄg k
.
ÄÄk l
Id
ÄÄl n
}
ÄÄo p
,
ÄÄp q
result
ÄÄr x
.
ÄÄx y
Data
ÄÄy }
)
ÄÄ} ~
;
ÄÄ~ 
return
ÇÇ  
HandleServiceError
ÇÇ !
(
ÇÇ! "
result
ÇÇ" (
.
ÇÇ( )
	ErrorType
ÇÇ) 2
,
ÇÇ2 3
result
ÇÇ4 :
.
ÇÇ: ;
ErrorMessage
ÇÇ; G
)
ÇÇG H
;
ÇÇH I
}
ÉÉ 
[
ÖÖ 
HttpPut
ÖÖ 
(
ÖÖ 
$str
ÖÖ 2
)
ÖÖ2 3
]
ÖÖ3 4
[
ÜÜ "
ProducesResponseType
ÜÜ 
(
ÜÜ 
StatusCodes
ÜÜ %
.
ÜÜ% &
Status200OK
ÜÜ& 1
)
ÜÜ1 2
]
ÜÜ2 3
[
áá "
ProducesResponseType
áá 
(
áá 
StatusCodes
áá %
.
áá% &!
Status400BadRequest
áá& 9
)
áá9 :
]
áá: ;
[
àà "
ProducesResponseType
àà 
(
àà 
StatusCodes
àà %
.
àà% &
Status404NotFound
àà& 7
)
àà7 8
]
àà8 9
public
ââ 

async
ââ 
Task
ââ 
<
ââ 
ActionResult
ââ "
<
ââ" #
DiagnosisResponse
ââ# 4
>
ââ4 5
>
ââ5 6)
UpdateDiagnosisForPatientId
ââ7 R
(
ââR S
int
ââS V
	patientId
ââW `
,
ââ` a
int
ââb e
diagnosisId
ââf q
,
ââq r
[
ââs t
FromBody
âât |
]
ââ| }%
UpdateDiagnosisRequestââ~ î
requestââï ú
)ââú ù
{
ää 
var
ãã 
userId
ãã 
=
ãã 
IsArzt
ãã 
(
ãã 
)
ãã 
?
ãã 
null
ãã  $
:
ãã% &
GetCurrentUserId
ãã' 7
(
ãã7 8
)
ãã8 9
;
ãã9 :
var
åå 
result
åå 
=
åå 
await
åå 
_diagnosisService
åå ,
.
åå, -
UpdateAsync
åå- 8
(
åå8 9
	patientId
åå9 B
,
ååB C
diagnosisId
ååD O
,
ååO P
request
ååQ X
,
ååX Y
userId
ååZ `
)
åå` a
;
ååa b
if
éé 

(
éé 
result
éé 
.
éé 
	IsSuccess
éé 
)
éé 
return
èè 
Ok
èè 
(
èè 
result
èè 
.
èè 
Data
èè !
)
èè! "
;
èè" #
return
ëë  
HandleServiceError
ëë !
(
ëë! "
result
ëë" (
.
ëë( )
	ErrorType
ëë) 2
,
ëë2 3
result
ëë4 :
.
ëë: ;
ErrorMessage
ëë; G
)
ëëG H
;
ëëH I
}
íí 
}ïï ‡I
OC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\MedicationController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[

 
	Authorize

 

]


 
[ 
ApiController 
] 
[ 
Route 
( 
$str 
) 
] 
public 
class  
MedicationController !
:" #
BaseApiController$ 5
{ 
private 
readonly 
IMedicationService '
_medicationService( :
;: ;
private 
readonly #
IKnownMedicationService ,#
_knownMedicationService- D
;D E
private 
readonly 

IAIService 

_aiService  *
;* +
public 
 
MedicationController 
(  
IMedicationService  2
medicationService3 D
,D E#
IKnownMedicationServiceF ]"
knownMedicationService^ t
,t u

IAIService	v Ä
	aiService
Å ä
)
ä ã
{ 
_medicationService 
= 
medicationService .
;. /#
_knownMedicationService 
=  !"
knownMedicationService" 8
;8 9

_aiService 
= 
	aiService 
; 
} 
[ 
HttpGet 
( 
$str 
) 
] 
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status200OK& 1
)1 2
]2 3
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status404NotFound& 7
)7 8
]8 9
public 

async 
Task 
< 
ActionResult "
>" #
GetById$ +
(+ ,
int, /
id0 2
)2 3
{ 
var 
userId 
= 
IsArzt 
( 
) 
? 
null  $
:% &
GetCurrentUserId' 7
(7 8
)8 9
;9 :
var   
result   
=   
await   
_medicationService   -
.  - .
GetByIdAsync  . :
(  : ;
id  ; =
,  = >
userId  ? E
)  E F
;  F G
if"" 

("" 
result"" 
."" 
	IsSuccess"" 
)"" 
return## 
Ok## 
(## 
result## 
.## 
Data## !
)##! "
;##" #
return%% 
HandleServiceError%% !
(%%! "
result%%" (
.%%( )
	ErrorType%%) 2
,%%2 3
result%%4 :
.%%: ;
ErrorMessage%%; G
)%%G H
;%%H I
}&& 
[(( 

HttpDelete(( 
((( 
$str(( 
)(( 
](( 
[))  
ProducesResponseType)) 
()) 
StatusCodes)) %
.))% &
Status204NoContent))& 8
)))8 9
]))9 :
[**  
ProducesResponseType** 
(** 
StatusCodes** %
.**% &
Status404NotFound**& 7
)**7 8
]**8 9
public++ 

async++ 
Task++ 
<++ 
ActionResult++ "
>++" #
Delete++$ *
(++* +
int+++ .
id++/ 1
)++1 2
{,, 
var-- 
userId-- 
=-- 
IsArzt-- 
(-- 
)-- 
?-- 
null--  $
:--% &
GetCurrentUserId--' 7
(--7 8
)--8 9
;--9 :
var.. 
result.. 
=.. 
await.. 
_medicationService.. -
...- .
DeleteAsync... 9
(..9 :
id..: <
,..< =
userId..> D
)..D E
;..E F
if00 

(00 
result00 
.00 
	IsSuccess00 
)00 
return11 
	NoContent11 
(11 
)11 
;11 
return33 
HandleServiceError33 !
(33! "
result33" (
.33( )
	ErrorType33) 2
,332 3
result334 :
.33: ;
ErrorMessage33; G
)33G H
;33H I
}44 
[66 
AllowAnonymous66 
]66 
[77 
HttpPost77 
(77 
$str77 
)77 
]77 
[88 
Consumes88 
(88 
$str88 #
)88# $
]88$ %
[99  
ProducesResponseType99 
(99 
StatusCodes99 %
.99% &
Status200OK99& 1
)991 2
]992 3
[::  
ProducesResponseType:: 
(:: 
StatusCodes:: %
.::% &
Status400BadRequest::& 9
)::9 :
]::: ;
public;; 

async;; 
Task;; 
<;; 
ActionResult;; "
>;;" #
ScanMedication;;$ 2
(;;2 3
[;;3 4
FromForm;;4 <
];;< =
	IFormFile;;> G
image;;H M
);;M N
{<< 
if== 

(== 
image== 
==== 
null== 
||== 
image== "
.==" #
Length==# )
====* ,
$num==- .
)==. /
return>> 

BadRequest>> 
(>> 
$str>> 6
)>>6 7
;>>7 8
using@@ 
var@@ 
ms@@ 
=@@ 
new@@ 
MemoryStream@@ '
(@@' (
)@@( )
;@@) *
awaitAA 
imageAA 
.AA 
CopyToAsyncAA 
(AA  
msAA  "
)AA" #
;AA# $
varBB 
base64BB 
=BB 
ConvertBB 
.BB 
ToBase64StringBB +
(BB+ ,
msBB, .
.BB. /
ToArrayBB/ 6
(BB6 7
)BB7 8
)BB8 9
;BB9 :
varDD 
resultDD 
=DD 
awaitDD 

_aiServiceDD %
.DD% &$
InterpretMedicationImageDD& >
(DD> ?
base64DD? E
,DDE F
imageDDG L
.DDL M
ContentTypeDDM X
)DDX Y
;DDY Z
ifFF 

(FF 
!FF 
resultFF 
.FF 
	IsSuccessFF 
)FF 
returnGG 
HandleServiceErrorGG %
(GG% &
resultGG& ,
.GG, -
	ErrorTypeGG- 6
,GG6 7
resultGG8 >
.GG> ?
ErrorMessageGG? K
)GGK L
;GGL M
varII 
dataII 
=II 
resultII 
.II 
DataII 
;II 
ConsoleKK 
.KK 
	WriteLineKK 
(KK 
$"KK 
$strKK .
{KK. /
dataKK/ 3
?KK3 4
.KK4 5
BrandKK5 :
}KK: ;
$strKK; I
{KKI J
dataKKJ N
?KKN O
.KKO P
ProductNameKKP [
}KK[ \
$strKK\ o
{KKo p
dataKKp t
?KKt u
.KKu v
ActiveIngredient	KKv Ü
}
KKÜ á
$str
KKá ê
{
KKê ë
data
KKë ï
?
KKï ñ
.
KKñ ó
Dosage
KKó ù
}
KKù û
$str
KKû •
{
KK• ¶
data
KK¶ ™
?
KK™ ´
.
KK´ ¨
Form
KK¨ ∞
}
KK∞ ±
"
KK± ≤
)
KK≤ ≥
;
KK≥ ¥
varMM 

medicationMM 
=MM 
awaitMM #
_knownMedicationServiceMM 6
.MM6 7
IdentifyAsyncMM7 D
(MMD E
brandNN 
:NN 
dataNN 
?NN 
.NN 
BrandNN 
,NN 
productNameOO 
:OO 
dataOO 
?OO 
.OO 
ProductNameOO *
,OO* +
activeIngredientPP 
:PP 
dataPP "
?PP" #
.PP# $
ActiveIngredientPP$ 4
,PP4 5
dosageQQ 
:QQ 
dataQQ 
?QQ 
.QQ 
DosageQQ  
,QQ  !
formRR 
:RR 
dataRR 
?RR 
.RR 
FormRR 
)SS 	
;SS	 

ConsoleUU 
.UU 
	WriteLineUU 
(UU 
$"UU 
$strUU 5
{UU5 6

medicationUU6 @
?UU@ A
.UUA B
NameUUB F
}UUF G
$strUUG P
{UUP Q

medicationUUQ [
?UU[ \
.UU\ ]
DosageUU] c
}UUc d
"UUd e
)UUe f
;UUf g
returnWW 
OkWW 
(WW 
newWW 
{XX 	
nameYY 
=YY 

medicationYY 
?YY 
.YY 
NameYY #
,YY# $
dosageZZ 
=ZZ 

medicationZZ 
?ZZ  
.ZZ  !
DosageZZ! '
,ZZ' (
}[[ 	
)[[	 

;[[
 
}\\ 
}]] “"
RC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\MedicalLetterController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[ 
ApiController 
] 
[		 
Route		 
(		 
$str		 
)		 
]		 
public

 
class

 #
MedicalLetterController

 $
:

% &
ControllerBase

' 5
{ 
private !
IMedicalLetterService !!
_medicalLetterService" 7
;7 8
public 
#
MedicalLetterController "
(" #!
IMedicalLetterService# 8 
medicalLetterService9 M
)M N
{ !
_medicalLetterService 
=  
medicalLetterService  4
;4 5
} 
[ 
HttpPost 
] 
public 

async 
Task 
< 
ActionResult "
>" #
CreateAsync$ /
(/ 0
[0 1
FromBody1 9
]9 :&
CreateMedicalLetterRequest; U
requestV ]
)] ^
{ 
var 
newMedicalLetter 
= 
await $!
_medicalLetterService% :
.: ;
CreateAsync; F
(F G
requestG N
,N O
nullP T
)T U
;U V
return 
Created 
( 
) 
; 
} 
[ 
HttpGet 
( 
$str 
) 
] 
public 

async 
Task 
< 
ActionResult "
>" #
GetByIdAsync$ 0
(0 1
int1 4
id5 7
)7 8
{ 
var 
letter 
= 
await !
_medicalLetterService 0
.0 1
GetByIdAsync1 =
(= >
id> @
,@ A
nullB F
)F G
;G H
return 
Ok 
( 
letter 
) 
; 
} 
[   
HttpGet   
(   
$str   "
)  " #
]  # $
public!! 

async!! 
Task!! 
<!! 
ActionResult!! "
>!!" #
GetByPatientIdAsync!!$ 7
(!!7 8
int!!8 ;
	patientId!!< E
)!!E F
{"" 
var## 
letters## 
=## 
await## !
_medicalLetterService## 1
.##1 2
GetByPatientIdAsync##2 E
(##E F
	patientId##F O
,##O P
null##Q U
)##U V
;##V W
return$$ 
Ok$$ 
($$ 
letters$$ 
)$$ 
;$$ 
}%% 
['' 
HttpPut'' 
('' 
$str'' 
)'' 
]'' 
public(( 

async(( 
Task(( 
<(( 
ActionResult(( "
>((" #
UpdateAsync(($ /
(((/ 0
int((0 3
id((4 6
,((6 7
[((8 9
FromBody((9 A
]((A B&
CreateMedicalLetterRequest((C ]
request((^ e
)((e f
{)) 
var** 
updatedLetter** 
=** 
await** !!
_medicalLetterService**" 7
.**7 8
UpdateAsync**8 C
(**C D
id**D F
,**F G
request**H O
,**O P
null**Q U
)**U V
;**V W
return++ 
Ok++ 
(++ 
updatedLetter++ 
)++  
;++  !
},, 
[.. 

HttpDelete.. 
(.. 
$str.. 
).. 
].. 
public// 

async// 
Task// 
<// 
ActionResult// "
>//" #
DeleteAsync//$ /
(/// 0
int//0 3
id//4 6
)//6 7
{00 
await11 !
_medicalLetterService11 #
.11# $
DeleteAsync11$ /
(11/ 0
id110 2
,112 3
null114 8
)118 9
;119 :
return22 
	NoContent22 
(22 
)22 
;22 
}33 
}44 Œ 
XC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\MedicalHistoryEntryController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[ 
	Authorize 

]
 
[		 
ApiController		 
]		 
[

 
Route

 
(

 
$str

 $
)

$ %
]

% &
public 
class )
MedicalHistoryEntryController *
:+ ,
BaseApiController- >
{ 
private 
readonly '
IMedicalHistoryEntryService 0'
_medicalHistoryEntryService1 L
;L M
public 
)
MedicalHistoryEntryController (
(( )'
IMedicalHistoryEntryService) D&
medicalHistoryEntryServiceE _
)_ `
{ '
_medicalHistoryEntryService #
=$ %&
medicalHistoryEntryService& @
;@ A
} 
[ 
HttpGet 
( 
$str 
) 
] 
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status200OK& 1
)1 2
]2 3
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status404NotFound& 7
)7 8
]8 9
public 

async 
Task 
< 
ActionResult "
>" #
GetById$ +
(+ ,
int, /
id0 2
)2 3
{ 
var 
userId 
= 
IsArzt 
( 
) 
? 
null  $
:% &
GetCurrentUserId' 7
(7 8
)8 9
;9 :
var 
result 
= 
await '
_medicalHistoryEntryService 6
.6 7
GetByIdAsync7 C
(C D
idD F
,F G
userIdH N
)N O
;O P
if 

( 
result 
. 
	IsSuccess 
) 
return 
Ok 
( 
result 
. 
Data !
)! "
;" #
return 
HandleServiceError !
(! "
result" (
.( )
	ErrorType) 2
,2 3
result4 :
.: ;
ErrorMessage; G
)G H
;H I
}   
["" 

HttpDelete"" 
("" 
$str"" 
)"" 
]"" 
[##  
ProducesResponseType## 
(## 
StatusCodes## %
.##% &
Status204NoContent##& 8
)##8 9
]##9 :
[$$  
ProducesResponseType$$ 
($$ 
StatusCodes$$ %
.$$% &
Status404NotFound$$& 7
)$$7 8
]$$8 9
public%% 

async%% 
Task%% 
<%% 
ActionResult%% "
>%%" #
Delete%%$ *
(%%* +
int%%+ .
id%%/ 1
)%%1 2
{&& 
var'' 
userId'' 
='' 
IsArzt'' 
('' 
)'' 
?'' 
null''  $
:''% &
GetCurrentUserId''' 7
(''7 8
)''8 9
;''9 :
var(( 
result(( 
=(( 
await(( '
_medicalHistoryEntryService(( 6
.((6 7
DeleteAsync((7 B
(((B C
id((C E
,((E F
userId((G M
)((M N
;((N O
if** 

(** 
result** 
.** 
	IsSuccess** 
)** 
return++ 
	NoContent++ 
(++ 
)++ 
;++ 
return-- 
HandleServiceError-- !
(--! "
result--" (
.--( )
	ErrorType--) 2
,--2 3
result--4 :
.--: ;
ErrorMessage--; G
)--G H
;--H I
}.. 
}// ª5
TC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\KnownMedicationController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
[		 
ApiController		 
]		 
[

 
Route

 

(


 
$str

 "
)

" #
]

# $
public 

class %
KnownMedicationController *
:+ ,
ControllerBase- ;
{ 
private 
readonly #
IKnownMedicationService 0
_service1 9
;9 :
private 
readonly #
IDrugInteractionService 0#
_drugInteractionService1 H
;H I
private 
readonly 
IWebHostEnvironment ,
_env- 1
;1 2
public %
KnownMedicationController (
(( )#
IKnownMedicationService) @
serviceA H
,H I
IWebHostEnvironmentJ ]
env^ a
,a b#
IDrugInteractionServicec z#
drugInteractionService	{ ë
)
ë í
{ 	
_service 
= 
service 
; 
_env 
= 
env 
; #
_drugInteractionService #
=$ %"
drugInteractionService& <
;< =
} 	
[ 	
	Authorize	 
] 
[ 	
HttpGet	 
( 
$str 
) 
] 
public 
async 
Task 
< 
IActionResult '
>' (
Search) /
(/ 0
[0 1
	FromQuery1 :
]: ;
string< B
qC D
)D E
{ 	
var 
results 
= 
await 
_service  (
.( )
SearchAsync) 4
(4 5
q5 6
)6 7
;7 8
return 
Ok 
( 
results 
) 
; 
} 	
[   	
HttpPost  	 
(   
$str   
)   
]   
public!! 
async!! 
Task!! 
<!! 
IActionResult!! '
>!!' (
Rebuild!!) 0
(!!0 1
)!!1 2
{"" 	
var## 
csvPath## 
=## 
Path## 
.## 
Combine## &
(##& '
_env##' +
.##+ ,
ContentRootPath##, ;
,##; <
$str##= B
,##B C
$str##D V
,##V W
$str##X z
)##z {
;##{ |
if%% 
(%% 
!%% 
System%% 
.%% 
IO%% 
.%% 
File%% 
.%%  
Exists%%  &
(%%& '
csvPath%%' .
)%%. /
)%%/ 0
return&& 
NotFound&& 
(&&  
$str&&  ;
)&&; <
;&&< =
await(( 
_service(( 
.(( 
RebuildFromCsvAsync(( .
(((. /
csvPath((/ 6
)((6 7
;((7 8
return)) 
Ok)) 
()) 
$str)) 5
)))5 6
;))6 7
}** 	
[,, 	
HttpPost,,	 
(,, 
$str,, (
),,( )
],,) *
public-- 
async-- 
Task-- 
<-- 
IActionResult-- '
>--' (
RebuildInteractions--) <
(--< =
)--= >
{.. 	
var// 
xmlPath// 
=// 
Path// 
.// 
Combine// &
(//& '
_env//' +
.//+ ,
ContentRootPath//, ;
,//; <
$str//= B
,//B C
$str//D V
,//V W
$str//X r
)//r s
;//s t
if00 
(00 
!00 
System00 
.00 
IO00 
.00 
File00 
.00  
Exists00  &
(00& '
xmlPath00' .
)00. /
)00/ 0
return11 
NotFound11 
(11  
$str11  ;
)11; <
;11< =
var33 
results33 
=33 
await33 #
_drugInteractionService33  7
.337 8
ImportDrugDataAsync338 K
(33K L
xmlPath33L S
)33S T
;33T U
if55 
(55 
results55 
.55 
	IsSuccess55  
)55  !
return55" (
Ok55) +
(55+ ,
$str55, J
)55J K
;55K L
return77 

BadRequest77 
(77 
results77 %
.77% &
ErrorMessage77& 2
)772 3
;773 4
}88 	
[:: 	
	Authorize::	 
]:: 
[;; 	
HttpPost;;	 
(;; 
$str;; 
);; 
];; 
public<< 
async<< 
Task<< 
<<< 
IActionResult<< '
><<' (
Identify<<) 1
(<<1 2
[<<2 3
FromBody<<3 ;
]<<; <
IdentifyRequest<<= L
request<<M T
)<<T U
{== 	
var>> 
result>> 
=>> 
await>> 
_service>> '
.>>' (
IdentifyAsync>>( 5
(>>5 6
brand?? 
:?? 
request?? 
.?? 
Brand?? $
,??$ %
productName@@ 
:@@ 
request@@ $
.@@$ %
ProductName@@% 0
,@@0 1
activeIngredientAA  
:AA  !
requestAA" )
.AA) *
ActiveIngredientAA* :
,AA: ;
dosageBB 
:BB 
requestBB 
.BB  
DosageBB  &
,BB& '
formCC 
:CC 
requestCC 
.CC 
FormCC "
)DD 
;DD 
ifFF 
(FF 
resultFF 
==FF 
nullFF 
)FF 
returnGG 
NotFoundGG 
(GG  
)GG  !
;GG! "
returnII 
OkII 
(II 
resultII 
)II 
;II 
}JJ 	
}KK 
publicMM 

recordMM 
IdentifyRequestMM !
(MM! "
stringNN 
?NN 
BrandNN 
,NN 
stringOO 
?OO 
ProductNameOO 
,OO 
stringPP 
?PP 
ActiveIngredientPP  
,PP  !
stringQQ 
?QQ 
DosageQQ 
,QQ 
stringRR 
?RR 
FormRR 
)SS 
;SS 
}TT Á
NC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\HealthTipController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
[ 
ApiController 
] 
[ 
Route 

(
 
$str 
) 
] 
public 

class 
HealthTipController $
:% &
BaseApiController' 8
{		 
private

 
readonly

 
IHealthTipService

 *
_healthTipService

+ <
;

< =
public 
HealthTipController "
(" #
IHealthTipService# 4
healthTipService5 E
)E F
{ 	
_healthTipService 
= 
healthTipService  0
;0 1
} 	
[ 	
HttpGet	 
( 
$str 
) 
] 
public 
IActionResult 
GetTodayHealthTip .
(. /
)/ 0
{ 	
var 
result 
= 
_healthTipService *
.* +
GetTodayHealthTip+ <
(< =
)= >
;> ?
if 
( 
result 
. 
	IsSuccess  
)  !
{ 
return 
Ok 
( 
new 
{ 
Tip 
= 
result  
.  !
Data! %
} 
) 
; 
} 
return 
HandleServiceError %
(% &
result& ,
., -
	ErrorType- 6
,6 7
result8 >
.> ?
ErrorMessage? K
)K L
;L M
} 	
} 
}   Ñ#
WC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\FamilyHistoryEntryController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
[		 
	Authorize		 
]		 
[

 
ApiController

 
]

 
[ 
Route 

(
 
$str '
)' (
]( )
public 

class (
FamilyHistoryEntryController -
:. /
BaseApiController0 A
{ 
private 
readonly &
IFamilyHistoryEntryService 3&
_familyHistoryEntryService4 N
;N O
public (
FamilyHistoryEntryController +
(+ ,&
IFamilyHistoryEntryService, F%
familyHistoryEntryServiceG `
)` a
{ 	&
_familyHistoryEntryService &
=' (%
familyHistoryEntryService) B
;B C
} 	
[ 	
HttpGet	 
( 
$str 
) 
] 
[ 	 
ProducesResponseType	 
( 
StatusCodes )
.) *
Status200OK* 5
)5 6
]6 7
[ 	 
ProducesResponseType	 
( 
StatusCodes )
.) *
Status404NotFound* ;
); <
]< =
public 
async 
Task 
< 
ActionResult &
<& '&
FamilyHistoryEntryResponse' A
>A B
>B C
GetByIdD K
(K L
intL O
idP R
)R S
{ 	
var 
result 
= 
await &
_familyHistoryEntryService 9
.9 :
GetByIdAsync: F
(F G
idG I
,I J
GetCurrentUserIdK [
([ \
)\ ]
)] ^
;^ _
if 
( 
result 
. 
	IsSuccess  
)  !
{ 
return 
Ok 
( 
result  
.  !
Data! %
)% &
;& '
} 
return!! 
result!! 
.!! 
	ErrorType!! #
switch!!$ *
{"" 
ServiceErrorType##  
.##  !
NotFound##! )
=>##* ,
NotFound##- 5
(##5 6
result##6 <
.##< =
ErrorMessage##= I
)##I J
,##J K
_$$ 
=>$$ 

BadRequest$$ 
($$  
result$$  &
.$$& '
ErrorMessage$$' 3
)$$3 4
}%% 
;%% 
}&& 	
[(( 	

HttpDelete((	 
((( 
$str(( 
)(( 
](( 
[)) 	 
ProducesResponseType))	 
()) 
StatusCodes)) )
.))) *
Status204NoContent))* <
)))< =
]))= >
[** 	 
ProducesResponseType**	 
(** 
StatusCodes** )
.**) *
Status404NotFound*** ;
)**; <
]**< =
public++ 
async++ 
Task++ 
<++ 
ActionResult++ &
>++& '
Delete++( .
(++. /
int++/ 2
id++3 5
)++5 6
{,, 	
var-- 
result-- 
=-- 
await-- &
_familyHistoryEntryService-- 9
.--9 :
DeleteAsync--: E
(--E F
id--F H
,--H I
GetCurrentUserId--J Z
(--Z [
)--[ \
)--\ ]
;--] ^
if// 
(// 
result// 
.// 
	IsSuccess//  
)//  !
{00 
return11 
	NoContent11  
(11  !
)11! "
;11" #
}22 
return44 
result44 
.44 
	ErrorType44 #
switch44$ *
{55 
ServiceErrorType66  
.66  !
NotFound66! )
=>66* ,
NotFound66- 5
(665 6
result666 <
.66< =
ErrorMessage66= I
)66I J
,66J K
_77 
=>77 

BadRequest77 
(77  
result77  &
.77& '
ErrorMessage77' 3
)773 4
}88 
;88 
}99 	
}:: 
};; Ωf
MC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\DiagnoseController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[ 
	Authorize 

]
 
[ 
ApiController 
] 
[ 
Route 
( 
$str 
) 
] 
public 
class 
DiagnosisController  
:! "
BaseApiController# 4
{ 
private 
readonly 
IDiagnosisService &
_diagnosisService' 8
;8 9
private 
readonly 
IAnonymizerService '
_anonymizerService( :
;: ;
private 
readonly 

IAIService 

_aiService  *
;* +
public 

DiagnosisController 
( 
IDiagnosisService 0
diagnosisService1 A
,A B
IAnonymizerServiceC U

anonymizerV `
,` a

IAIServiceb l
	aiServicem v
)v w
{ 
_diagnosisService   
=   
diagnosisService   ,
;  , -
_anonymizerService!! 
=!! 

anonymizer!! '
;!!' (

_aiService"" 
="" 
	aiService"" 
;"" 
}## 
[%% 
HttpGet%% 
(%% 
$str%% 
)%% 
]%% 
[&&  
ProducesResponseType&& 
(&& 
StatusCodes&& %
.&&% &
Status200OK&&& 1
)&&1 2
]&&2 3
[''  
ProducesResponseType'' 
('' 
StatusCodes'' %
.''% &
Status404NotFound''& 7
)''7 8
]''8 9
public(( 

async(( 
Task(( 
<(( 
ActionResult(( "
>((" #
GetById(($ +
(((+ ,
int((, /
id((0 2
)((2 3
{)) 
var** 
userId** 
=** 
IsArzt** 
(** 
)** 
?** 
null**  $
:**% &
GetCurrentUserId**' 7
(**7 8
)**8 9
;**9 :
var++ 
result++ 
=++ 
await++ 
_diagnosisService++ ,
.++, -
GetByIdAsync++- 9
(++9 :
id++: <
,++< =
userId++> D
)++D E
;++E F
if-- 

(-- 
result-- 
.-- 
	IsSuccess-- 
)-- 
return.. 
Ok.. 
(.. 
result.. 
... 
Data.. !
)..! "
;.." #
return00 
HandleServiceError00 !
(00! "
result00" (
.00( )
	ErrorType00) 2
,002 3
result004 :
.00: ;
ErrorMessage00; G
)00G H
;00H I
}11 
[33 

HttpDelete33 
(33 
$str33 
)33 
]33 
[44  
ProducesResponseType44 
(44 
StatusCodes44 %
.44% &
Status204NoContent44& 8
)448 9
]449 :
[55  
ProducesResponseType55 
(55 
StatusCodes55 %
.55% &
Status404NotFound55& 7
)557 8
]558 9
public66 

async66 
Task66 
<66 
ActionResult66 "
>66" #
Delete66$ *
(66* +
int66+ .
id66/ 1
)661 2
{77 
var88 
userId88 
=88 
IsArzt88 
(88 
)88 
?88 
null88  $
:88% &
GetCurrentUserId88' 7
(887 8
)888 9
;889 :
var99 
result99 
=99 
await99 
_diagnosisService99 ,
.99, -
DeleteAsync99- 8
(998 9
id999 ;
,99; <
userId99= C
)99C D
;99D E
if;; 

(;; 
result;; 
.;; 
	IsSuccess;; 
);; 
return<< 
	NoContent<< 
(<< 
)<< 
;<< 
return>> 
HandleServiceError>> !
(>>! "
result>>" (
.>>( )
	ErrorType>>) 2
,>>2 3
result>>4 :
.>>: ;
ErrorMessage>>; G
)>>G H
;>>H I
}?? 
[AA 
HttpPostAA 
(AA 
$strAA  
)AA  !
]AA! "
[BB  
ProducesResponseTypeBB 
(BB 
StatusCodesBB %
.BB% &
Status200OKBB& 1
)BB1 2
]BB2 3
[CC  
ProducesResponseTypeCC 
(CC 
StatusCodesCC %
.CC% &
Status400BadRequestCC& 9
)CC9 :
]CC: ;
publicDD 

asyncDD 
TaskDD 
<DD 
IActionResultDD #
>DD# $
ScanDD% )
(DD) *
intDD* -
	patientIdDD. 7
,DD7 8
[DD9 :
FromFormDD: B
]DDB C
	IFormFileDDD M
fileDDN R
)DDR S
{EE 
ifFF 

(FF 
fileFF 
==FF 
nullFF 
||FF 
fileFF  
.FF  !
LengthFF! '
==FF( *
$numFF+ ,
)FF, -
{GG 	
returnHH 

BadRequestHH 
(HH 
$strHH 8
)HH8 9
;HH9 :
}II 	
varKK 
userIdKK 
=KK 
IsArztKK 
(KK 
)KK 
?KK 
nullKK  $
:KK% &
GetCurrentUserIdKK' 7
(KK7 8
)KK8 9
;KK9 :
tryMM 
{NN 	&
InMemoryRandomAccessStreamOO &
randomAccessStreamOO' 9
=OO: ;
newOO< ?&
InMemoryRandomAccessStreamOO@ Z
(OOZ [
)OO[ \
;OO\ ]
bytePP 
[PP 
]PP 

imageBytesPP 
;PP 
stringQQ 
	extensionQQ 
=QQ 
PathQQ #
.QQ# $
GetExtensionQQ$ 0
(QQ0 1
fileQQ1 5
.QQ5 6
FileNameQQ6 >
)QQ> ?
.QQ? @
ToLowerQQ@ G
(QQG H
)QQH I
;QQI J
ifSS 
(SS 
	extensionSS 
==SS 
$strSS #
)SS# $
{TT 
usingUU 
varUU 
	pdfStreamUU #
=UU$ %
fileUU& *
.UU* +
OpenReadStreamUU+ 9
(UU9 :
)UU: ;
;UU; <
usingVV 
varVV 
	memStreamVV #
=VV$ %
newVV& )
MemoryStreamVV* 6
(VV6 7
)VV7 8
;VV8 9
awaitWW 
	pdfStreamWW 
.WW  
CopyToAsyncWW  +
(WW+ ,
	memStreamWW, 5
)WW5 6
;WW6 7
stringYY 
pdfAsBase64YY "
=YY# $
ConvertYY% ,
.YY, -
ToBase64StringYY- ;
(YY; <
	memStreamYY< E
.YYE F
ToArrayYYF M
(YYM N
)YYN O
)YYO P
;YYP Q
var[[ 
options[[ 
=[[ 
new[[ !
RenderOptions[[" /
{[[0 1
Dpi[[2 5
=[[6 7
$num[[8 ;
}[[< =
;[[= >
using\\ 
SKBitmap\\ 
bitmap\\ %
=\\& '

Conversion\\( 2
.\\2 3
ToImage\\3 :
(\\: ;
pdfAsBase64\\; F
,\\F G
options\\H O
:\\O P
options\\Q X
)\\X Y
;\\Y Z
using^^ 
var^^ 
imageStream^^ %
=^^& '
new^^( +
MemoryStream^^, 8
(^^8 9
)^^9 :
;^^: ;
bitmap__ 
.__ 
Encode__ 
(__ 
imageStream__ )
,__) * 
SKEncodedImageFormat__+ ?
.__? @
Png__@ C
,__C D
$num__E H
)__H I
;__I J
awaitaa 
randomAccessStreamaa (
.aa( )

WriteAsyncaa) 3
(aa3 4
imageStreamaa4 ?
.aa? @
ToArrayaa@ G
(aaG H
)aaH I
.aaI J
AsBufferaaJ R
(aaR S
)aaS T
)aaT U
;aaU V
}bb 
elsecc 
{dd 
usingee 
varee 
streamee  
=ee! "
fileee# '
.ee' (
OpenReadStreamee( 6
(ee6 7
)ee7 8
;ee8 9
usingff 
varff 
	memStreamff #
=ff$ %
newff& )
MemoryStreamff* 6
(ff6 7
)ff7 8
;ff8 9
awaitgg 
streamgg 
.gg 
CopyToAsyncgg (
(gg( )
	memStreamgg) 2
)gg2 3
;gg3 4
awaitii 
randomAccessStreamii (
.ii( )

WriteAsyncii) 3
(ii3 4
	memStreamii4 =
.ii= >
ToArrayii> E
(iiE F
)iiF G
.iiG H
AsBufferiiH P
(iiP Q
)iiQ R
)iiR S
;iiS T
}jj 
randomAccessStreamll 
.ll 
Seekll #
(ll# $
$numll$ %
)ll% &
;ll& '
varnn 
decodernn 
=nn 
awaitnn 
BitmapDecodernn  -
.nn- .
CreateAsyncnn. 9
(nn9 :
randomAccessStreamnn: L
)nnL M
;nnM N
varoo 
softwareBitmapoo 
=oo  
awaitoo! &
decoderoo' .
.oo. /"
GetSoftwareBitmapAsyncoo/ E
(ooE F
)ooF G
;ooG H
varqq 
engineqq 
=qq 
	OcrEngineqq "
.qq" #!
TryCreateFromLanguageqq# 8
(qq8 9
newqq9 <
Windowsqq= D
.qqD E
GlobalizationqqE R
.qqR S
LanguageqqS [
(qq[ \
$strqq\ c
)qqc d
)qqd e
;qqe f
ifrr 
(rr 
enginerr 
==rr 
nullrr 
)rr 
returnss 

StatusCodess !
(ss! "
$numss" %
,ss% &
$strss' U
)ssU V
;ssV W
varuu 
	ocrResultuu 
=uu 
awaituu !
engineuu" (
.uu( )
RecognizeAsyncuu) 7
(uu7 8
softwareBitmapuu8 F
)uuF G
;uuG H
varvv 
extractedTextvv 
=vv 
	ocrResultvv  )
.vv) *
Textvv* .
;vv. /
ifxx 
(xx 
stringxx 
.xx 
IsNullOrWhiteSpacexx )
(xx) *
extractedTextxx* 7
)xx7 8
)xx8 9
returnyy 

BadRequestyy !
(yy! "
$stryy" J
)yyJ K
;yyK L
string{{ 
pythonJsonResult{{ #
={{$ %
await{{& +
_anonymizerService{{, >
.{{> ?
AnonymizeTextAsync{{? Q
({{Q R
extractedText{{R _
){{_ `
;{{` a
var}} 

pythonData}} 
=}} 
JsonSerializer}} +
.}}+ ,
Deserialize}}, 7
<}}7 8

Dictionary}}8 B
<}}B C
string}}C I
,}}I J
object}}K Q
>}}Q R
>}}R S
(}}S T
pythonJsonResult}}T d
)}}d e
;}}e f
var 
result 
= 
await 

_aiService )
.) *"
InterpretMedicalLetter* @
(@ A
	patientIdA J
,J K
userIdL R
,R S

pythonDataT ^
?^ _
[_ `
$str` q
]q r
?r s
.s t
ToStringt |
(| }
)} ~
??	 Å
$str
Ç Ñ
)
Ñ Ö
;
Ö Ü
if
ÅÅ 
(
ÅÅ 
result
ÅÅ 
.
ÅÅ 
	IsSuccess
ÅÅ  
)
ÅÅ  !
return
ÇÇ 
Ok
ÇÇ 
(
ÇÇ 
result
ÇÇ  
.
ÇÇ  !
Data
ÇÇ! %
)
ÇÇ% &
;
ÇÇ& '
return
ÑÑ  
HandleServiceError
ÑÑ %
(
ÑÑ% &
result
ÑÑ& ,
.
ÑÑ, -
	ErrorType
ÑÑ- 6
,
ÑÑ6 7
result
ÑÑ8 >
.
ÑÑ> ?
ErrorMessage
ÑÑ? K
)
ÑÑK L
;
ÑÑL M
}
ÖÖ 	
catch
ÜÜ 
(
ÜÜ 
	Exception
ÜÜ 
ex
ÜÜ 
)
ÜÜ 
{
áá 	
return
àà 

StatusCode
àà 
(
àà 
$num
àà !
,
àà! "
$"
àà# %
$str
àà% B
{
ààB C
ex
ààC E
.
ààE F
Message
ààF M
}
ààM N
"
ààN O
)
ààO P
;
ààP Q
}
ââ 	
}
ää 
}ãã ∑0
XC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\CommunicationLevelController .cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
[		 
	Authorize		 
]		 
[

 
ApiController

 
]

 
[ 
Route 

(
 
$str 
) 
] 
public 

class (
CommunicationLevelController -
:. /
BaseApiController0 A
{ 
private 
readonly &
ICommunicationLevelService 3&
_communicationLevelService4 N
;N O
public (
CommunicationLevelController +
(+ ,&
ICommunicationLevelService, F%
communicationLevelServiceG `
)` a
{ 	&
_communicationLevelService &
=' (%
communicationLevelService) B
;B C
} 	
[ 	
HttpGet	 
( 
$str 0
)0 1
]1 2
[ 	 
ProducesResponseType	 
( 
StatusCodes )
.) *
Status200OK* 5
)5 6
]6 7
public 
async 
Task 
< 
ActionResult &
<& '
IEnumerable' 2
<2 3)
CommunicationQuestionResponse3 P
>P Q
>Q R
>R S
GetQuestionsT `
(` a
)a b
{ 	
var 
result 
= 
await &
_communicationLevelService 9
.9 :
GetQuestionsAsync: K
(K L
)L M
;M N
if 
( 
result 
. 
	IsSuccess  
)  !
return 
Ok 
( 
result  
.  !
Data! %
)% &
;& '
return 
HandleServiceError %
(% &
result& ,
., -
	ErrorType- 6
,6 7
result8 >
.> ?
ErrorMessage? K
)K L
;L M
} 	
[!! 	
HttpPost!!	 
(!! 
$str!! <
)!!< =
]!!= >
["" 	 
ProducesResponseType""	 
("" 
StatusCodes"" )
."") *
Status201Created""* :
)"": ;
]""; <
[## 	 
ProducesResponseType##	 
(## 
StatusCodes## )
.##) *
Status400BadRequest##* =
)##= >
]##> ?
[$$ 	 
ProducesResponseType$$	 
($$ 
StatusCodes$$ )
.$$) *
Status404NotFound$$* ;
)$$; <
]$$< =
public%% 
async%% 
Task%% 
<%% 
ActionResult%% &
<%%& '&
CommunicationLevelResponse%%' A
>%%A B
>%%B C
Create%%D J
(%%J K
int%%K N
	patientId%%O X
,%%X Y
[%%Z [
FromBody%%[ c
]%%c d,
CreateCommunicationLevelRequest	%%e Ñ
request
%%Ö å
)
%%å ç
{&& 	
var'' 
userId'' 
='' 
IsArzt'' 
(''  
)''  !
?''" #
null''$ (
:'') *
GetCurrentUserId''+ ;
(''; <
)''< =
;''= >
var(( 
result(( 
=(( 
await(( &
_communicationLevelService(( 9
.((9 :
CreateAsync((: E
(((E F
	patientId((F O
,((O P
request((Q X
,((X Y
userId((Z `
)((` a
;((a b
if** 
(** 
result** 
.** 
	IsSuccess**  
)**  !
return++ 
CreatedAtAction++ &
(++& '
nameof++' -
(++- .
GetByPatientId++. <
)++< =
,++= >
new++? B
{++C D
	patientId++E N
}++O P
,++P Q
result++R X
.++X Y
Data++Y ]
)++] ^
;++^ _
return-- 
HandleServiceError-- %
(--% &
result--& ,
.--, -
	ErrorType--- 6
,--6 7
result--8 >
.--> ?
ErrorMessage--? K
)--K L
;--L M
}.. 	
[00 	
HttpGet00	 
(00 
$str00 ;
)00; <
]00< =
[11 	 
ProducesResponseType11	 
(11 
StatusCodes11 )
.11) *
Status200OK11* 5
)115 6
]116 7
[22 	 
ProducesResponseType22	 
(22 
StatusCodes22 )
.22) *
Status404NotFound22* ;
)22; <
]22< =
public33 
async33 
Task33 
<33 
ActionResult33 &
<33& '&
CommunicationLevelResponse33' A
>33A B
>33B C
GetByPatientId33D R
(33R S
int33S V
	patientId33W `
)33` a
{44 	
var55 
userId55 
=55 
IsArzt55 
(55  
)55  !
?55" #
null55$ (
:55) *
GetCurrentUserId55+ ;
(55; <
)55< =
;55= >
var66 
result66 
=66 
await66 &
_communicationLevelService66 9
.669 :
GetByPatientIdAsync66: M
(66M N
	patientId66N W
,66W X
userId66Y _
)66_ `
;66` a
if88 
(88 
result88 
.88 
	IsSuccess88  
)88  !
return99 
Ok99 
(99 
result99  
.99  !
Data99! %
)99% &
;99& '
return;; 
HandleServiceError;; %
(;;% &
result;;& ,
.;;, -
	ErrorType;;- 6
,;;6 7
result;;8 >
.;;> ?
ErrorMessage;;? K
);;K L
;;;L M
}<< 	
}== 
}>> º
LC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\CheckupController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[ 
ApiController 
] 
[ 
Route 
( 
$str 
) 
] 
public		 
class		 
CheckupController		 
:		  
BaseApiController		! 2
{

 
private 
readonly 
ICheckupService $
_checkupService% 4
;4 5
public 

CheckupController 
( 
ICheckupService ,
checkupService- ;
); <
{ 
_checkupService 
= 
checkupService (
;( )
} 
[ 
HttpGet 
( 
$str 
) 
] 
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status200OK& 1
)1 2
]2 3
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status404NotFound& 7
)7 8
]8 9
[  
ProducesResponseType 
( 
StatusCodes %
.% &(
Status500InternalServerError& B
)B C
]C D
public 

async 
Task 
< 
IActionResult #
># $"
GenerateCheckupSummary% ;
(; <
[ 	
	FromRoute	 
] 
int 
	patientId !
,! "
[ 	
	FromQuery	 
] 
DateTime 
from !
,! "
[ 	
	FromQuery	 
] 
DateTime 
to 
)  
{ 
var 
userId 
= 
IsArzt 
( 
) 
? 
null  $
:% &
GetCurrentUserId' 7
(7 8
)8 9
;9 :
var 
request 
= 
new !
CheckupSummaryRequest /
{0 1
From2 6
=7 8
from9 =
,= >
To? A
=B C
toD F
}G H
;H I
var 
result 
= 
await 
_checkupService *
.* +"
GenerateCheckupSummary+ A
(A B
	patientIdB K
,K L
userIdM S
,S T
requestU \
)\ ]
;] ^
if 

( 
result 
. 
	IsSuccess 
) 
{   	
return!! 
Ok!! 
(!! 
result!! 
.!! 
Data!! !
)!!! "
;!!" #
}"" 	
return$$ 
HandleServiceError$$ !
($$! "
result$$" (
.$$( )
	ErrorType$$) 2
,$$2 3
result$$4 :
.$$: ;
ErrorMessage$$; G
)$$G H
;$$H I
}%% 
}&& Ë
LC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\BaseApiController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
public 

abstract 
class 
BaseApiController +
:, -
ControllerBase. <
{ 
	protected		 
string		 
GetCurrentUserId		 )
(		) *
)		* +
{

 	
return 
User 
. 
FindFirstValue &
(& '

ClaimTypes' 1
.1 2
NameIdentifier2 @
)@ A
?? 
throw 
new %
InvalidOperationException 6
(6 7
$str7 b
)b c
;c d
} 	
	protected 
bool 
IsArzt 
( 
) 
{ 	
return 
User 
. 
IsInRole  
(  !
$str! '
)' (
;( )
} 	
	protected 
ActionResult 
HandleServiceError 1
(1 2
ServiceErrorType2 B
	errorTypeC L
,L M
stringN T
?T U
errorMessageV b
)b c
{ 	
return 
	errorType 
switch #
{ 
ServiceErrorType  
.  !
NotFound! )
=>* ,
NotFound- 5
(5 6
errorMessage6 B
)B C
,C D
ServiceErrorType  
.  !
	Forbidden! *
=>+ -
Forbid. 4
(4 5
)5 6
,6 7
ServiceErrorType  
.  !
Unauthorized! -
=>. 0
Unauthorized1 =
(= >
errorMessage> J
)J K
,K L
ServiceErrorType  
.  !
Conflict! )
=>* ,
Conflict- 5
(5 6
errorMessage6 B
)B C
,C D
_ 
=> 

BadRequest 
(  
errorMessage  ,
), -
} 
; 
} 	
} 
} Á 
QC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\AuthenticateController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
{ 
[		 
ApiController		 
]		 
[

 
Route

 

(


 
$str

 
)

 
]

 
public 

class "
AuthenticateController '
:( )
ControllerBase* 8
{ 
private 
readonly 
IUserService %
_userService& 2
;2 3
public "
AuthenticateController %
(% &
IUserService& 2
userService3 >
)> ?
{ 	
_userService 
= 
userService &
;& '
} 	
[ 	
HttpPost	 
( 
$str 
) 
] 
public 
async 
Task 
< 
IActionResult '
>' (
Register) 1
(1 2
[2 3
FromBody3 ;
]; <
RegisterDto= H
registerDtoI T
)T U
{ 	
var 
result 
= 
await 
_userService +
.+ ,
Register, 4
(4 5
registerDto5 @
)@ A
;A B
if 
( 
result 
. 
	IsSuccess 
)  
{ 
return 
Ok 
( 
result  
)  !
;! "
} 
return 
result 
. 
	ErrorType #
switch$ *
{   
ServiceErrorType!!  
.!!  !
NotFound!!! )
=>!!* ,
NotFound!!- 5
(!!5 6
result!!6 <
.!!< =
ErrorMessage!!= I
)!!I J
,!!J K
ServiceErrorType""  
.""  !
Conflict""! )
=>""* ,
Conflict""- 5
(""5 6
result""6 <
.""< =
ErrorMessage""= I
)""I J
,""J K
ServiceErrorType##  
.##  !
Unauthorized##! -
=>##. 0
Unauthorized##1 =
(##= >
result##> D
.##D E
ErrorMessage##E Q
)##Q R
,##R S
ServiceErrorType$$  
.$$  !
ValidationError$$! 0
=>$$1 3

BadRequest$$4 >
($$> ?
result$$? E
.$$E F
ErrorMessage$$F R
)$$R S
,$$S T
_%% 
=>%% 

BadRequest%% 
(%%  
result%%  &
.%%& '
ErrorMessage%%' 3
)%%3 4
}&& 
;&& 
}'' 	
[)) 	
HttpPost))	 
()) 
$str)) 
))) 
])) 
public** 
async** 
Task** 
<** 
IActionResult** '
>**' (
Login**) .
(**. /
[**/ 0
FromBody**0 8
]**8 9
LoginDto**: B
loginDto**C K
)**K L
{++ 	
var,, 
result,, 
=,, 
await,, 
_userService,, +
.,,+ ,
Login,,, 1
(,,1 2
loginDto,,2 :
),,: ;
;,,; <
if.. 
(.. 
result.. 
... 
	IsSuccess.. 
)..  
{// 
return00 
Ok00 
(00 
result00  
)00  !
;00! "
}11 
return33 
result33 
.33 
	ErrorType33 #
switch33$ *
{44 
ServiceErrorType55  
.55  !
Unauthorized55! -
=>55. 0
Unauthorized551 =
(55= >
result55> D
.55D E
ErrorMessage55E Q
)55Q R
,55R S
_66 
=>66 

BadRequest66 
(66  
result66  &
.66& '
ErrorMessage66' 3
)663 4
}77 
;77 
}88 	
}99 
}:: ∑2
GC:\sources\Fehldiagnosen\Backend\Backend\Api\Controller\AIController.cs
	namespace 	
Backend
 
. 
Api 
. 

Controller  
;  !
[ 
ApiController 
] 
[ 
Route 
( 
$str 
) 
] 
public		 
class		 
AIController		 
:		 
BaseApiController		 -
{

 
private 
readonly 

IAIService 

_aiService  *
;* +
private 
readonly 
IConfiguration #
_configuration$ 2
;2 3
private 
readonly 
ILogger 
< 
AIController )
>) *
_logger+ 2
;2 3
public 

AIController 
( 

IAIService 
	aiService 
, 
IConfiguration 
configuration $
,$ %
ILogger 
< 
AIController 
> 
logger $
)$ %
{ 

_aiService 
= 
	aiService 
; 
_configuration 
= 
configuration &
;& '
_logger 
= 
logger 
; 
} 
[ 
HttpGet 
( 
$str 3
)3 4
]4 5
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status200OK& 1
)1 2
]2 3
[  
ProducesResponseType 
( 
StatusCodes %
.% &
Status404NotFound& 7
)7 8
]8 9
[  
ProducesResponseType 
( 
StatusCodes %
.% &(
Status500InternalServerError& B
)B C
]C D
public 

async 
Task 
< 
IActionResult #
># $
ExplainDiagnosis% 5
(5 6
[ 	
	FromRoute	 
] 
int 
id 
, 
[ 	
	FromRoute	 
] 
int 
diagnosisId #
)# $
{   
var!! 
userId!! 
=!! 
IsArzt!! 
(!! 
)!! 
?!! 
null!!  $
:!!% &
GetCurrentUserId!!' 7
(!!7 8
)!!8 9
;!!9 :
var## 
result## 
=## 
await## 

_aiService## %
.##% &
ExplainDiagnosis##& 6
(##6 7
id##7 9
,##9 :
userId##; A
,##A B
diagnosisId##C N
)##N O
;##O P
if%% 

(%% 
result%% 
.%% 
	IsSuccess%% 
)%% 
{&& 	
return'' 
Ok'' 
('' 
new'' 
{'' 
text''  
=''! "
result''# )
.'') *
Data''* .
?''. /
.''/ 0
Text''0 4
,''4 5

disclaimer''6 @
=''A B
result''C I
.''I J
Data''J N
?''N O
.''O P

Disclaimer''P Z
}''[ \
)''\ ]
;''] ^
}(( 	
return)) 
HandleServiceError)) !
())! "
result))" (
.))( )
	ErrorType))) 2
,))2 3
result))4 :
.)): ;
ErrorMessage)); G
)))G H
;))H I
}** 
[,, 
HttpPost,, 
(,, 
$str,, (
),,( )
],,) *
public-- 

async-- 
Task-- 
<-- 
IActionResult-- #
>--# $"
InterpretMedicalLetter--% ;
(--; <
[--< =
FromBody--= E
]--E F)
InterpretMedicalLetterRequest--G d
request--e l
)--l m
{.. 
if// 

(// 
request// 
==// 
null// 
||// 
string// %
.//% &
IsNullOrWhiteSpace//& 8
(//8 9
request//9 @
.//@ A

LetterText//A K
)//K L
)//L M
return00 

BadRequest00 
(00 
new00 !
{00" #
error00$ )
=00* +
$str00, D
}00E F
)00F G
;00G H
if22 

(22 
request22 
.22 
	PatientId22 
==22  
null22! %
)22% &
return33 

BadRequest33 
(33 
new33 !
{33" #
error33$ )
=33* +
$str33, C
}33D E
)33E F
;33F G
var55 
userId55 
=55 
IsArzt55 
(55 
)55 
?55 
null55  $
:55% &
GetCurrentUserId55' 7
(557 8
)558 9
;559 :
var66 
result66 
=66 
await66 

_aiService66 %
.66% &"
InterpretMedicalLetter66& <
(66< =
request66= D
.66D E
	PatientId66E N
,66N O
userId66P V
,66V W
request66X _
.66_ `

LetterText66` j
)66j k
;66k l
if88 

(88 
result88 
.88 
	IsSuccess88 
)88 
return99 
Ok99 
(99 
result99 
.99 
Data99 !
)99! "
;99" #
return;; 
HandleServiceError;; !
(;;! "
result;;" (
.;;( )
	ErrorType;;) 2
,;;2 3
result;;4 :
.;;: ;
ErrorMessage;;; G
);;G H
;;;H I
}<< 
}== 
public?? 
sealed?? 
class?? )
InterpretMedicalLetterRequest?? 1
{@@ 
publicAA 

intAA 
?AA 
	PatientIdAA 
{AA 
getAA 
;AA  
setAA! $
;AA$ %
}AA& '
publicBB 

stringBB 
?BB 

LetterTextBB 
{BB 
getBB  #
;BB# $
setBB% (
;BB( )
}BB* +
}CC 