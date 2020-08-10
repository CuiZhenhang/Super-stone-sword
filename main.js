var 创建=function(c,l){
  IDRegistry.genItemID("SuperSword"+c);
  Item.createItem("SuperSword"+c, "Super stone sword\nlevel: "+l, {name: "Sword", meta: 1}, {stack: 1});
  Translation.addTranslation("Super stone sword\nlevel: "+l, {zh:"石剑是检验真理的唯一标准\n等级："+l});
  Item.setToolRender(ItemID["SuperSword"+c], true);
  Item.setGlint(ItemID["SuperSword"+c], true);
};
创建(1,1); 创建(2,2); 创建(3,3); 创建(4,4); 创建(5,"MAX");
Recipes.addShaped({id: ItemID.SuperSword1, count: 1, data: 0}, ["aaa","aaa","aaa"], ["a", 272, 0]);
Recipes.addShaped({id: ItemID.SuperSword2, count: 1, data: 0}, ["aaa","aaa","aaa"], ["a", ItemID.SuperSword1, 0]);
Recipes.addShaped({id: ItemID.SuperSword3, count: 1, data: 0}, ["aaa","aaa","aaa"], ["a", ItemID.SuperSword2, 0]);
Recipes.addShaped({id: ItemID.SuperSword4, count: 1, data: 0}, ["aaa","aba","aaa"], ["a", 264, 0,"b", ItemID.SuperSword3, 0]);
Recipes.addShaped({id: ItemID.SuperSword5, count: 1, data: 0}, ["aaa","aba","aaa"], ["a", 57, 0,"b", ItemID.SuperSword4, 0]);



随机={};
随机[ItemID.SuperSword1]= 1;
随机[ItemID.SuperSword2]= 0.1;
随机[ItemID.SuperSword3]= 0.01;
随机[ItemID.SuperSword4]= -1;
随机[ItemID.SuperSword5]= -2;
设置={"秒杀":true, "阻止自定义生成":false, "反伤":true, "不完全免伤":true, "完全免伤":true, "飞行":true, "隐藏物品":[false, {}]};
备份=[Entity.spawnCustomAtCoords, Entity.spawnCustom, Entity.healEntity, Entity.damageEntity, Entity.remove, Entity.setHealth, Entity.setMaxHealth, Player.health, Player.setHealth];
负面=[2,4,7,9,15,17,18,19,20,25,28];
var getmode=ModAPI.requireGlobal("Level.getGameMode");

var GuiName;
Callback.addCallback("NativeGuiChanged", function(screenName){GuiName=screenName});

var 路径;
Callback.addCallback("LevelSelected", function(nameWorld, dirWorld){
if(Game.getEngineVersion()=="2.0"){路径=__packdir__+"worlds/"+dirWorld+"/super_stone_sword.json";}
else{路径=FileTools.root+"games/com.mojang/innercoreworlds/"+dirWorld+"/super_stone_sword.json"};
if(FileTools.isExists(路径)){设置=FileTools.ReadJSON(路径)}else{
设置={"秒杀":true, "阻止自定义生成":false, "反伤":true, "不完全免伤":true, "完全免伤":true, "飞行":true, "隐藏物品":[false, {}]}};
});
Callback.addCallback("WriteSaves", function(){FileTools.WriteJSON(路径,设置)});

setUI_ = {};
var setUI = function(name, item, x, y, texture, func){
this.ui = {
    window: new UI.Window({
      location: {x: x, y: y, width: 40, height: 40},
      drawing: [{type: "bitmap", bitmap: "button0", x: 0, y: 0, width: 1000, height: 1000}],
      elements: {
      "main": {type: "slot", x: 50, y: 50, isTransparentBackground: true, visual: true, size: 900, bitmap: texture,
               source: {id: item.id || 0, count: 1, data: item.data || 0}, clicker: {onClick: function(){func()}, onLongClick: function(){alert(Translation.translate(name))} }},
           },
        }),
    open: function(){
             this.window.setAsGameOverlay(true);
             this.window.open()
         },
    close: function(){this.window.close();}
};
};

var BITMAP=function(a,b){setUI_[a].ui.window.getContent().drawing[0].bitmap=b?"button1":"button0"};
ALLCLOSE=function(){try{for(i in setUI_){setUI_[i].ui.close()}}catch(e){}};

setUI_.秒杀=new setUI("秒杀模式", {}, 550, 0, "skill_1", function(){
if(设置.秒杀){ BITMAP("秒杀",true); 设置.秒杀=false; alert(Translation.translate("秒杀模式 已关闭")); }else{
 BITMAP("秒杀",false); 设置.秒杀=true; alert(Translation.translate("秒杀模式 已开启")); };
});

setUI_.阻止自定义生成=new setUI("阻止自定义实体生成", {}, 600, 0, "skill_2", function(){
if(设置.阻止自定义生成){ BITMAP("阻止自定义生成",true); Entity.spawnCustomAtCoords=备份[0]; 设置.阻止自定义生成=false; alert(Translation.translate("阻止自定义实体生成 已关闭")); }else{
 BITMAP("阻止自定义生成",false); 设置.阻止自定义生成=true; alert(Translation.translate("阻止自定义实体生成 已开启")); };
});

setUI_.反伤=new setUI("反伤", {}, 650, 0, "skill_3", function(){
if(设置.反伤){ BITMAP("反伤",true); 设置.反伤=false; alert(Translation.translate("反伤 已关闭")); }else{
 BITMAP("反伤",false); 设置.反伤=true; alert(Translation.translate("反伤 已开启")); };
});

setUI_.不完全免伤=new setUI("不完全免伤", {}, 700, 0, "skill_4", function(){
if(设置.不完全免伤){ BITMAP("不完全免伤",true); 设置.不完全免伤=false; alert(Translation.translate("不完全免伤 已关闭")); }else{
 BITMAP("不完全免伤",false); 设置.不完全免伤=true; alert(Translation.translate("不完全免伤 已开启")); };
});

setUI_.完全免伤=new setUI("完全免伤", {}, 750, 0, "skill_5", function(){
if(设置.完全免伤){ BITMAP("完全免伤",true); 设置.完全免伤=false; alert(Translation.translate("完全免伤 已关闭"));
 Entity.damageEntity=备份[1]; Entity.remove=备份[2]; Entity.setHealth=备份[3]; Entity.setMaxHealth=备份[4]; }else{
 BITMAP("完全免伤",false); 设置.完全免伤=true; alert(Translation.translate("完全免伤 已开启")); };
});

setUI_.隐藏物品=new setUI("隐藏物品", {}, 800, 0, "skill_6", function(){
if(设置.隐藏物品[0]){
  if(Player.getCarriedItem().id==0){
  BITMAP("隐藏物品",true);
  设置.隐藏物品[0]=false;
  Player.setCarriedItem(设置.隐藏物品[1].id, 设置.隐藏物品[1].count, 设置.隐藏物品[1].data, 设置.隐藏物品[1].extra);
  alert(Translation.translate("物品已显现"));
  }else{alert(Translation.translate("物品显现失败，请确认您处于空手状态"))}
}else{
  BITMAP("隐藏物品",false);
  设置.隐藏物品[0]=true;
  设置.隐藏物品[1]=Player.getCarriedItem();
  Player.setCarriedItem(0,0,0);
  alert(Translation.translate("物品已隐藏")); 
};
});

Callback.addCallback("LevelLoaded", function(){
setUI_.秒杀.ui.window.getContent().drawing[0].bitmap=设置.秒杀?"button0":"button1";
setUI_.阻止自定义生成.ui.window.getContent().drawing[0].bitmap=设置.阻止自定义生成?"button0":"button1";
setUI_.反伤.ui.window.getContent().drawing[0].bitmap=设置.反伤?"button0":"button1";
setUI_.不完全免伤.ui.window.getContent().drawing[0].bitmap=设置.不完全免伤?"button0":"button1";
setUI_.完全免伤.ui.window.getContent().drawing[0].bitmap=设置.完全免伤?"button0":"button1";
setUI_.隐藏物品.ui.window.getContent().drawing[0].bitmap=设置.隐藏物品[0]?"button0":"button1";
});

Callback.addCallback("tick", function(){try{
if(GuiName=="in_game_play_screen"||GuiName=="hud_screen"){
  this.c=随机[Player.getCarriedItem().id];
  if(this.c<2||设置.隐藏物品[0]){setUI_.秒杀.ui.open()}else{setUI_.秒杀.ui.close()};
  if(this.c<1||设置.隐藏物品[0]){setUI_.阻止自定义生成.ui.open()}else{setUI_.阻止自定义生成.ui.close()};
  if(this.c<0.1||设置.隐藏物品[0]){setUI_.反伤.ui.open()}else{setUI_.反伤.ui.close()};
  if(this.c<0.1||设置.隐藏物品[0]){setUI_.不完全免伤.ui.open()}else{setUI_.不完全免伤.ui.close()};
  if(this.c<0||设置.隐藏物品[0]){setUI_.完全免伤.ui.open()}else{setUI_.完全免伤.ui.close()};
  if(this.c<-1||设置.隐藏物品[0]){setUI_.隐藏物品.ui.open()}else{setUI_.隐藏物品.ui.close()};
}else{ALLCLOSE()};
}catch(e){}});
Callback.addCallback("LevelLeft", ALLCLOSE);



Callback.addCallback("PlayerAttack", function(pr,v){
if(随机[Player.getCarriedItem().id]<2||设置.隐藏物品[0]){
  if(设置.秒杀){
    Game.message("§9"+Translation.translate("拒绝花里胡哨"));
    if(Math.random()<=随机[Player.getCarriedItem().id]){Player.setCarriedItem(0,0,0)};
    Entity.damageEntity(v, Entity.getHealth(v)>10000?Entity.getHealth(v)+1:10000, Player.get(), {attacker: Player.get()});
    new java.lang.Thread(function(){
      java.lang.Thread.sleep(2);
      if(Entity.isExist(v)){Entity.setMaxHealth(v,0)};
      if(Entity.isExist(v)){java.lang.Thread.sleep(2); Entity.remove(v)};
    }).start()
  }else{
    if(Math.random()<=随机[Player.getCarriedItem().id]/10){Player.setCarriedItem(0,0,0)};
    Entity.damageEntity(v, Math.ceil(Entity.getMaxHealth(v)/5)>6?Math.ceil(Entity.getMaxHealth(v)/5):6, Player.get(), {attacker: Player.get()});
  };
}});

Callback.addCallback("tick", function(){
if(设置.阻止自定义生成){
  Entity.spawnCustomAtCoords=备份[0]; Entity.spawnCustom=备份[1];
  if(随机[Player.getCarriedItem().id]<1||设置.隐藏物品[0]){
    Entity.spawnCustomAtCoords=function(n,c,e){
      Game.message("§9"+Translation.translate("已阻止自定义实体生成"));
      return Entity.spawn(c.x, -30, c.z, 81);
    };
    Entity.spawnCustom=function(n,x,y,z,e){
      Game.message("§9"+Translation.translate("已阻止自定义实体生成"));
      return Entity.spawn(x, -30, z, 81);
    };
  };
};
if(设置.完全免伤){
    Entity.healthEntity=备份[2]; Entity.damageEntity=备份[3]; Entity.remove=备份[4];
    Entity.setHealth=备份[5]; Entity.setMaxHealth=备份[6];
    Player.health=备份[7]; Player.setHealth=备份[8];
  if(随机[Player.getCarriedItem().id]<0||设置.隐藏物品[0]){
    if(World.getThreadTime()%5==0){Entity.addEffect(Player.get(), 12, 0, 20, true)};
    Entity.setMaxHealth(Player.get(), 20);
    Entity.setHealth(Player.get(), 20);
    Player.setHunger(20);
    负面.map(function(i){Entity.clearEffect(Player.get(), i)});
    Entity.healthEntity=function(a,b){if(a==Player.get()&&b<0){return}; 备份[2](a,b)};
    Entity.damageEntity=function(a,b){if(a==Player.get()){return}; 备份[3](a,b)};
    Entity.remove=function(a){if(a==Player.get()){return}; 备份[4](a)};
    Entity.setHealth=function(a,b){if(a==Player.get()&&b<20){return}; 备份[5](a,b)};
    Entity.setMaxHealth=function(a,b){if(a==Player.get()&&b<20){return}; 备份[6](a,b)};
    Player.setHealth=function(a){if(a<20){return}; 备份[7](a)};
    Player.health=function(){return {set: Player.setHealth, get: Player.getHealth}};
  };
};
if(随机[Player.getCarriedItem().id]<0||设置.隐藏物品[0]){
  if(!设置.飞行){设置.飞行=true};
  Player.setFlyingEnabled(true);
}else if(设置.飞行&&getmode()!==1){
  设置.飞行=false;
  Player.setFlyingEnabled(false);
  Player.setFlying(false);
};
});

Callback.addCallback("EntityHurt", function(a, ent, d){
if((随机[Player.getCarriedItem().id]<0.1||设置.隐藏物品[0])&&ent==Player.get()){
  if(设置.反伤){Entity.damageEntity(a, d, Player.get(), {attacker: Player.get()})};
  if(设置.不完全免伤||设置.完全免伤){Game.prevent()};
}
});

Callback.addCallback("EntityRemoved", function(ent){
if(设置.完全免伤){
  if((随机[Player.getCarriedItem().id]<0||设置.隐藏物品[0])&&ent==Player.get()){
    Entity.setMaxHealth(Player.get(), 20);
    Entity.setHealth(Player.get(), 20);
    Game.prevent()
  };
};
});

Callback.addCallback("EntityDeath", function(ent){
if(设置.完全免伤){
  if((随机[Player.getCarriedItem().id]<0||设置.隐藏物品[0])&&ent==Player.get()){
    Entity.setMaxHealth(Player.get(), 20);
    Entity.setHealth(Player.get(), 20);
    Game.prevent()
  };
};
});

var EN = FileTools["ReadKeyValueFile"](__dir__ + "/lang/en_US.lang", "===");
var RU = FileTools["ReadKeyValueFile"](__dir__ + "/lang/ru_RU.lang", "===");
var ZH = FileTools["ReadKeyValueFile"](__dir__ + "/lang/zh_CN.lang", "===");
for(var key in EN){Translation.addTranslation(key, {en: EN[key]})};
for(var key in RU){Translation.addTranslation(key, {ru: RU[key]})};
for(var key in ZH){Translation.addTranslation(key, {zh: ZH[key]})};

UI.getContext().runOnUiThread(new java.lang.Runnable({
run: function(){try{
var d=new android.app.AlertDialog.Builder(UI.getContext())
d.setNegativeButton("OK",new android.content.DialogInterface.OnClickListener(){onClick: function(){}});
d.setTitle(Translation.translate("Super stone sword"));
d.setMessage(
Translation.translate("Welcome to use this mod.")+"\n"+
Translation.translate("This mod is open source,")+"\n"+
"https://github.com/CuiZhenhang/Super-stone-sword"+"\n"+
Translation.translate("You can use the code of this module according to your needs,")+"\n"+
Translation.translate("Feel free to reprint this mod,")+"\n"+
Translation.translate("But do not publish it as your mod.")+"\n"+
Translation.translate("Have a goot time!")+"\n\n"+
Translation.translate("Write by CuiZhenhang, author of this mod")
);
d.show()
}catch(e){}
}}))
