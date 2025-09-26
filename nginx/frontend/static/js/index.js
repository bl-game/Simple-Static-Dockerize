(() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({
"./src/index.css": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
// extracted by css-extract-rspack-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1758871667419
        var cssReload = (__webpack_require__("./node_modules/@rspack/core/dist/cssExtractHmr.js")/* .cssReload */.cssReload)(module.id, {});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

}),
"./src/GAME/CastRay/castRay.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CastRay: () => (CastRay)
});
/* ESM import */var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/core/index.js");

function CastRay(id, scene, color) {
    var id = id;
    var rayColor = color ?? _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
    var ray = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Ray(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), 0, 0.);
    var rayHelper = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.RayHelper(ray);
    var cast$ = null;
    return {
        id: id,
        ray: ()=>ray,
        attach: (mesh, options)=>{
            rayHelper.attachToMesh(mesh, options.direction, options.origin, options.length);
        },
        show: ()=>rayHelper.show(scene, rayColor),
        hide: ()=>rayHelper.hide(),
        cast: (workerFnc, nonCollideMeshesName)=>{
            cast$ = scene.onBeforeRenderObservable.add(()=>{
                var pick = scene.pickWithRay(ray, (mesh)=>{
                    var nonCollide = true;
                    nonCollideMeshesName.forEach((name)=>{
                        if (mesh.name === name) nonCollide = false;
                    });
                    return nonCollide;
                });
                workerFnc(pick);
            });
        },
        dispose: ()=>{
            rayHelper.dispose();
            if (cast$) {
                cast$.remove(true);
            }
        }
    };
}


}),
"./src/GAME/Controls/KeyControl/keyboardControl.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyboardControl: () => (KeyboardControl)
});
/* ESM import */var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/core/index.js");

function KeyboardControl(scene) {
    var state = 0; // 0-> forward 1->back 2->cwRot 3->ccwRot 4->Space 5->Shift
    scene.actionManager = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ActionManager(scene);
    scene.actionManager.registerAction(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ExecuteCodeAction(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ActionManager.OnKeyDownTrigger, (e)=>{
        var code = e.sourceEvent.code;
        if (code === "KeyA") {
            // console.log("A", state)
            state = setBit(state, 2);
        }
        if (code === "KeyD") {
            // console.log("D", state)
            state = setBit(state, 3);
        }
        if (code === "KeyW") {
            // console.log("W", state)
            state = setBit(state, 0);
        }
        if (code === "KeyS") {
            // console.log("S", state)
            state = setBit(state, 1);
        }
        if (code === "Space") {
            // console.log("Space", state)
            state = setBit(state, 4);
        }
        if (code === "ShiftLeft" || code === "ShiftRight") {
            // console.log("Shift", state)
            state = setBit(state, 5);
        }
    }));
    scene.actionManager.registerAction(new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ExecuteCodeAction(_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ActionManager.OnKeyUpTrigger, (e)=>{
        var code = e.sourceEvent.code;
        if (code === "KeyA") {
            state = clearBit(state, 2);
        }
        if (code === "KeyD") {
            state = clearBit(state, 3);
        }
        if (code === "KeyW") {
            state = clearBit(state, 0);
        }
        if (code === "KeyS") {
            state = clearBit(state, 1);
        }
        if (code === "Space") {
            state = clearBit(state, 4);
        }
        if (code === "ShiftLeft" || code === "ShiftRight") {
            state = clearBit(state, 5);
        }
    }));
    return {
        getState: ()=>state
    };
}
var setBit = (num, bit)=>num | 1 << bit;
var clearBit = (num, bit)=>num & ~(1 << bit);


}),
"./src/GAME/Controls/mobileControl/mobileControl.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MobileCotrol: () => (MobileCotrol)
});
/* ESM import */var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babylonjs/gui/index.js");


function MobileCotrol(scene) {
    var adt = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var xAddPos = 0;
    var yAddPos = 0;
    let xAddRot = 0;
    let yAddRot = 0;
    var sideJoystickOffset = 150;
    var bottomJoystickOffset = -150;
    var leftTop = 0;
    var leftLeft = 0;
    var leftIsDown = false;
    var canvas = _state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.state.canvas;
    let leftThumbContainer = makeThumbArea("leftThumb", 2, "blue", "transparent");
    leftThumbContainer.height = "300px";
    leftThumbContainer.width = "300px";
    leftThumbContainer.isPointerBlocker = true;
    leftThumbContainer.horizontalAlignment = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftThumbContainer.verticalAlignment = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Control.VERTICAL_ALIGNMENT_BOTTOM;
    leftThumbContainer.alpha = 0.4;
    leftThumbContainer.left = sideJoystickOffset;
    leftThumbContainer.top = bottomJoystickOffset;
    let leftInnerThumbContainer = makeThumbArea("leftInnterThumb", 4, "blue", "transparent");
    leftInnerThumbContainer.height = "100px";
    leftInnerThumbContainer.width = "100px";
    leftInnerThumbContainer.isPointerBlocker = true;
    leftInnerThumbContainer.horizontalAlignment = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Control.HORIZONTAL_ALIGNMENT_CENTER;
    leftInnerThumbContainer.verticalAlignment = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Control.VERTICAL_ALIGNMENT_CENTER;
    let leftPuck = makeThumbArea("leftPuck", 0, "blue", "blue");
    leftPuck.height = "80px";
    leftPuck.width = "80px";
    leftPuck.isPointerBlocker = true;
    leftPuck.horizontalAlignment = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Control.HORIZONTAL_ALIGNMENT_CENTER;
    leftPuck.verticalAlignment = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Control.VERTICAL_ALIGNMENT_CENTER;
    leftThumbContainer.onPointerDownObservable.add((coordinates)=>{
        leftPuck.isVisible = true;
        leftLeft = coordinates.x - leftThumbContainer._currentMeasure.width * .5 - sideJoystickOffset;
        leftPuck.left = leftLeft;
        leftTop = canvas.height - coordinates.y - leftThumbContainer._currentMeasure.height * .5 + bottomJoystickOffset;
        leftPuck.top = leftTop * -1;
        leftIsDown = true;
        leftThumbContainer.alpha = 0.9;
    });
    leftThumbContainer.onPointerUpObservable.add(()=>{
        xAddPos = 0;
        yAddPos = 0;
        leftIsDown = false;
        leftPuck.isVisible = false;
        leftThumbContainer.alpha = 0.4;
    });
    leftThumbContainer.onPointerMoveObservable.add((coordinates)=>{
        if (leftIsDown) {
            xAddPos = coordinates.x - leftThumbContainer._currentMeasure.width * .5 - sideJoystickOffset;
            yAddPos = canvas.height - coordinates.y - leftThumbContainer._currentMeasure.height * .5 + bottomJoystickOffset;
            leftLeft = xAddPos;
            leftTop = yAddPos * -1;
            leftPuck.left = leftLeft;
            leftPuck.top = leftTop;
        }
    });
    adt.addControl(leftThumbContainer);
    leftThumbContainer.addControl(leftInnerThumbContainer);
    leftThumbContainer.addControl(leftPuck);
    leftPuck.isVisible = false;
    return {
        data: ()=>({
                x: xAddPos,
                y: yAddPos
            })
    };
}
function makeThumbArea(name, thickness, color, background) {
    var rect = new _babylonjs_gui__WEBPACK_IMPORTED_MODULE_1__.Ellipse();
    rect.name = name;
    rect.thickness = thickness;
    rect.color = color;
    rect.background = background;
    rect.paddingLeft = "0px";
    rect.paddingRight = "0px";
    rect.paddingTop = "0px";
    rect.paddingBottom = "0px";
    return rect;
}


}),
"./src/GAME/Enemy/enemy.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Enemy: () => (Enemy),
  createEnemy: () => (createEnemy),
  edgeMove: () => (edgeMove),
  mostMove: () => (mostMove),
  moveByPath: () => (moveByPath),
  moveEnemy: () => (moveEnemy)
});
/* ESM import */var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/core/index.js");
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/proxiBabylon.ts");
/* ESM import */var _CastRay_castRay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/GAME/CastRay/castRay.ts");
/* ESM import */var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/GAME/utils.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/GAME/types.ts");
/* ESM import */var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _GUI_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/GAME/GUI/table.ts");







function Enemy(scene) {
    var state = {
        moved: true,
        state: "LIVE",
        live: Math.floor(Math.random() * 100),
        arsenal: {
            bullets: 100
        },
        killedEnemy: new Array,
        killer: ""
    };
    var id = `enemy-${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.utils_RND_string)()}`;
    var DEFAULTSPEED = parseFloat(((Math.random() * (3 - 2 + 1) + 2) / 10).toFixed(2));
    var SPEED = DEFAULTSPEED;
    var HUNTSPEED = 0.2;
    var ESCAPESPEED = 0.4;
    var STOPED = false;
    var GRAVITY = 0.5;
    var ATTACK_INTERVAL = 10;
    var DISTANCEHUNTING = 40; // прикратить охоту если дистанция больше
    var DISTANCESCAPED = 50; // прекратить убегать если дистанция бошльше
    var isBlockedRadar = false;
    var isFindFrag = false;
    var isHunting = false;
    var isEscape = false;
    //-----------------------------------------------------------
    var huntRadarMaterial = scene.getMaterialByName("enemy-hunting-material");
    var escapeRadarMaterial = scene.getMaterialByName("enemy-escape-material");
    var searchRadardMaterial = scene.getMaterialByName("enemy-collider-material");
    var defaultMaterial = scene.getMaterialByName("enemy-material");
    var mesh = (0,_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.CreateBox)(id, {
        width: 1,
        height: 2,
        depth: 1
    }, scene);
    mesh.name = id;
    // mesh.ellipsoid = new Vector3(1, 1, 1)
    mesh.position.y = 3;
    mesh.material = defaultMaterial;
    mesh.checkCollisions = true;
    mesh.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_4__.COLLIDE_GROUP.ENEMY;
    mesh.collisionMask = _types__WEBPACK_IMPORTED_MODULE_4__.COLLIDE_MASK.ENEMY;
    var colliderBox = (0,_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.CreateCylinder)(`${id}-collider`, {
        height: 2,
        diameter: 20,
        cap: 1,
        enclose: false
    }, scene);
    colliderBox.setParent(mesh);
    colliderBox.setPositionWithLocalVector(new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1.5, 0));
    colliderBox.material = searchRadardMaterial;
    colliderBox.checkCollisions = true;
    colliderBox.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_4__.COLLIDE_GROUP.ENEMY;
    colliderBox.collisionMask = _types__WEBPACK_IMPORTED_MODULE_4__.COLLIDE_MASK.ENEMY;
    colliderBox.actionManager = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.ActionManager(scene);
    var tableUp = (0,_GUI_table__WEBPACK_IMPORTED_MODULE_6__.TableUp)(`${id}-table`, mesh, new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 5, 0), `${id}`, scene);
    //RAY CASTING------------------------------------------------
    var groundRayData = {
        hit: false,
        distance: 0,
        object: null
    };
    var viewFWDData = {
        hit: false,
        distance: 0,
        object: null
    };
    var groundCastRay = (0,_CastRay_castRay__WEBPACK_IMPORTED_MODULE_2__.CastRay)(`ground-ray-${id}`, scene, _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Color3.Red());
    groundCastRay.attach(mesh, {
        origin: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, -0.5),
        direction: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0),
        length: 5
    });
    groundCastRay.show();
    groundCastRay.cast((pick)=>{
        if (pick && pick.hit) {
            groundRayData.hit = true;
            groundRayData.distance = pick.distance;
            groundRayData.object = pick === null || pick === void 0 ? void 0 : pick.pickedMesh;
        } else {
            groundRayData.hit = false;
            groundRayData.distance = -1;
            groundRayData.object = null;
        }
    }, [
        mesh.name,
        "ray",
        "hole"
    ]);
    var viewFWDCastRay = (0,_CastRay_castRay__WEBPACK_IMPORTED_MODULE_2__.CastRay)(`view-fwd-ray-${id}`, scene, _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Color3.Red());
    viewFWDCastRay.attach(mesh, {
        origin: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0.5, 0.5),
        direction: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 1),
        length: 20
    });
    viewFWDCastRay.show();
    viewFWDCastRay.cast((pick)=>{
        if (pick && pick.hit) {
            viewFWDData.hit = true;
            viewFWDData.distance = pick.distance;
            viewFWDData.object = pick === null || pick === void 0 ? void 0 : pick.pickedMesh;
        } else {
            viewFWDData.hit = false;
            viewFWDData.distance = -1;
            viewFWDData.object = null;
        }
    }, [
        mesh.name,
        "ray"
    ]);
    //MOVE FUNCTIONS
    var death = ()=>{
        state.state = "DEATH";
        mesh.checkCollisions = false;
        isBlockedRadar = true;
        state.moved = false;
        isEscape = false;
        isHunting = false;
        groundCastRay.dispose();
        viewFWDCastRay.dispose();
        mesh.name = "DEATH";
        tableUp.deathState();
        console.log(id, "is DEATH");
    };
    var moveFwd = ()=>{
        if (STOPED) return;
        mesh.moveWithCollisions(mesh.forward.scale(SPEED), true);
    };
    var lookAtEnemy = (enemy)=>{
        var dir = enemy.getPosition().subtract(mesh.getAbsolutePosition().clone()).normalize();
        var angleEnemy = -Math.atan2(dir.z, dir.x) - Math.PI / 2;
        var fullAngle = angleEnemy + Math.PI;
        mesh.rotation.y = fullAngle;
        return new Promise((res, _)=>{
            return res(enemy);
        });
    };
    var defaultMoved = ()=>{
        tableUp.defaultState();
        colliderBox.material = searchRadardMaterial;
        isBlockedRadar = false;
        isEscape = false;
        isHunting = false;
        SPEED = parseFloat(((Math.random() * (3 - 2 + 1) + 2) / 10).toFixed(2));
    };
    var escape = (fragPosition, hunterID)=>{
        var hunter = _state__WEBPACK_IMPORTED_MODULE_5__.GAMESTATE.objects.enemy.get(hunterID);
        tableUp.escapeState();
        colliderBox.material = escapeRadarMaterial;
        isBlockedRadar = true;
        isEscape = true;
        isHunting = false;
        SPEED = ESCAPESPEED;
        STOPED = false;
        mesh.lookAt(fragPosition);
        mesh.rotation.y += Math.PI;
        var count = 10;
        var o$ = scene.onBeforeRenderObservable.add(()=>{
            if (!count) {
                if (state.state === "DEATH") {
                    o$.remove();
                    death();
                }
                if (_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(mesh.getAbsolutePosition().clone(), hunter.getPosition()) > DISTANCESCAPED || hunter.getState().state === "DEATH") {
                    o$.remove();
                    defaultMoved();
                }
                mesh.rotation.y += 0.3 * (0,_utils__WEBPACK_IMPORTED_MODULE_3__.utils_signRandom)();
                count = 10;
            }
            count--;
        });
    };
    var hunting = (enemy)=>{
        tableUp.huntingState();
        colliderBox.material = huntRadarMaterial;
        isBlockedRadar = true;
        isHunting = true;
        isEscape = false;
        SPEED = HUNTSPEED;
        STOPED = false;
        var count = 5;
        var o$ = scene.onBeforeRenderObservable.add(()=>{
            if (!attack(enemy)) {
                o$.remove();
                defaultMoved();
            }
            ;
            if (!count) {
                if (state.state === "DEATH") {
                    o$.remove();
                    death();
                }
                if (_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(mesh.getAbsolutePosition().clone(), enemy.getPosition()) > DISTANCEHUNTING || enemy.getState().state === "DEATH") {
                    o$.remove();
                    defaultMoved();
                }
                lookAtEnemy(enemy);
                count = 5;
            }
            count--;
        });
    };
    var attack = (frag)=>{
        if (!state.arsenal.bullets) {
            return false;
        }
        ATTACK_INTERVAL -= 1;
        if (ATTACK_INTERVAL === 0) {
            ATTACK_INTERVAL = 10;
            state.arsenal.bullets -= 1;
            frag.damage(1);
        }
        return true;
    };
    var damage = function() {
        let val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        if (state.live) {
            state.live -= val;
            tableUp.updateLive(state.live.toString());
        } else {
            death();
        }
        return state.state;
    };
    //----------------------
    return {
        id: id,
        mesh: mesh,
        setPosition: (val)=>mesh.position = val,
        getPosition: ()=>mesh.getAbsolutePosition().clone(),
        lookAt: (pt)=>{
            mesh.lookAt(pt);
        },
        lookAtEnemy: lookAtEnemy,
        moveFWD: moveFwd,
        moveTo: (to)=>{
            mesh.lookAt(to);
            mesh.moveWithCollisions(mesh.forward.scale(SPEED), true);
        },
        rotateY: (angle)=>{
            mesh.rotation.y = angle;
        },
        jump: (endCallback)=>{
            var jump = 0.3;
            var maxY = 0;
            var o$ = scene.onBeforeRenderObservable.add(()=>{
                jump -= 0.06;
                mesh.position.y += jump;
                if (maxY < mesh.position.y) {
                    maxY = mesh.position.y;
                }
                if (jump <= 0) {
                    // console.log("Max", maxY)
                    o$.remove();
                    endCallback();
                }
            });
        },
        dispose: ()=>{
            mesh.dispose();
            groundCastRay.dispose();
            viewFWDCastRay.dispose();
        },
        getState: ()=>state,
        attack: attack,
        damage: damage,
        rob: (enemy)=>{
            state.arsenal.bullets += enemy.getState().arsenal.bullets;
            state.killedEnemy.push(enemy.id);
            console.log(id, state.arsenal.bullets);
        },
        getRayData: ()=>({
                ground: groundRayData,
                forward: viewFWDData
            }),
        nextTargetPt: ()=>{
            var pt = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.utils_getDistancePoint)(mesh.position.clone(), _state__WEBPACK_IMPORTED_MODULE_5__.GAMESTATE.navigationMap.get("ground"), 1000);
            mesh.lookAt(pt);
        },
        toGround: ()=>{
            if (groundRayData.distance > GRAVITY || !groundRayData.hit) {
                mesh.moveWithCollisions(mesh.up.scale(-GRAVITY), false);
            }
        },
        getRadarCollider: ()=>colliderBox,
        getRadarFragIntersection: ()=>{
            if (isBlockedRadar) return;
            _state__WEBPACK_IMPORTED_MODULE_5__.GAMESTATE.objects.enemy.forEach((enm)=>{
                if (enm.id !== id && _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(mesh.position, enm.getPosition()) < 25 && enm.getState().state === "LIVE") {
                    hunting(enm);
                    enm.escape(mesh.position.clone(), id);
                }
            });
        },
        escape: escape,
        hunting: hunting
    };
}
function createEnemy(position, scene) {
    var enemy = Enemy(scene);
    enemy.setPosition(position);
    return enemy;
}
// MOVE LOGIC----------------------------------------------
function moveEnemy(enemy, scene) {
    var stopedGravity = false;
    var stopedGround = false;
    var stopedFWD = false;
    var isFindPath = false;
    var isFindMost = false;
    var endEdgeCallback = ()=>stopedGround = false;
    var endMostCallback = ()=>stopedFWD = false;
    var endJumpCallback = ()=>stopedGravity = false;
    //---------------------------------------------------------
    var o$ = scene.onBeforeRenderObservable.add(()=>{
        if (!stopedGravity) {
            enemy.toGround();
        }
        if (enemy.getState().moved) {
            if (!stopedGround) {
                enemy.moveFWD();
                enemy.getRadarFragIntersection();
                var rays = enemy.getRayData();
                if (rays.ground.hit) {
                    if (rays.ground.object.name.includes("edge")) {
                        stopedGround = true;
                        edgeMove(enemy, endEdgeCallback, scene);
                    } else if (rays.ground.object.name.includes("markMost") && !isFindMost) {
                        isFindMost = true;
                        var parseName = rays.ground.object.name.split("-");
                        var mostName = parseName.pop();
                        var sideNumber = parseName.pop();
                        if (mostName && sideNumber) {
                            mostMove(mostName, parseInt(sideNumber), enemy, ()=>{
                            // console.log("MOst End")
                            }, scene);
                        }
                    } else if (rays.ground.object.name.includes("path") && !isFindPath) {
                        isFindPath = true;
                        // stopedGround = true;
                        moveByPath(rays.ground.object.name, enemy, ()=>isFindPath = false, scene);
                    }
                }
            }
            if (!stopedFWD) {
                var rays = enemy.getRayData();
                if (rays.forward.hit) {
                    if (rays.forward.object.name.includes("hole")) {
                        enemy.jump(()=>{
                        // console.log("jump")
                        });
                    }
                }
            }
        }
    });
}
function edgeMove(enemy, endCallback, scene) {
    enemy.nextTargetPt();
    endCallback();
}
function mostMove(mostName, sideNumber, enemy, endCallback, scene) {
    var points = _state__WEBPACK_IMPORTED_MODULE_5__.GAMESTATE.navigationMap.get("mosts").get(mostName);
    var targetPoint = points[sideNumber];
    var endPoint = sideNumber === 0 ? points[1] : points[0];
    if (points) {
        enemy.lookAt(targetPoint);
        var o$ = scene.onBeforeRenderObservable.add(()=>{
            if (_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(targetPoint, enemy.getPosition()) < 3) {
                enemy.lookAt(endPoint);
                endCallback();
                o$.remove();
            }
        });
    }
}
function moveByPath(pathName, enemy, endCallback, scene) {
    var pathNavPt = _state__WEBPACK_IMPORTED_MODULE_5__.GAMESTATE.navigationMap.get("paths").get(pathName);
    var selectAction = true; //randomSelectAction(5);
    if (selectAction) {
        var { targetPoint, partPathPt } = getTargetPoint(pathNavPt, enemy.getPosition());
        var curve = drawCurve(partPathPt, scene);
        targetPoint = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(partPathPt[0].x, enemy.getPosition().y, partPathPt[0].z);
        enemy.lookAt(targetPoint);
        var maxPartIndex = partPathPt.length - 1;
        var index = 0;
        var o$ = scene.onBeforeRenderObservable.add(()=>{
            if (_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(targetPoint, enemy.getPosition()) < 5) {
                index += 1;
                if (index >= maxPartIndex) {
                    endCallback();
                    // console.log("End Path")
                    curve.dispose();
                    o$.remove();
                }
                targetPoint = partPathPt[index];
                enemy.lookAt(targetPoint);
            }
        });
    } else {
        endCallback();
        console.log("end path");
    }
}
//CUBE RANDOM
var randomSelectAction = (edge)=>Math.random() * 10 > edge ? false : true;
//UTILS FOR PATH
var getTargetPoint = (pathPoints, enemyPosition)=>{
    var minDistance = 1000000;
    var targetIndex = 0;
    var targetPoint = null;
    var maxIndex = pathPoints.length;
    pathPoints.forEach((pt, i)=>{
        var distance = _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3.Distance(pt, enemyPosition);
        if (distance < minDistance) {
            minDistance = distance;
            targetPoint = pt;
            targetIndex = i;
        }
    });
    var direction = 1;
    if (targetIndex > maxIndex / 2) {
        direction = -1;
    }
    var partPathPt = direction < 0 ? pathPoints.slice(0, targetIndex).reverse() : pathPoints.slice(targetIndex, maxIndex);
    return {
        targetPoint,
        partPathPt
    };
};
var drawCurve = (points, scene)=>{
    var drawCurve = (0,_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.CreateLines)(`lns-${(0,_utils__WEBPACK_IMPORTED_MODULE_3__.utils_RND_string)()}`, {
        points: points
    }, scene);
    return {
        dispose: ()=>{
            drawCurve.dispose();
        }
    };
};


}),
"./src/GAME/Enemy/enemyGenerator.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EnemyGenerator: () => (EnemyGenerator)
});
/* ESM import */var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/interval.js");
/* ESM import */var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js");
/* ESM import */var _Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/Events/eventDefinition.ts");


function EnemyGenerator(max) {
    var i = 0;
    var g$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.interval)(1000).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeWhile)(()=>i < max));
    var run = ()=>{
        g$.subscribe({
            next: ()=>{
                i += 1;
                dispatchEvent(new CustomEvent(_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__.GAMEEVENTS.createEnemy));
            },
            complete: ()=>{
            // console.log("Enemy Generator Ended")
            }
        });
    };
    return {
        run: run
    };
}


}),
"./src/GAME/Events/eventDefinition.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GAMEEVENTS: () => (GAMEEVENTS),
  preload: () => (preload)
});
var GAMEEVENTS = {
    preload: "preload",
    preloadUpdate: "preload-update",
    start: "start",
    runGame: "run-game",
    pauseLevel: "pause-level",
    stopLevel: "stop-level",
    endLevel: "end-level",
    endGame: "end-game",
    createEnemy: "create-enemy",
    disposeEnemy: "dispose-enemy",
    attackEnemy: "attack-enemy"
};
async function preload() {
    return new Promise((res)=>{
        var tm = setTimeout(()=>{
            clearTimeout(tm);
            dispatchEvent(new CustomEvent(GAMEEVENTS.preload, {
                detail: {
                    percent: 25,
                    stage: "loader core"
                }
            }));
            res(true);
        }, 200);
    });
}


}),
"./src/GAME/Events/gameEvents.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/proxiBabylon.ts");
/* ESM import */var _Enemy_enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/Enemy/enemy.ts");
/* ESM import */var _gameCircle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/GAME/gameCircle.ts");
/* ESM import */var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/GAME/types.ts");
/* ESM import */var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/GAME/utils.ts");
/* ESM import */var _eventDefinition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/GAME/Events/eventDefinition.ts");







//GAME EVENTS
(()=>{
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.preload, (e)=>{
        _state__WEBPACK_IMPORTED_MODULE_3__.screenManager.switchState(_types__WEBPACK_IMPORTED_MODULE_4__.GAMESTATUS.PRELOAD);
        var preloadScreen = _state__WEBPACK_IMPORTED_MODULE_3__.screenManager.getScreen(_types__WEBPACK_IMPORTED_MODULE_4__.SCREENS.preload);
        preloadScreen.update(e.detail);
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.start, (e)=>{
        _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.state.state = _types__WEBPACK_IMPORTED_MODULE_4__.GAMESTATUS.START;
        _state__WEBPACK_IMPORTED_MODULE_3__.screenManager.switchState(_types__WEBPACK_IMPORTED_MODULE_4__.GAMESTATUS.START);
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.runGame, (e)=>{
        if (_state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.state.isMobile) {
            var root = document.querySelector("#root");
            if (root.requestFullscreen) {
                root.requestFullscreen();
                console.log("full");
            } else {
                console.log("no-full");
            }
        // 
        }
        var scene = e.detail.scene;
        if (scene) {
            _state__WEBPACK_IMPORTED_MODULE_3__.screenManager.switchState(_types__WEBPACK_IMPORTED_MODULE_4__.GAMESTATUS.RUN);
            _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.level.run();
            (0,_gameCircle__WEBPACK_IMPORTED_MODULE_2__.runGameLogicCircle)();
            (0,_gameCircle__WEBPACK_IMPORTED_MODULE_2__.runGameLoop)(scene);
            _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.state.state = _types__WEBPACK_IMPORTED_MODULE_4__.GAMESTATUS.RUN;
        }
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.pauseLevel, ()=>{
        var level = _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.level;
        if (level.state()) {
            level.stop();
        } else {
            level.run();
        }
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.stopLevel, ()=>{
        _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.level.stop();
        dispatchEvent(new CustomEvent(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.start));
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.endLevel, ()=>{
        console.log("Level End");
        dispatchEvent(new CustomEvent(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.start));
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.endGame, ()=>{
        console.log("End GAme");
        dispatchEvent(new CustomEvent(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.start));
    });
    //ENEMY
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.createEnemy, async (e)=>{
        var enemy = (0,_Enemy_enemy__WEBPACK_IMPORTED_MODULE_1__.createEnemy)(new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Vector3((0,_utils__WEBPACK_IMPORTED_MODULE_5__.utils_RND_Clamp_integer)(10, 30) * (0,_utils__WEBPACK_IMPORTED_MODULE_5__.utils_signRandom)(), 1, (0,_utils__WEBPACK_IMPORTED_MODULE_5__.utils_RND_Clamp_integer)(10, 30) * (0,_utils__WEBPACK_IMPORTED_MODULE_5__.utils_signRandom)()), _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.state.scene);
        (0,_Enemy_enemy__WEBPACK_IMPORTED_MODULE_1__.moveEnemy)(enemy, _state__WEBPACK_IMPORTED_MODULE_3__.GAMESTATE.state.scene);
        (0,_state__WEBPACK_IMPORTED_MODULE_3__.addEnemyToState)(enemy);
    });
    addEventListener(_eventDefinition__WEBPACK_IMPORTED_MODULE_6__.GAMEEVENTS.attackEnemy, (e)=>{
        var data = e.detail;
        var assaulterID = data.assaulter; //атакующий
        var victimID = data.victim; //жертва
        if (assaulterID && victimID) {
            var assaulter = (0,_state__WEBPACK_IMPORTED_MODULE_3__.getEnemyFromState)(assaulterID);
            var victim = (0,_state__WEBPACK_IMPORTED_MODULE_3__.getEnemyFromState)(victimID);
            if (assaulter && victim) {
                var state = victim.damage(5);
                assaulter.attack();
                if (state === "DEATH") {
                    assaulter.rob(victim);
                    victim.getState().killer = assaulter.id;
                }
            }
        }
    });
})();
//SYSTEM EVENTS
(()=>{
    document.body.addEventListener("contextmenu", (e)=>{
        if (e.button === 2) {
            e.preventDefault();
            return false;
        }
    });
    document.addEventListener("fullscreenchange", ()=>{});
})();


}),
"./src/GAME/GUI/table.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TableUp: () => (TableUp)
});
/* ESM import */var _babylonjs_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/gui/index.js");
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/proxiBabylon.ts");


function TableUp(name, parent, localPos, content, scene) {
    var mesh = (0,_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.CreatePlane)(name, {
        width: 20,
        height: 10
    }, scene);
    mesh.setParent(parent);
    mesh.setPositionWithLocalVector(localPos);
    mesh.billboardMode = _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Mesh.BILLBOARDMODE_ALL;
    var gui = _babylonjs_gui__WEBPACK_IMPORTED_MODULE_0__.AdvancedDynamicTexture.CreateForMesh(mesh, 1024, 512);
    // gui.rootContainer.scaleX = window.devicePixelRatio;
    // gui.rootContainer.scaleY = window.devicePixelRatio;
    var rect2 = new _babylonjs_gui__WEBPACK_IMPORTED_MODULE_0__.Rectangle();
    rect2.width = 1024;
    rect2.height = 512;
    rect2.background = "transparent";
    rect2.color = "#fff";
    gui.addControl(rect2);
    var tb = new _babylonjs_gui__WEBPACK_IMPORTED_MODULE_0__.TextBlock();
    tb.text = content;
    tb.color = "#000";
    tb.fontSize = 250;
    // tb.fontWeight = "bold";
    rect2.addControl(tb);
    return {
        huntingState: ()=>{
            rect2.background = "#f66";
        },
        escapeState: ()=>{
            rect2.background = "#66f";
        },
        defaultState: ()=>{
            rect2.background = "transparent";
        },
        deathState: ()=>{
            rect2.background = "#333";
        },
        updateLive: (val)=>{
            tb.text = val;
        }
    };
}


}),
"./src/GAME/Havok/initHavok.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initHavok: () => (initHavok)
});
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/proxiBabylon.ts");

async function initHavok() {
    return new Promise(async (res)=>{
        var havok = await _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.HVK["default"]();
        var hp = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.HavokPlugin(true, havok);
        res(hp);
    });
}


}),
"./src/GAME/Hero/hero.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Hero: () => (Hero),
  keyController: () => (keyController)
});
/* ESM import */var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/core/index.js");
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/proxiBabylon.ts");
/* ESM import */var _CastRay_castRay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/GAME/CastRay/castRay.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/GAME/types.ts");




async function Hero(heroType, scene) {
    var FWD_SPEED = 0.2;
    var JUMP_POWER = 0.5;
    var GRAVITY = 0.05;
    var jumped = false;
    var currentSpeed = 0;
    var mesh = (0,_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.CreateBox)("hero", {
        width: 1,
        height: 2,
        depth: 1
    }, scene);
    mesh.position = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 1, 0);
    var material = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("hero-material", scene);
    material.diffuseColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Color3(0.4, 0.7, 0.8);
    mesh.material = material;
    mesh.checkCollisions = true;
    mesh.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_GROUP.HERO;
    mesh.collisionMask = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_MASK.HERO;
    //RAY CASTING-------------------------------------------
    var isGroundRay = false;
    var groundHeight = 0;
    var groundCastRay = (0,_CastRay_castRay__WEBPACK_IMPORTED_MODULE_2__.CastRay)("ground-ray", scene, _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Color3.Red());
    groundCastRay.attach(mesh, {
        origin: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, -0.5),
        direction: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0),
        length: 1
    });
    groundCastRay.show();
    groundCastRay.cast((pick)=>{
        if (pick && pick.hit) {
            isGroundRay = true;
            var distance = pick.distance;
            groundHeight = distance;
        } else {
            isGroundRay = false;
        }
    }, [
        mesh.name,
        "ray"
    ]);
    var forwardCastRay = (0,_CastRay_castRay__WEBPACK_IMPORTED_MODULE_2__.CastRay)("forward-ray", scene, _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Color3.Red());
    forwardCastRay.attach(mesh, {
        origin: new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0.5, -0.5),
        direction: mesh.forward.clone(),
        length: 10
    });
    forwardCastRay.show();
    forwardCastRay.cast((pick)=>{
        if (pick && pick.hit) {} else {}
    }, [
        mesh.name,
        "ray"
    ]);
    //LOGIC LOOP ----------------------------
    var i = 10;
    scene.onBeforeRenderObservable.add(()=>{
        // if (i > 0) {
        //     i -= 1;
        // } else {
        //     console.log("ground ray", isGroundRay, groundHeight);
        //     i = 10;
        // }
        if (groundHeight > 0.05) {
            mesh.moveWithCollisions(mesh.up.scale(-0.2));
        } else {
            // var tm = setTimeout(() => {
            //     jumped = false;
            //     clearTimeout(tm);
            // }, 1000);
            jumped = false;
        }
    });
    var addCamera = ()=>{
        var camera = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.FollowCamera("hero-follow-camera", new _proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 10, 10), scene, mesh);
        camera.radius = 10;
        camera.heightOffset = 3;
        camera.rotationOffset = 0;
        camera.maxCameraSpeed = 2;
        camera.cameraAcceleration = 0.05;
        // camera.minZ = 6;
        // camera.attachControl(true);
        scene.setActiveCameraByName(camera.name);
    };
    // addCamera();
    return {
        mesh: mesh,
        stop: ()=>{
            currentSpeed = 0;
        },
        rotateAngl: (angle)=>{
            mesh.rotation.y = angle;
        },
        rotateCW: ()=>{
            mesh.moveWithCollisions(mesh.forward.scale(0.01));
            mesh.rotate(_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Axis.Y, 0.1);
        },
        rotateCCW: ()=>{
            mesh.moveWithCollisions(mesh.forward.scale(0.01));
            mesh.rotate(_proxiBabylon__WEBPACK_IMPORTED_MODULE_1__.Axis.Y, -0.1);
        },
        fwd: ()=>{
            if (currentSpeed < FWD_SPEED) {
                currentSpeed += 0.025;
            }
            mesh.moveWithCollisions(mesh.forward.scale(currentSpeed));
        },
        bwd: ()=>{
            if (currentSpeed < FWD_SPEED * 0.5) {
                currentSpeed += 0.015;
            }
            mesh.moveWithCollisions(mesh.forward.scale(currentSpeed));
        },
        jump: ()=>{
            if (!jumped) {
                console.log("JUMP", jumped);
                jumped = true;
                var jump_power = JUMP_POWER;
                var o$ = scene.onBeforeRenderObservable.add(()=>{
                    if (currentSpeed > 0.025) {
                        currentSpeed -= 0.002;
                    }
                    if (jump_power > GRAVITY) {
                        jump_power -= GRAVITY * 0.5;
                        mesh.movePOV(0, jump_power, currentSpeed);
                    } else {
                        o$.remove();
                    }
                });
            }
        }
    };
}
//-----------------------------------------------
function keyController(heroState, state) {
    switch(state){
        case 0:
            {
                heroState.stop();
                break;
            }
        case 1:
            {
                heroState.fwd();
                break;
            }
        case 2:
            {
                heroState.bwd();
                break;
            }
        case 8:
            {
                heroState.rotateCW();
                break;
            }
        case 4:
            {
                heroState.rotateCCW();
                break;
            }
        case 5:
            {
                heroState.rotateCCW();
                break;
            }
        case 9:
            {
                heroState.rotateCW();
                break;
            }
        case 6:
            {
                break;
            }
        case 10:
            {
                break;
            }
        case 16:
            {
                heroState.jump();
                break;
            }
        case 17:
            {
                heroState.jump();
                break;
            }
        case 32:
            {
                console.log("Shift Key");
                break;
            }
    }
}


}),
"./src/GAME/Level/level.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Level: () => (Level)
});
/* ESM import */var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/interval.js");
/* ESM import */var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js");
/* ESM import */var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/zip.js");
/* ESM import */var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* ESM import */var _levelMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/Level/levelMap.ts");


function Level() {
    var id = 0;
    var intervalGen = 1000;
    var isRun = false;
    var levelGenerator = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.interval)(intervalGen).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeWhile)(()=>isRun));
    var levelDescription = _levelMap__WEBPACK_IMPORTED_MODULE_0__.LevelMap[id];
    var levelTest$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.zip)((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.from)(levelDescription.levelMap), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.interval)(500));
    var levelRun = ()=>{
        isRun = true;
    // console.log(levelDescription.description)
    // levelTest$.subscribe({
    //     next: (w) => {
    //         console.log("res => ", w)
    //     },
    //     complete: () => {
    //         isRun = false;
    //         console.log("end test$");
    //     }
    // })
    // levelGenerator.subscribe({
    //     next: () => {
    //         //console.log("run")
    //     },
    //     complete: () => {
    //         if (id < LevelMap.length - 1) {
    //             dispatchEvent(new CustomEvent(GAMEEVENTS.endLevel))
    //             id += 1;
    //             levelDescription = LevelMap[id];
    //             levelTest$ = zip(from(levelDescription.levelMap), interval(500));
    //         } else {
    //             dispatchEvent(new CustomEvent(GAMEEVENTS.endGame))
    //         }
    //     }
    // });
    };
    var levelStop = ()=>{
        isRun = false;
    };
    return {
        id: id,
        state: ()=>isRun,
        run: levelRun,
        stop: levelStop
    };
}


}),
"./src/GAME/Level/levelMap.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LevelMap: () => (LevelMap)
});
var LevelMap = new Array();
var ld_0 = {
    id: 0,
    description: "level map 0",
    levelMap: [
        "a1",
        "a0",
        "a2",
        "a0",
        "a3",
        "a0",
        "a4",
        "a0",
        "a5",
        "a0",
        "a6",
        "x"
    ]
};
LevelMap.push(ld_0);
var ld_1 = {
    id: 1,
    description: "level map 1",
    levelMap: [
        "b1",
        "b0",
        "b2",
        "b0",
        "b3",
        "b0",
        "b4",
        "b0",
        "b5",
        "b0",
        "b6",
        "x"
    ]
};
LevelMap.push(ld_1);
var ld_2 = {
    id: 2,
    description: "level map 2",
    levelMap: [
        "c1",
        "c0",
        "c2",
        "c0",
        "c3",
        "c0",
        "c4",
        "c0",
        "c5",
        "c0",
        "c6",
        "x"
    ]
};
LevelMap.push(ld_2);


}),
"./src/GAME/Loaders/loaderModels.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  assetManagerEnv: () => (assetManagerEnv),
  assetsMap: () => (assetsMap),
  getInstanceModel: () => (getInstanceModel),
  initAssets: () => (initAssets),
  loadModeltoAssets: () => (loadModeltoAssets),
  selectorAsset: () => (selectorAsset)
});
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/proxiBabylon.ts");
/* ESM import */var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/GAME/types.ts");



var assetsMap = new Map();
var assetManagerEnv = null;
async function loadModeltoAssets(path, type, scene) {
    var asset = await (0,_proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.LoadAssetContainerAsync)(path, scene);
    assetsMap.set(type, asset);
}
function getInstanceModel(type) {
    var asset = assetsMap.get(type);
    return asset ? asset.instantiateModelsToScene((name)=>name, false, {
        doNotInstantiate: true
    }) : null;
}
async function initAssets(scene) {
    await loadModeltoAssets(`${_state__WEBPACK_IMPORTED_MODULE_1__.GAMESTATE.paths.models}/jamPole.glb`, _types__WEBPACK_IMPORTED_MODULE_2__.MODELTYPE.PLANE_0, scene);
}
async function selectorAsset(heroType) {
    var asset = getInstanceModel(heroType);
    var root = asset === null || asset === void 0 ? void 0 : asset.rootNodes[0];
    if (root) {
        return root;
    }
    return null;
}


}),
"./src/GAME/environment.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createEnvironment: () => (createEnvironment)
});
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/proxiBabylon.ts");
/* ESM import */var _Controls_mobileControl_mobileControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/Controls/mobileControl/mobileControl.ts");
/* ESM import */var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/GAME/types.ts");
/* ESM import */var _Hero_hero__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/GAME/Hero/hero.ts");
/* ESM import */var _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babylonjs/core/index.js");
/* ESM import */var _Controls_KeyControl_keyboardControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/GAME/Controls/KeyControl/keyboardControl.ts");
/* ESM import */var _Loaders_loaderModels__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/GAME/Loaders/loaderModels.ts");
/* ESM import */var _Enemy_enemyGenerator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/GAME/Enemy/enemyGenerator.ts");









async function createEnvironment(scene) {
    var isMobile = _state__WEBPACK_IMPORTED_MODULE_2__.GAMESTATE.state.isMobile;
    if (isMobile) {
        var mobileControl = (0,_Controls_mobileControl_mobileControl__WEBPACK_IMPORTED_MODULE_1__.MobileCotrol)(scene);
        scene.clearColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color4(70 / 255, 70 / 255, 70 / 255, 1);
    } else {
        var keyBoardControl = (0,_Controls_KeyControl_keyboardControl__WEBPACK_IMPORTED_MODULE_6__.KeyboardControl)(scene);
        scene.clearColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color4(40 / 255, 41 / 255, 40 / 255, 1);
    }
    scene.ambientColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color3(4 / 255, 9 / 255, 12 / 255);
    scene.collisionsEnabled = true;
    var baseCamera = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.UniversalCamera("base-camera", new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 300, 0), scene);
    // baseCamera.fov = 1
    baseCamera.target = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0);
    baseCamera.maxZ = 1050;
    baseCamera.attachControl();
    var hlight = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.HemisphericLight("base-light", new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), scene);
    hlight.intensity = 1.9;
    var dirLight = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__.DirectionalLight("shagow-light", new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Vector3(-0.3, -1, -0.5), scene);
    var shadowGen = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__.ShadowGenerator(1024, dirLight);
    //---------------------------------------------------------------------
    // Ground(scene);
    var enemyMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__.StandardMaterial("enemy-material", scene);
    enemyMaterial.diffuseColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color3(0.3, 0.3, 0.7);
    var enemyEscapeMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__.StandardMaterial("enemy-escape-material", scene);
    enemyEscapeMaterial.diffuseColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color3(0.9, 0.3, 0.3);
    enemyEscapeMaterial.alpha = 0.6;
    var enemyHuntingMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__.StandardMaterial("enemy-hunting-material", scene);
    enemyHuntingMaterial.diffuseColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color3(0.1, 0.3, 0.9);
    enemyHuntingMaterial.alpha = 0.6;
    var enemyColliderMaterial = new _babylonjs_core__WEBPACK_IMPORTED_MODULE_5__.StandardMaterial("enemy-collider-material", scene);
    enemyColliderMaterial.diffuseColor = new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Color3(0.3, 0.3, 0.7);
    enemyColliderMaterial.alpha = 0.6;
    var pole = await (0,_Loaders_loaderModels__WEBPACK_IMPORTED_MODULE_7__.selectorAsset)(_types__WEBPACK_IMPORTED_MODULE_3__.MODELTYPE.PLANE_0);
    var paths = new Map(); // разметка путей
    var mosts = new Map(); // разметка мостов
    if (pole) {
        pole.name = "pole";
        pole.getChildMeshes().forEach((m)=>{
            m.checkCollisions = true;
            shadowGen.addShadowCaster(m);
            m.receiveShadows = true;
            if (m.name.includes("ground")) {
                m.receiveShadows = true;
                m.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_GROUP.GROUND;
                m.collisionMask = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_GROUP.GROUND;
            } else {
                m.visibility = 0;
            }
            if (m.name.includes("most")) {
                var marksPoint = m.getChildTransformNodes(false, (n)=>n.name.includes("pt")).map((pt)=>pt.getAbsolutePosition());
                mosts.set(m.name, marksPoint);
                m.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_GROUP.GROUND;
                m.collisionMask = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_MASK.GROUND;
            }
            if (m.name.includes("path")) {
                var marksPoint = m.getChildTransformNodes(false, (n)=>n.name.includes("pt")).map((pt)=>pt.getAbsolutePosition());
                paths.set(m.name, marksPoint);
                m.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_GROUP.MARK;
                m.collisionMask = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_MASK.MARK;
            }
            if (m.name.includes("hole")) {
                m.checkCollisions = false;
                m.name = "hole";
                m.collisionGroup = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_GROUP.MARK;
                m.collisionMask = _types__WEBPACK_IMPORTED_MODULE_3__.COLLIDE_MASK.MARK;
            }
        });
        _state__WEBPACK_IMPORTED_MODULE_2__.GAMESTATE.navigationMap.set("paths", paths);
        _state__WEBPACK_IMPORTED_MODULE_2__.GAMESTATE.navigationMap.set("mosts", mosts);
        var polePoints = pole.getChildTransformNodes(false, (pt)=>pt.name.includes("pt-nav")).map((node)=>node.getAbsolutePosition().clone());
        _state__WEBPACK_IMPORTED_MODULE_2__.GAMESTATE.navigationMap.set("ground", polePoints);
    // var nav1 = utils_getNavigationPoints(outNavPoints, 6000);
    // var nav2 = utils_getNavigationPoints(outNavPoints, 6000);
    // var nav3 = utils_getNavigationPoints(outNavPoints, 6000);
    // var navigator1 = await CrowdNavigation(pole.getChildMeshes(), nav1.pt1, nav1.pt2, scene);
    // navigator1.drawPath();
    // var navigator2 = await CrowdNavigation(pole.getChildMeshes(), nav2.pt1, nav2.pt2, scene);
    // navigator2.drawPath();
    // var navigator3 = await CrowdNavigation(pole.getChildMeshes(), nav3.pt1, nav3.pt2, scene);
    // navigator3.drawPath();
    // navigator1.addAgent(enemy1);
    // navigator1.run();
    //navigator1.goAgent(enemy1.getCrowdIndex(), outNavPoints[10])
    }
    var hero = await (0,_Hero_hero__WEBPACK_IMPORTED_MODULE_4__.Hero)(_types__WEBPACK_IMPORTED_MODULE_3__.MODELTYPE.EMPTY, scene);
    var enemyGenerator = (0,_Enemy_enemyGenerator__WEBPACK_IMPORTED_MODULE_8__.EnemyGenerator)(100);
    enemyGenerator.run();
    // var enemy = createEnemy(new Vector3(30, 1, 30), scene);
    // var enemy2 = createEnemy(new Vector3(-12, 1, 10), scene);
    // setTimeout(() => {
    //     enemy.lookAtEnemy(enemy2);
    //     enemy2.lookAtEnemy(enemy);
    // }, 2000)
    //ENEMY LOGIC------------------------------
    if (hero) {
        function fnc() {
            if (isMobile) {
                var data = mobileControl.data();
                var angle = -Math.atan2(data.y, data.x);
                // console.log(Tools.ToDegrees(angle))
                hero.rotateAngl(angle);
            } else {
                var kbdata = keyBoardControl.getState();
                (0,_Hero_hero__WEBPACK_IMPORTED_MODULE_4__.keyController)(hero, kbdata);
            // console.log(kbdata);
            }
        }
        scene.onBeforeRenderObservable.add(()=>{
            fnc();
        });
    }
    setTimeout(console.log, 1000, "hello");
}


}),
"./src/GAME/gameCircle.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runGameLogicCircle: () => (runGameLogicCircle),
  runGameLoop: () => (runGameLoop),
  stopGameLoop: () => (stopGameLoop)
});
function runGameLoop(scene) {
    var engine = scene.getEngine();
    if (scene && engine) {
        scene.getEngine().runRenderLoop(()=>{
            scene.render();
        });
    }
}
function stopGameLoop(engine) {
    if (engine) {
        engine.stopRenderLoop();
    }
}
const runGameLogicCircle = ()=>{};


}),
"./src/GAME/init.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InitGame: () => (InitGame)
});
/* ESM import */var _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/proxiBabylon.ts");
/* ESM import */var _Havok_initHavok__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/Havok/initHavok.ts");


Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, "./node_modules/@babylonjs/core/Physics/physicsEngineComponent.js"));
async function InitGame(canvas) {
    var engine = initEngine(canvas);
    var scene = initScene(engine);
    var havok = await (0,_Havok_initHavok__WEBPACK_IMPORTED_MODULE_1__.initHavok)();
    if (scene && engine && havok) {
        scene.enablePhysics(new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -9.81, 0), havok);
        addEventListener("resize", ()=>{
            engine.resize();
        });
        return {
            scene,
            engine,
            havok
        };
    }
    return null;
}
const initEngine = (canvas)=>{
    if (canvas) {
        return new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Engine(canvas, true, {
            preserveDrawingBuffer: false,
            stencil: true
        }, true);
    }
    return null;
};
const initScene = (engine)=>{
    if (engine) {
        return new _proxiBabylon__WEBPACK_IMPORTED_MODULE_0__.Scene(engine);
    }
    return null;
};


}),
"./src/GAME/state.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GAMESTATE: () => (GAMESTATE),
  addEnemyToState: () => (addEnemyToState),
  clearAllEnemyFromState: () => (clearAllEnemyFromState),
  getEnemyFromState: () => (getEnemyFromState),
  screenManager: () => (screenManager)
});
/* ESM import */var _UI_screenManager_screenManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/UI/screenManager/screenManager.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/types.ts");


var GAMESTATE = {
    paths: {
        assets: `./assets`,
        css: `./assets/css`,
        icons: `./assets/icon`,
        image: `./assets/images`,
        texture: `./assets/textures`,
        scripts: `./assets/scripts`,
        models: `./assets/models`
    },
    state: {
        state: _types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.START,
        stopRender: false,
        scene: null,
        engine: null,
        camera: null,
        canvas: null,
        isMobile: false
    },
    navigationMap: new Map(),
    level: null,
    physics: {
        havok: null
    },
    objects: {
        enemy: new Map()
    }
};
var screenManager = new _UI_screenManager_screenManager__WEBPACK_IMPORTED_MODULE_0__.ScreenManager();
//------------------------------------
var addEnemyToState = (enemy)=>GAMESTATE.objects.enemy.set(enemy.id, enemy);
var getEnemyFromState = (id)=>GAMESTATE.objects.enemy.get(id);
var clearAllEnemyFromState = ()=>{
    var enemyMap = GAMESTATE.objects.enemy;
    enemyMap.forEach((v)=>{
        v.dispose();
    });
    enemyMap.clear();
};


}),
"./src/GAME/types.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  COLLIDE_GROUP: () => (COLLIDE_GROUP),
  COLLIDE_MASK: () => (COLLIDE_MASK),
  ENEMYMOVETYPE: () => (ENEMYMOVETYPE),
  GAMESTATUS: () => (GAMESTATUS),
  LEVELSTATE: () => (LEVELSTATE),
  MODELTYPE: () => (MODELTYPE),
  SCREENS: () => (SCREENS)
});
var SCREENS = /*#__PURE__*/ function(SCREENS) {
    SCREENS[SCREENS["preload"] = 0] = "preload";
    SCREENS[SCREENS["start"] = 1] = "start";
    SCREENS[SCREENS["game"] = 2] = "game";
    SCREENS[SCREENS["level"] = 3] = "level";
    SCREENS[SCREENS["levelMobile"] = 31] = "levelMobile";
    SCREENS[SCREENS["levelResult"] = 4] = "levelResult";
    SCREENS[SCREENS["endGame"] = 5] = "endGame";
    return SCREENS;
}({});
var GAMESTATUS = /*#__PURE__*/ function(GAMESTATUS) {
    GAMESTATUS[GAMESTATUS["PRELOAD"] = 0] = "PRELOAD";
    GAMESTATUS[GAMESTATUS["START"] = 1] = "START";
    GAMESTATUS[GAMESTATUS["RUN"] = 2] = "RUN";
    GAMESTATUS[GAMESTATUS["PAUSE"] = 3] = "PAUSE";
    GAMESTATUS[GAMESTATUS["LEVELEND"] = 4] = "LEVELEND";
    GAMESTATUS[GAMESTATUS["END"] = 5] = "END";
    return GAMESTATUS;
}({});
var LEVELSTATE = /*#__PURE__*/ function(LEVELSTATE) {
    LEVELSTATE[LEVELSTATE["RUN"] = 0] = "RUN";
    LEVELSTATE[LEVELSTATE["PAUSE"] = 1] = "PAUSE";
    LEVELSTATE[LEVELSTATE["STOP"] = 2] = "STOP";
    LEVELSTATE[LEVELSTATE["END"] = 3] = "END";
    LEVELSTATE[LEVELSTATE["GAMEEND"] = 4] = "GAMEEND";
    return LEVELSTATE;
}({});
var MODELTYPE = /*#__PURE__*/ function(MODELTYPE) {
    MODELTYPE[MODELTYPE["EMPTY"] = 0] = "EMPTY";
    MODELTYPE[MODELTYPE["PLANE_0"] = 1] = "PLANE_0";
    MODELTYPE[MODELTYPE["SINGLE_HERO"] = 200] = "SINGLE_HERO";
    MODELTYPE[MODELTYPE["DOUBLE_HERO"] = 201] = "DOUBLE_HERO";
    return MODELTYPE;
}({});
var ENEMYMOVETYPE = /*#__PURE__*/ function(ENEMYMOVETYPE) {
    ENEMYMOVETYPE[ENEMYMOVETYPE["LEFT"] = 0] = "LEFT";
    ENEMYMOVETYPE[ENEMYMOVETYPE["RIGHT"] = 1] = "RIGHT";
    ENEMYMOVETYPE[ENEMYMOVETYPE["UP"] = 2] = "UP";
    ENEMYMOVETYPE[ENEMYMOVETYPE["DOWN"] = 3] = "DOWN";
    ENEMYMOVETYPE[ENEMYMOVETYPE["FWD"] = 4] = "FWD";
    ENEMYMOVETYPE[ENEMYMOVETYPE["STAB"] = 5] = "STAB";
    ENEMYMOVETYPE[ENEMYMOVETYPE["LOOP"] = 6] = "LOOP";
    return ENEMYMOVETYPE;
}({});
//COLLISIONS DEFINE-------------------------------------------
var COLLIDE_GROUP = /*#__PURE__*/ function(COLLIDE_GROUP) {
    COLLIDE_GROUP[COLLIDE_GROUP["HERO"] = 1] = "HERO";
    COLLIDE_GROUP[COLLIDE_GROUP["ENEMY"] = 2] = "ENEMY";
    COLLIDE_GROUP[COLLIDE_GROUP["ENEMY_RADAR"] = 4] = "ENEMY_RADAR";
    COLLIDE_GROUP[COLLIDE_GROUP["GROUND"] = 128] = "GROUND";
    COLLIDE_GROUP[COLLIDE_GROUP["MARK"] = 64] = "MARK";
    return COLLIDE_GROUP;
}({});
var COLLIDE_MASK = /*#__PURE__*/ function(COLLIDE_MASK) {
    COLLIDE_MASK[COLLIDE_MASK["HERO"] = 128] = "HERO";
    COLLIDE_MASK[COLLIDE_MASK["ENEMY"] = 128] = "ENEMY";
    COLLIDE_MASK[COLLIDE_MASK["ENEMY_RADAR"] = 4] = "ENEMY_RADAR";
    COLLIDE_MASK[COLLIDE_MASK["GROUND"] = 3] = "GROUND";
    COLLIDE_MASK[COLLIDE_MASK["MARK"] = 0] = "MARK";
    return COLLIDE_MASK;
}({});


}),
"./src/GAME/utils.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  utils_RND_Clamp_integer: () => (utils_RND_Clamp_integer),
  utils_RND_float: () => (utils_RND_float),
  utils_RND_string: () => (utils_RND_string),
  utils_Vector3Random: () => (utils_Vector3Random),
  utils_getDistancePoint: () => (utils_getDistancePoint),
  utils_getNavigationPoints: () => (utils_getNavigationPoints),
  utils_signRandom: () => (utils_signRandom)
});
/* ESM import */var _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/core/index.js");

function utils_RND_string() {
    let length = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while(counter < length){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
function utils_RND_float() {
    let rnd = 0;
    const seed = Math.random();
    if (seed < 0.2) rnd = 0.2;
    else if (seed > 0.4) rnd = 0.4;
    else rnd = seed;
    return rnd;
}
function utils_RND_Clamp_integer(min, max) {
    const seed = Math.floor(Math.random() * max);
    if (seed > max) return max;
    if (seed < min) return min;
    return seed;
}
function utils_signRandom() {
    return Math.random() >= 0.5 ? 1 : -1;
}
function utils_Vector3Random() {
    return new _babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3(utils_RND_Clamp_integer(80, 3) * utils_signRandom(), utils_RND_Clamp_integer(30, 10), -utils_RND_Clamp_integer(300, 250));
}
function utils_getNavigationPoints(points, minDistance) {
    var pt1 = getRandomFromArray(points);
    var pt2 = getMinDistanceFromNavPoints(points, minDistance, pt1, pt1);
    // console.log(Vector3.DistanceSquared(pt1, pt2))
    return {
        pt1,
        pt2
    };
}
function utils_getDistancePoint(pt1, points, minDistance) {
    var pt2 = getMinDistanceFromNavPoints(points, minDistance, pt1, pt1);
    return pt2;
}
//--------------------------------------
var getMinDistanceFromNavPoints = (points, distance, pt1, pt2)=>{
    var bufPt = pt2;
    if (_babylonjs_core__WEBPACK_IMPORTED_MODULE_0__.Vector3.DistanceSquared(pt1, pt2) < distance) {
        bufPt = getMinDistanceFromNavPoints(points, distance, pt1, getRandomFromArray(points));
    }
    return bufPt;
};
var getRandomFromArray = (arr)=>arr[arr.length * Math.random() | 0];


}),
"./src/UI/endgameScreen/endgameScreen.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EndgameScreen: () => (EndgameScreen)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/Events/eventDefinition.ts");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/state.ts");



class EndgameScreen extends HTMLElement {
    connectedCallback() {
        this.startButton.addEventListener("click", ()=>{
            dispatchEvent(new CustomEvent(_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__.GAMEEVENTS.start));
        });
    }
    constructor(){
        super(), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "root", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "cssPath", `${_GAME_state__WEBPACK_IMPORTED_MODULE_1__.GAMESTATE.paths.css}/endgameScreen/style.css`), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "startButton", void 0);
        this.root = this.attachShadow({
            mode: "open"
        });
        this.root.innerHTML = template(this.cssPath);
        this.startButton = this.root.querySelector(".start-button");
        this.classList.add("screen");
        this.classList.add("hide");
    }
}
customElements.define("bl-endgame-screen", EndgameScreen);
function template(cssPath) {
    return `
        <link rel="stylesheet" type="text/css" href="${cssPath}"/>
        <div class="content">
            <h1>END GAME</h1>
            <button class="start-button">S</button>
        </div>
    `;
}


}),
"./src/UI/levelScreen/levelScreen.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LevelScreen: () => (LevelScreen)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/Events/eventDefinition.ts");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/state.ts");



class LevelScreen extends HTMLElement {
    connectedCallback() {
        this.pauseButton.addEventListener("click", ()=>{
            dispatchEvent(new CustomEvent(_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__.GAMEEVENTS.pauseLevel));
        });
        this.stopButton.addEventListener("click", ()=>{
            dispatchEvent(new CustomEvent(_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__.GAMEEVENTS.stopLevel));
        });
    }
    constructor(){
        super(), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "root", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "cssPath", `${_GAME_state__WEBPACK_IMPORTED_MODULE_1__.GAMESTATE.paths.css}/levelScreen/style.css`), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "pauseButton", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "stopButton", void 0);
        this.root = this.attachShadow({
            mode: "open"
        });
        this.root.innerHTML = template(this.cssPath);
        this.pauseButton = this.root.querySelector(".pause-button");
        this.stopButton = this.root.querySelector(".stop-button");
        this.classList.add("screen");
    }
}
customElements.define("bl-level-screen", LevelScreen);
function template(cssPath) {
    return `
        <link rel="stylesheet" type="text/css" href="${cssPath}"/>
        <div class="content">            
            <div class="top-content side"></div>
            <div class="center-content side">
                <div class="center-right-content side">
                    <button class="pause-button">||</button>
                    <button class="stop-button">S</button>
                </div>                
                <div class="center-center-content side"></div>
                <div class="center-left-content side"></div>
            </div>
           <div class="bottom-content side"></div>
        </div>
    `;
}


}),
"./src/UI/levelScreen/levelScreenMobile.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LevelScreenMobile: () => (LevelScreenMobile)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/state.ts");


class LevelScreenMobile extends HTMLElement {
    connectedCallback() {}
    constructor(){
        super(), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "root", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "cssPath", `${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.css}/levelScreen/styleMobile.css`);
        this.root = this.attachShadow({
            mode: "open"
        });
        this.root.innerHTML = template(this.cssPath);
        this.classList.add("screen");
    }
}
customElements.define("bl-level-mobile-screen", LevelScreenMobile);
function template(cssPath) {
    return `
        <link rel="stylesheet" type="text/css" href="${cssPath}"/>
        <div class="content">            
            <div class="top-content side"></div>
            <div class="center-content side">
                <div class="center-right-content side">
                    
                </div>                
                <div class="center-center-content side"></div>
                <div class="center-left-content side"></div>
            </div>
           <div class="bottom-content side"></div>
        </div>
    `;
}


}),
"./src/UI/preloaderScreen/preloaderScreen.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreloaderScreen: () => (PreloaderScreen)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/state.ts");


class PreloaderScreen extends HTMLElement {
    connectedCallback() {
        this.mirrorBlick.style.background = `url(${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.image}/mirror-blick.png)`;
        this.mirrorBlick.style.backgroundPosition = `center`;
        this.mirrorBlick.style.backgroundSize = `200px`;
        this.mirrorBlick.style.backgroundPosition = `5px`;
        this.content.style.background = `url(${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.image}/radar.jpg)`;
        this.content.style.backgroundPosition = `center`;
        this.radarLine.style.background = `url(${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.image}/radar-line.png)`;
        this.radarLine.style.backgroundPosition = `center`;
    }
    update(data) {
        if (this.isPreloadEnded) return;
        this.percent += data.percent;
        this.stage = data.stage;
        if (this.percent >= 100) {
            this.isPreloadEnded = true;
            return;
        }
        this.contentStage.innerText = `${this.stage}`;
        this.contentPercent.innerText = `${this.percent}%`;
    }
    constructor(){
        super(), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "root", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "contentPercent", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "contentStage", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "percent", 10), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "stage", "model"), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "cssPath", `${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.css}/preloaderScreen/style.css`), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "globalElement", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "loaderImage", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "animationPlace", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "loader", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "content", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "radarLine", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "mirrorBlick", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "isPreloadEnded", false);
        this.root = this.attachShadow({
            mode: "open"
        });
        this.root.innerHTML = template(this.cssPath);
        this.contentPercent = this.root.querySelector(".percent");
        this.contentStage = this.root.querySelector(".stage");
        this.animationPlace = this.root.querySelector(".animation-place");
        this.loader = this.root.querySelector(".loader");
        this.content = this.root.querySelector(".content-preload");
        this.radarLine = this.root.querySelector(".radar-line");
        this.mirrorBlick = this.root.querySelector(".mirror-blick");
        //LOADER
        this.loaderImage = new Image(70, 70);
        this.loaderImage.src = `${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.image}/loader.png`;
        this.loaderImage.onload = ()=>{
            this.loaderImage.classList.add("loader-img");
            this.loader.prepend(this.loaderImage);
        };
        this.classList.add("screen");
    }
}
customElements.define(`bl-preloader-screen`, PreloaderScreen);
function template(cssPath) {
    return `
    <link rel="stylesheet" type="text/css" href="${cssPath}"/>
    <div class="border rounded">
    <div class="content-preload rounded">
        <div class="mask rounded"></div>
        <div class="mirror-blick rounded"></div>
        <div class="radar-line rounded"></div>
        <div class="animation-place rounded">
            <div class="loader">
                <div class="particles">
                    <span style="--i:1;"></span>
                    <span style="--i:2;"></span>
                    <span style="--i:3;"></span>
                    <span style="--i:4;"></span>
                    <span style="--i:5;"></span>
                    <span style="--i:6;"></span>
                    <span style="--i:7;"></span>
                    <span style="--i:8;"></span>
                    <span style="--i:9;"></span>
                    <span style="--i:10;"></span>
                </div>
            </div>
        </div>

        
        <span class="percent display">0%</span>
        <span class="stage display">stage</span>
    </div>
    </div>
    `;
}


}),
"./src/UI/resultScreen/resultScreen.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ResultScreen: () => (ResultScreen)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/Events/eventDefinition.ts");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/state.ts");



class ResultScreen extends HTMLElement {
    connectedCallback() {
        this.startButton.addEventListener("click", ()=>{
            dispatchEvent(new CustomEvent(_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_0__.GAMEEVENTS.start));
        });
    }
    constructor(){
        super(), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "root", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "cssPath", `${_GAME_state__WEBPACK_IMPORTED_MODULE_1__.GAMESTATE.paths.css}/resultScreen/style.css`), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "startButton", void 0);
        this.root = this.attachShadow({
            mode: "open"
        });
        this.root.innerHTML = template(this.cssPath);
        this.startButton = this.root.querySelector(".start-button");
        this.classList.add("hide");
        this.classList.add("screen");
    }
}
customElements.define("bl-result-screen", ResultScreen);
function template(cssPath) {
    return `
        <link rel="stylesheet" type="text/css" href="${cssPath}"/>
        <div class="content">
            <h1>RESULT</h1>
            <button class="start-button">S</button>
        </div>
    `;
}


}),
"./src/UI/screenManager/screenManager.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ScreenManager: () => (ScreenManager)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _GAME_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/GAME/types.ts");



class ScreenManager {
    switchState(state) {
        switch(state){
            case _GAME_types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.PRELOAD:
                {
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelResult);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.endGame);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.game);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.level);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelMobile);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.start);
                    this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.preload);
                    break;
                }
            case _GAME_types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.START:
                {
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelResult);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.endGame);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.game);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.level);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelMobile);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.preload);
                    this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.start);
                    break;
                }
            case _GAME_types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.RUN:
                {
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelResult);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.endGame);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.start);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.preload);
                    this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.game);
                    if (!_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.state.isMobile) {
                        this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.level);
                    } else {
                        this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelMobile);
                    }
                    break;
                }
            case _GAME_types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.PAUSE:
                {
                    break;
                }
            case _GAME_types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.LEVELEND:
                {
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.start);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.endGame);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.preload);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.game);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.level);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelMobile);
                    this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelResult);
                    break;
                }
            case _GAME_types__WEBPACK_IMPORTED_MODULE_1__.GAMESTATUS.END:
                {
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.start);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.preload);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.game);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.level);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelMobile);
                    this.hide(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.levelResult);
                    this.show(_GAME_types__WEBPACK_IMPORTED_MODULE_1__.SCREENS.endGame);
                    break;
                }
        }
    }
    getScreen(id) {
        return this.screens.get(id);
    }
    add(id, screen) {
        this.screens.set(id, screen);
        return screen;
    }
    hide(id) {
        this.screens.get(id).classList.add("hide");
    }
    show(id) {
        this.screens.get(id).classList.remove("hide");
    }
    resize() {
        var widthScale = window.innerWidth / this.width;
        if (this.width != window.innerWidth) {
            this.width = innerWidth;
        }
        this.screens.forEach((s)=>{
            s.style.scale = `scale(${widthScale})`;
        });
    }
    //UPDATE FUNCTIONS
    updateLevelScreen(data) {
        console.log("level:", data.title);
    }
    constructor(){
        (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "screens", new Map());
        (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "width", window.innerWidth);
        (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_2__._)(this, "height", window.innerWidth);
    }
}


}),
"./src/UI/screensExport.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EndgameScreen: () => (/* reexport safe */ _endgameScreen_endgameScreen__WEBPACK_IMPORTED_MODULE_5__.EndgameScreen),
  LevelScreen: () => (/* reexport safe */ _levelScreen_levelScreen__WEBPACK_IMPORTED_MODULE_0__.LevelScreen),
  LevelScreenMobile: () => (/* reexport safe */ _levelScreen_levelScreenMobile__WEBPACK_IMPORTED_MODULE_1__.LevelScreenMobile),
  PreloaderScreen: () => (/* reexport safe */ _preloaderScreen_preloaderScreen__WEBPACK_IMPORTED_MODULE_3__.PreloaderScreen),
  ResultScreen: () => (/* reexport safe */ _resultScreen_resultScreen__WEBPACK_IMPORTED_MODULE_4__.ResultScreen),
  StartScreen: () => (/* reexport safe */ _startScreen_startScreen__WEBPACK_IMPORTED_MODULE_2__.StartScreen)
});
/* ESM import */var _levelScreen_levelScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/UI/levelScreen/levelScreen.ts");
/* ESM import */var _levelScreen_levelScreenMobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/UI/levelScreen/levelScreenMobile.ts");
/* ESM import */var _startScreen_startScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/UI/startScreen/startScreen.ts");
/* ESM import */var _preloaderScreen_preloaderScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/UI/preloaderScreen/preloaderScreen.ts");
/* ESM import */var _resultScreen_resultScreen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/UI/resultScreen/resultScreen.ts");
/* ESM import */var _endgameScreen_endgameScreen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/UI/endgameScreen/endgameScreen.ts");









}),
"./src/UI/startScreen/startScreen.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  StartScreen: () => (StartScreen)
});
/* ESM import */var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@swc/helpers/esm/_define_property.js");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/GAME/state.ts");


class StartScreen extends HTMLElement {
    connectedCallback() {
        this.globalElement = document.querySelector("bl-start-screen");
        this.runGameButton.addEventListener("click", ()=>{
            this.runCallback();
        });
    }
    setRunCallback(runCallback) {
        this.runCallback = runCallback;
    }
    update() {}
    updateLanguage() {}
    constructor(){
        super(), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "root", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "cssPath", `${_GAME_state__WEBPACK_IMPORTED_MODULE_0__.GAMESTATE.paths.css}/startScreen/style.css`), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "globalElement", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "runGameButton", void 0), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_1__._)(this, "runCallback", ()=>{});
        this.root = this.attachShadow({
            mode: "open"
        });
        this.root.innerHTML = template(this.cssPath);
        this.runGameButton = this.root.querySelector(".run-game-button");
        this.classList.add("screen");
    }
}
customElements.define("bl-start-screen", StartScreen);
function template(cssPath) {
    return `
    <link rel="stylesheet" type="text/css" href="${cssPath}"/>
    <div class="content">
        <h1>Start Screen</h1>
        <button class="run-game-button"></button>
    </div>
    `;
}


}),
"./src/index.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/index.css");
/* ESM import */var _babylonjs_loaders_glTF_2_0_glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babylonjs/loaders/glTF/2.0/glTFLoader.js");
/* ESM import */var _GAME_init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/GAME/init.ts");
/* ESM import */var _GAME_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/GAME/environment.ts");
/* ESM import */var _GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/GAME/Events/eventDefinition.ts");
/* ESM import */var _GAME_Events_gameEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/GAME/Events/gameEvents.ts");
/* ESM import */var _GAME_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/GAME/state.ts");
/* ESM import */var _GAME_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/GAME/types.ts");
/* ESM import */var _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/UI/screensExport.ts");
/* ESM import */var _GAME_Loaders_loaderModels__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/GAME/Loaders/loaderModels.ts");
/* ESM import */var _GAME_Level_level__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/GAME/Level/level.ts");
/* ESM import */var _testMobileDevice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/testMobileDevice.ts");












var root = document.querySelector("#root");
var canvas = document.createElement('canvas');
canvas.id = "game-canvas";
canvas.classList.add("screen");
_GAME_state__WEBPACK_IMPORTED_MODULE_6__.GAMESTATE.state.canvas = canvas;
_GAME_state__WEBPACK_IMPORTED_MODULE_6__.GAMESTATE.state.isMobile = (0,_testMobileDevice__WEBPACK_IMPORTED_MODULE_11__.testPlatformWithBowser)();
(()=>{
    root.append(_GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.game, canvas), _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.level, new _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__.LevelScreen()), _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.levelMobile, new _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__.LevelScreenMobile()), _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.start, new _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__.StartScreen()), _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.preload, new _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__.PreloaderScreen()), _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.levelResult, new _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__.ResultScreen()), _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.add(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.endGame, new _UI_screensExport__WEBPACK_IMPORTED_MODULE_8__.EndgameScreen()));
})();
(async ()=>{
    var initData = await (0,_GAME_init__WEBPACK_IMPORTED_MODULE_2__.InitGame)(canvas);
    for(let i = 0; i < 1; i += 1){
        await (0,_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_4__.preload)();
    }
    if (initData) {
        var { scene, engine, havok } = initData;
        _GAME_state__WEBPACK_IMPORTED_MODULE_6__.GAMESTATE.state.scene = scene;
        _GAME_state__WEBPACK_IMPORTED_MODULE_6__.GAMESTATE.state.engine = engine;
        if (scene && engine && havok) {
            await (0,_GAME_Loaders_loaderModels__WEBPACK_IMPORTED_MODULE_9__.initAssets)(scene);
            _GAME_state__WEBPACK_IMPORTED_MODULE_6__.screenManager.getScreen(_GAME_types__WEBPACK_IMPORTED_MODULE_7__.SCREENS.start).setRunCallback(()=>{
                dispatchEvent(new CustomEvent(_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_4__.GAMEEVENTS.runGame, {
                    detail: {
                        scene: scene
                    }
                }));
            });
            _GAME_state__WEBPACK_IMPORTED_MODULE_6__.GAMESTATE.level = (0,_GAME_Level_level__WEBPACK_IMPORTED_MODULE_10__.Level)();
            (0,_GAME_environment__WEBPACK_IMPORTED_MODULE_3__.createEnvironment)(scene);
            dispatchEvent(new CustomEvent(_GAME_Events_eventDefinition__WEBPACK_IMPORTED_MODULE_4__.GAMEEVENTS.start, {
                detail: {
                    scene: scene
                }
            }));
        }
    }
})();


}),
"./src/proxiBabylon.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetContainer: () => (/* reexport safe */ _babylonjs_core_assetContainer__WEBPACK_IMPORTED_MODULE_16__.AssetContainer),
  AssetsManager: () => (/* reexport safe */ _babylonjs_core_Misc_assetsManager__WEBPACK_IMPORTED_MODULE_17__.AssetsManager),
  Axis: () => (/* reexport safe */ _babylonjs_core_Maths_math_axis__WEBPACK_IMPORTED_MODULE_19__.Axis),
  Color3: () => (/* reexport safe */ _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_2__.Color3),
  Color4: () => (/* reexport safe */ _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_2__.Color4),
  Constants: () => (/* reexport safe */ _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_27__.Constants),
  CreateBox: () => (/* reexport safe */ _babylonjs_core_Meshes_Builders_boxBuilder__WEBPACK_IMPORTED_MODULE_11__.CreateBox),
  CreateDecal: () => (/* reexport safe */ _babylonjs_core_Meshes_Builders_decalBuilder__WEBPACK_IMPORTED_MODULE_26__.CreateDecal),
  CreateGround: () => (/* reexport safe */ _babylonjs_core_Meshes_Builders_groundBuilder__WEBPACK_IMPORTED_MODULE_8__.CreateGround),
  CreateLines: () => (/* reexport safe */ _babylonjs_core_Meshes_Builders_linesBuilder__WEBPACK_IMPORTED_MODULE_13__.CreateLines),
  CreatePlane: () => (/* reexport safe */ _babylonjs_core_Meshes_Builders_planeBuilder__WEBPACK_IMPORTED_MODULE_9__.CreatePlane),
  CreateSphere: () => (/* reexport safe */ _babylonjs_core_Meshes_Builders_sphereBuilder__WEBPACK_IMPORTED_MODULE_10__.CreateSphere),
  Effect: () => (/* reexport safe */ _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_15__.Effect),
  Engine: () => (/* reexport safe */ _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_1__.Engine),
  HVK: () => (/* reexport module object */ _babylonjs_havok__WEBPACK_IMPORTED_MODULE_22__),
  HavokPlugin: () => (/* reexport safe */ _babylonjs_core_Physics_v2_Plugins_havokPlugin__WEBPACK_IMPORTED_MODULE_23__.HavokPlugin),
  HemisphericLight: () => (/* reexport safe */ _babylonjs_core_Lights_hemisphericLight__WEBPACK_IMPORTED_MODULE_3__.HemisphericLight),
  LoadAssetContainerAsync: () => (/* reexport safe */ _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_18__.LoadAssetContainerAsync),
  Mesh: () => (/* reexport safe */ _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_14__.Mesh),
  ParticleSystem: () => (/* reexport safe */ _babylonjs_core_Particles_particleSystem__WEBPACK_IMPORTED_MODULE_30__.ParticleSystem),
  PhysicsAggregate: () => (/* reexport safe */ _babylonjs_core_Physics_v2_physicsAggregate__WEBPACK_IMPORTED_MODULE_24__.PhysicsAggregate),
  PhysicsMotionType: () => (/* reexport safe */ _babylonjs_core_Physics_v2_IPhysicsEnginePlugin__WEBPACK_IMPORTED_MODULE_25__.PhysicsMotionType),
  PhysicsShapeType: () => (/* reexport safe */ _babylonjs_core_Physics_v2_IPhysicsEnginePlugin__WEBPACK_IMPORTED_MODULE_25__.PhysicsShapeType),
  PhysicsViewer: () => (/* reexport safe */ _babylonjs_core_Debug_physicsViewer__WEBPACK_IMPORTED_MODULE_31__.PhysicsViewer),
  PointerEventTypes: () => (/* reexport safe */ _babylonjs_core_Events_pointerEvents__WEBPACK_IMPORTED_MODULE_4__.PointerEventTypes),
  PointerInfo: () => (/* reexport safe */ _babylonjs_core_Events_pointerEvents__WEBPACK_IMPORTED_MODULE_4__.PointerInfo),
  Quaternion: () => (/* reexport safe */ _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_7__.Quaternion),
  RecastJSPlugin: () => (/* reexport safe */ _babylonjs_core_Navigation_Plugins_recastJSPlugin__WEBPACK_IMPORTED_MODULE_32__.RecastJSPlugin),
  Scene: () => (/* reexport safe */ _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_0__.Scene),
  ShaderMaterial: () => (/* reexport safe */ _babylonjs_core_Materials_shaderMaterial__WEBPACK_IMPORTED_MODULE_12__.ShaderMaterial),
  Space: () => (/* reexport safe */ _babylonjs_core_Maths_math_axis__WEBPACK_IMPORTED_MODULE_19__.Space),
  Sprite: () => (/* reexport safe */ _babylonjs_core_Sprites_sprite__WEBPACK_IMPORTED_MODULE_28__.Sprite),
  SpriteManager: () => (/* reexport safe */ _babylonjs_core_Sprites_spriteManager__WEBPACK_IMPORTED_MODULE_29__.SpriteManager),
  StandardMaterial: () => (/* reexport safe */ _babylonjs_core_Materials_standardMaterial__WEBPACK_IMPORTED_MODULE_5__.StandardMaterial),
  Texture: () => (/* reexport safe */ _babylonjs_core_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_21__.Texture),
  TransformNode: () => (/* reexport safe */ _babylonjs_core_Meshes_transformNode__WEBPACK_IMPORTED_MODULE_20__.TransformNode),
  UniversalCamera: () => (/* reexport safe */ _babylonjs_core_Cameras_universalCamera__WEBPACK_IMPORTED_MODULE_6__.UniversalCamera),
  Vector2: () => (/* reexport safe */ _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_7__.Vector2),
  Vector3: () => (/* reexport safe */ _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_7__.Vector3)
});
/* ESM import */var _babylonjs_core_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babylonjs/core/scene.js");
/* ESM import */var _babylonjs_core_Engines_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babylonjs/core/Engines/engine.js");
/* ESM import */var _babylonjs_core_Maths_math_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babylonjs/core/Maths/math.color.js");
/* ESM import */var _babylonjs_core_Lights_hemisphericLight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babylonjs/core/Lights/hemisphericLight.js");
/* ESM import */var _babylonjs_core_Events_pointerEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babylonjs/core/Events/pointerEvents.js");
/* ESM import */var _babylonjs_core_Materials_standardMaterial__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babylonjs/core/Materials/standardMaterial.js");
/* ESM import */var _babylonjs_core_Cameras_universalCamera__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/@babylonjs/core/Cameras/universalCamera.js");
/* ESM import */var _babylonjs_core_Maths_math_vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/@babylonjs/core/Maths/math.vector.js");
/* ESM import */var _babylonjs_core_Meshes_Builders_groundBuilder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/Builders/groundBuilder.js");
/* ESM import */var _babylonjs_core_Meshes_Builders_planeBuilder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/Builders/planeBuilder.js");
/* ESM import */var _babylonjs_core_Meshes_Builders_sphereBuilder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/Builders/sphereBuilder.js");
/* ESM import */var _babylonjs_core_Meshes_Builders_boxBuilder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/Builders/boxBuilder.js");
/* ESM import */var _babylonjs_core_Materials_shaderMaterial__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/@babylonjs/core/Materials/shaderMaterial.js");
/* ESM import */var _babylonjs_core_Meshes_Builders_linesBuilder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/Builders/linesBuilder.js");
/* ESM import */var _babylonjs_core_Meshes_mesh__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/mesh.js");
/* ESM import */var _babylonjs_core_Materials_effect__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./node_modules/@babylonjs/core/Materials/effect.js");
/* ESM import */var _babylonjs_core_assetContainer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./node_modules/@babylonjs/core/assetContainer.js");
/* ESM import */var _babylonjs_core_Misc_assetsManager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./node_modules/@babylonjs/core/Misc/assetsManager.js");
/* ESM import */var _babylonjs_core_Loading_sceneLoader__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/@babylonjs/core/Loading/sceneLoader.js");
/* ESM import */var _babylonjs_core_Maths_math_axis__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./node_modules/@babylonjs/core/Maths/math.axis.js");
/* ESM import */var _babylonjs_core_Meshes_transformNode__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/transformNode.js");
/* ESM import */var _babylonjs_core_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./node_modules/@babylonjs/core/Materials/Textures/texture.js");
/* ESM import */var _babylonjs_havok__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./node_modules/@babylonjs/havok/lib/esm/HavokPhysics_es.js");
/* ESM import */var _babylonjs_core_Physics_v2_Plugins_havokPlugin__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./node_modules/@babylonjs/core/Physics/v2/Plugins/havokPlugin.js");
/* ESM import */var _babylonjs_core_Physics_v2_physicsAggregate__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./node_modules/@babylonjs/core/Physics/v2/physicsAggregate.js");
/* ESM import */var _babylonjs_core_Physics_v2_IPhysicsEnginePlugin__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./node_modules/@babylonjs/core/Physics/v2/IPhysicsEnginePlugin.js");
/* ESM import */var _babylonjs_core_Meshes_Builders_decalBuilder__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./node_modules/@babylonjs/core/Meshes/Builders/decalBuilder.js");
/* ESM import */var _babylonjs_core_Engines_constants__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./node_modules/@babylonjs/core/Engines/constants.js");
/* ESM import */var _babylonjs_core_Sprites_sprite__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("./node_modules/@babylonjs/core/Sprites/sprite.js");
/* ESM import */var _babylonjs_core_Sprites_spriteManager__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("./node_modules/@babylonjs/core/Sprites/spriteManager.js");
/* ESM import */var _babylonjs_core_Particles_particleSystem__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("./node_modules/@babylonjs/core/Particles/particleSystem.js");
/* ESM import */var _babylonjs_core_Debug_physicsViewer__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("./node_modules/@babylonjs/core/Debug/physicsViewer.js");
/* ESM import */var _babylonjs_core_Navigation_Plugins_recastJSPlugin__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__("./node_modules/@babylonjs/core/Navigation/Plugins/recastJSPlugin.js");








//GEOMETRY







//-----------------------





















}),
"./src/testMobileDevice.ts": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isMobile: () => (isMobile),
  testIfMobile: () => (testIfMobile),
  testPlatformWithBowser: () => (testPlatformWithBowser)
});
/* ESM import */var bowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/bowser/es5.js");
/* ESM import */var bowser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_0__);

function testPlatformWithBowser() {
    const browser = bowser__WEBPACK_IMPORTED_MODULE_0___default().getParser(window.navigator.userAgent);
    return browser.getPlatform().type === "desktop" ? false : true;
}
function testIfMobile() {
    if (navigator.userAgent) {
        return navigator.userAgent;
    }
    // Fallback for older browsers
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}


}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
if (cachedModule.error !== undefined) throw cachedModule.error;
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
id: moduleId,
exports: {}
});
// Execute the module function
try {

var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
module = execOptions.module;
if (!execOptions.factory) {
  console.error("undefined factory", moduleId);
  throw Error("RuntimeError: factory is undefined (" + moduleId + ")");
}
execOptions.factory.call(module.exports, module, module.exports, execOptions.require);

} catch (e) {
module.error = e;
throw e;
}
// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

// expose the module cache
__webpack_require__.c = __webpack_module_cache__;

// expose the module execution interceptor
__webpack_require__.i = [];

/************************************************************************/
// webpack/runtime/compat_get_default_export
(() => {
// getDefaultExport function for compatibility with non-ESM modules
__webpack_require__.n = (module) => {
	var getter = module && module.__esModule ?
		() => (module['default']) :
		() => (module);
	__webpack_require__.d(getter, { a: getter });
	return getter;
};

})();
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/ensure_chunk
(() => {
// The chunk loading function for additional chunks
// Since all referenced chunks are already included
// in this file, this function is empty here.
__webpack_require__.e = () => (Promise.resolve()) 
})();
// webpack/runtime/get mini-css chunk filename
(() => {
// This function allow to reference chunks
__webpack_require__.miniCssF = (chunkId) => {
  // return url for filenames not based on template
  
  // return url for filenames based on template
  return "static/css/" + chunkId + ".css"
}
})();
// webpack/runtime/get_chunk_update_filename
(() => {
__webpack_require__.hu = (chunkId) => ('' + chunkId + '.' + __webpack_require__.h() + '.hot-update.js')
})();
// webpack/runtime/get_full_hash
(() => {
__webpack_require__.h = () => ("7318535231d51489")
})();
// webpack/runtime/get_main_filename/update manifest
(() => {
__webpack_require__.hmrF = function () {
            return "index." + __webpack_require__.h() + ".hot-update.json";
         };
        
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/hot_module_replacement
(() => {
var currentModuleData = {};
var installedModules = __webpack_require__.c;

// module and require creation
var currentChildModule;
var currentParents = [];

// status
var registeredStatusHandlers = [];
var currentStatus = "idle";

// while downloading
var blockingPromises = 0;
var blockingPromisesWaiting = [];

// The update info
var currentUpdateApplyHandlers;
var queuedInvalidatedModules;

__webpack_require__.hmrD = currentModuleData;
__webpack_require__.i.push(function (options) {
	var module = options.module;
	var require = createRequire(options.require, options.id);
	module.hot = createModuleHotObject(options.id, module);
	module.parents = currentParents;
	module.children = [];
	currentParents = [];
	options.require = require;
});

__webpack_require__.hmrC = {};
__webpack_require__.hmrI = {};

function createRequire(require, moduleId) {
	var me = installedModules[moduleId];
	if (!me) return require;
	var fn = function (request) {
		if (me.hot.active) {
			if (installedModules[request]) {
				var parents = installedModules[request].parents;
				if (parents.indexOf(moduleId) === -1) {
					parents.push(moduleId);
				}
			} else {
				currentParents = [moduleId];
				currentChildModule = request;
			}
			if (me.children.indexOf(request) === -1) {
				me.children.push(request);
			}
		} else {
			console.warn(
				"[HMR] unexpected require(" +
				request +
				") from disposed module " +
				moduleId
			);
			currentParents = [];
		}
		return require(request);
	};
	var createPropertyDescriptor = function (name) {
		return {
			configurable: true,
			enumerable: true,
			get: function () {
				return require[name];
			},
			set: function (value) {
				require[name] = value;
			}
		};
	};
	for (var name in require) {
		if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
			Object.defineProperty(fn, name, createPropertyDescriptor(name));
		}
	}

	fn.e = function (chunkId, fetchPriority) {
		return trackBlockingPromise(require.e(chunkId, fetchPriority));
	};

	return fn;
}

function createModuleHotObject(moduleId, me) {
	var _main = currentChildModule !== moduleId;
	var hot = {
		_acceptedDependencies: {},
		_acceptedErrorHandlers: {},
		_declinedDependencies: {},
		_selfAccepted: false,
		_selfDeclined: false,
		_selfInvalidated: false,
		_disposeHandlers: [],
		_main: _main,
		_requireSelf: function () {
			currentParents = me.parents.slice();
			currentChildModule = _main ? undefined : moduleId;
			__webpack_require__(moduleId);
		},
		active: true,
		accept: function (dep, callback, errorHandler) {
			if (dep === undefined) hot._selfAccepted = true;
			else if (typeof dep === "function") hot._selfAccepted = dep;
			else if (typeof dep === "object" && dep !== null) {
				for (var i = 0; i < dep.length; i++) {
					hot._acceptedDependencies[dep[i]] = callback || function () { };
					hot._acceptedErrorHandlers[dep[i]] = errorHandler;
				}
			} else {
				hot._acceptedDependencies[dep] = callback || function () { };
				hot._acceptedErrorHandlers[dep] = errorHandler;
			}
		},
		decline: function (dep) {
			if (dep === undefined) hot._selfDeclined = true;
			else if (typeof dep === "object" && dep !== null)
				for (var i = 0; i < dep.length; i++)
					hot._declinedDependencies[dep[i]] = true;
			else hot._declinedDependencies[dep] = true;
		},
		dispose: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		addDisposeHandler: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		removeDisposeHandler: function (callback) {
			var idx = hot._disposeHandlers.indexOf(callback);
			if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
		},
		invalidate: function () {
			this._selfInvalidated = true;
			switch (currentStatus) {
				case "idle":
					currentUpdateApplyHandlers = [];
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					setStatus("ready");
					break;
				case "ready":
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					break;
				case "prepare":
				case "check":
				case "dispose":
				case "apply":
					(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
						moduleId
					);
					break;
				default:
					break;
			}
		},
		check: hotCheck,
		apply: hotApply,
		status: function (l) {
			if (!l) return currentStatus;
			registeredStatusHandlers.push(l);
		},
		addStatusHandler: function (l) {
			registeredStatusHandlers.push(l);
		},
		removeStatusHandler: function (l) {
			var idx = registeredStatusHandlers.indexOf(l);
			if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
		},
		data: currentModuleData[moduleId]
	};
	currentChildModule = undefined;
	return hot;
}

function setStatus(newStatus) {
	currentStatus = newStatus; 
	var results = [];
	for (var i = 0; i < registeredStatusHandlers.length; i++)
		results[i] = registeredStatusHandlers[i].call(null, newStatus);

	return Promise.all(results).then(function () { });
}

function unblock() {
	if (--blockingPromises === 0) {
		setStatus("ready").then(function () {
			if (blockingPromises === 0) {
				var list = blockingPromisesWaiting;
				blockingPromisesWaiting = [];
				for (var i = 0; i < list.length; i++) {
					list[i]();
				}
			}
		});
	}
}

function trackBlockingPromise(promise) {
	switch (currentStatus) {
		case "ready":
			setStatus("prepare");
		case "prepare":
			blockingPromises++;
			promise.then(unblock, unblock);
			return promise;
		default:
			return promise;
	}
}

function waitForBlockingPromises(fn) {
	if (blockingPromises === 0) return fn();
	return new Promise(function (resolve) {
		blockingPromisesWaiting.push(function () {
			resolve(fn());
		});
	});
}

function hotCheck(applyOnUpdate) {
	if (currentStatus !== "idle") {
		throw new Error("check() is only allowed in idle status");
	} 
	return setStatus("check")
		.then(__webpack_require__.hmrM)
		.then(function (update) {
			if (!update) {
				return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
					function () {
						return null;
					}
				);
			}

			return setStatus("prepare").then(function () {
				var updatedModules = [];
				currentUpdateApplyHandlers = [];

				return Promise.all(
					Object.keys(__webpack_require__.hmrC).reduce(function (
						promises,
						key
					) {
						__webpack_require__.hmrC[key](
							update.c,
							update.r,
							update.m,
							promises,
							currentUpdateApplyHandlers,
							updatedModules
						);
						return promises;
					},
						[])
				).then(function () {
					return waitForBlockingPromises(function () {
						if (applyOnUpdate) {
							return internalApply(applyOnUpdate);
						}
						return setStatus("ready").then(function () {
							return updatedModules;
						});
					});
				});
			});
		});
}

function hotApply(options) {
	if (currentStatus !== "ready") {
		return Promise.resolve().then(function () {
			throw new Error(
				"apply() is only allowed in ready status (state: " + currentStatus + ")"
			);
		});
	}
	return internalApply(options);
}

function internalApply(options) {
	options = options || {};
	applyInvalidatedModules();
	var results = currentUpdateApplyHandlers.map(function (handler) {
		return handler(options);
	});
	currentUpdateApplyHandlers = undefined;
	var errors = results
		.map(function (r) {
			return r.error;
		})
		.filter(Boolean);

	if (errors.length > 0) {
		return setStatus("abort").then(function () {
			throw errors[0];
		});
	}

	var disposePromise = setStatus("dispose");

	results.forEach(function (result) {
		if (result.dispose) result.dispose();
	});

	var applyPromise = setStatus("apply");

	var error;
	var reportError = function (err) {
		if (!error) error = err;
	};

	var outdatedModules = [];
	results.forEach(function (result) {
		if (result.apply) {
			var modules = result.apply(reportError);
			if (modules) {
				for (var i = 0; i < modules.length; i++) {
					outdatedModules.push(modules[i]);
				}
			}
		}
	});

	return Promise.all([disposePromise, applyPromise]).then(function () {
		if (error) {
			return setStatus("fail").then(function () {
				throw error;
			});
		}

		if (queuedInvalidatedModules) {
			return internalApply(options).then(function (list) {
				outdatedModules.forEach(function (moduleId) {
					if (list.indexOf(moduleId) < 0) list.push(moduleId);
				});
				return list;
			});
		}

		return setStatus("idle").then(function () {
			return outdatedModules;
		});
	});
}

function applyInvalidatedModules() {
	if (queuedInvalidatedModules) {
		if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
		Object.keys(__webpack_require__.hmrI).forEach(function (key) {
			queuedInvalidatedModules.forEach(function (moduleId) {
				__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
			});
		});
		queuedInvalidatedModules = undefined;
		return true;
	}
}

})();
// webpack/runtime/load_script
(() => {
var inProgress = {};

var dataWebpackPrefix = "bugFrug:";
// loadScript function to load a script via script tag
__webpack_require__.l = function (url, done, key, chunkId) {
	if (inProgress[url]) {
		inProgress[url].push(done);
		return;
	}
	var script, needAttach;
	if (key !== undefined) {
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
			var s = scripts[i];
			if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
				script = s;
				break;
			}
		}
	}
	if (!script) {
		needAttach = true;
		
    script = document.createElement('script');
    
		script.charset = 'utf-8';
		script.timeout = 120;
		if (__webpack_require__.nc) {
			script.setAttribute("nonce", __webpack_require__.nc);
		}
		script.setAttribute("data-webpack", dataWebpackPrefix + key);
		
		script.src = url;
		
    
	}
	inProgress[url] = [done];
	var onScriptComplete = function (prev, event) {
		script.onerror = script.onload = null;
		clearTimeout(timeout);
		var doneFns = inProgress[url];
		delete inProgress[url];
		script.parentNode && script.parentNode.removeChild(script);
		doneFns &&
			doneFns.forEach(function (fn) {
				return fn(event);
			});
		if (prev) return prev(event);
	};
	var timeout = setTimeout(
		onScriptComplete.bind(null, undefined, {
			type: 'timeout',
			target: script
		}),
		120000
	);
	script.onerror = onScriptComplete.bind(null, script.onerror);
	script.onload = onScriptComplete.bind(null, script.onload);
	needAttach && document.head.appendChild(script);
};

})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
// webpack/runtime/on_chunk_loaded
(() => {
var deferred = [];
__webpack_require__.O = (result, chunkIds, fn, priority) => {
	if (chunkIds) {
		priority = priority || 0;
		for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--)
			deferred[i] = deferred[i - 1];
		deferred[i] = [chunkIds, fn, priority];
		return;
	}
	var notFulfilled = Infinity;
	for (var i = 0; i < deferred.length; i++) {
		var [chunkIds, fn, priority] = deferred[i];
		var fulfilled = true;
		for (var j = 0; j < chunkIds.length; j++) {
			if (
				(priority & (1 === 0) || notFulfilled >= priority) &&
				Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))
			) {
				chunkIds.splice(j--, 1);
			} else {
				fulfilled = false;
				if (priority < notFulfilled) notFulfilled = priority;
			}
		}
		if (fulfilled) {
			deferred.splice(i--, 1);
			var r = fn();
			if (r !== undefined) result = r;
		}
	}
	return result;
};

})();
// webpack/runtime/public_path
(() => {
__webpack_require__.p = "/";
})();
// webpack/runtime/css loading
(() => {
if (typeof document === "undefined") return;
var createStylesheet = function (
	chunkId, fullhref, oldTag, resolve, reject
) {
	var linkTag = document.createElement("link");
	
	linkTag.rel = "stylesheet";
	linkTag.type="text/css";
	if (__webpack_require__.nc) {
		linkTag.nonce = __webpack_require__.nc;
	}
	var onLinkComplete = function (event) {
		// avoid mem leaks.
		linkTag.onerror = linkTag.onload = null;
		if (event.type === 'load') {
			resolve();
		} else {
			var errorType = event && (event.type === 'load' ? 'missing' : event.type);
			var realHref = event && event.target && event.target.href || fullhref;
			var err = new Error("Loading CSS chunk " + chunkId + " failed.\\n(" + realHref + ")");
			err.code = "CSS_CHUNK_LOAD_FAILED";
			err.type = errorType;
			err.request = realHref;
			if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
			reject(err);
		}
	}

	linkTag.onerror = linkTag.onload = onLinkComplete;
	linkTag.href = fullhref;
	
	if (oldTag) {
  oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
} else {
  document.head.appendChild(linkTag);
}
	return linkTag;
}
var findStylesheet = function (href, fullhref) {
	var existingLinkTags = document.getElementsByTagName("link");
	for (var i = 0; i < existingLinkTags.length; i++) {
		var tag = existingLinkTags[i];
		var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
		if (dataHref) {
			dataHref = dataHref.split('?')[0]
		}
		if (tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
	}

	var existingStyleTags = document.getElementsByTagName("style");
	for (var i = 0; i < existingStyleTags.length; i++) {
		var tag = existingStyleTags[i];
		var dataHref = tag.getAttribute("data-href");
		if (dataHref === href || dataHref === fullhref) return tag;
	}
}

var loadStylesheet = function (chunkId) {
	return new Promise(function (resolve, reject) {
		var href = __webpack_require__.miniCssF(chunkId);
		var fullhref = __webpack_require__.p + href;
		if (findStylesheet(href, fullhref)) return resolve();
		createStylesheet(chunkId, fullhref, null, resolve, reject);
	})
}

// no chunk loading
var oldTags = [];
var newTags = [];
var applyHandler = function (options) {
	return {
		dispose: function () {
			for (var i = 0; i < oldTags.length; i++) {
				var oldTag = oldTags[i];
				if (oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
			}
			oldTags.length = 0;
		},
		apply: function () {
			for (var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
			newTags.length = 0;
		}
	}
}
__webpack_require__.hmrC.miniCss = function (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
	applyHandlers.push(applyHandler);
	chunkIds.forEach(function (chunkId) {
		var href = __webpack_require__.miniCssF(chunkId);
		var fullhref = __webpack_require__.p + href;
		var oldTag = findStylesheet(href, fullhref);
		if (!oldTag) return;
		promises.push(new Promise(function (resolve, reject) {
			var tag = createStylesheet(
				chunkId,

				/**
					If dynamically add link tag through dom API and there is already a loaded style link, browsers sometimes treats the new link tag as the same link, and won't fetch the new style.
					Use query to avoid browser cache the link tag, force to re-fetch new style, this is the same strategy as updateCss API, this can happen during lazy compilation
				 */
				`${fullhref}?${Date.now()}`,
				oldTag,
				function () {
					tag.as = "style";
					tag.rel = "preload";
					resolve();
				},
				reject
			);
			oldTags.push(oldTag);
			newTags.push(tag);
		}))
	});
}


})();
// webpack/runtime/jsonp_chunk_loading
(() => {
__webpack_require__.b = document.baseURI || self.location.href;

      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {"index": 0,};
      var currentUpdatedModulesList;
var waitingUpdateResolves = {};
function loadUpdateChunk(chunkId, updatedModulesList) {
	currentUpdatedModulesList = updatedModulesList;
	return new Promise((resolve, reject) => {
		waitingUpdateResolves[chunkId] = resolve;
		// start update chunk loading
		var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
		// create error before stack unwound to get useful stacktrace later
		var error = new Error();
		var loadingEnded = (event) => {
			if (waitingUpdateResolves[chunkId]) {
				waitingUpdateResolves[chunkId] = undefined;
				var errorType =
					event && (event.type === 'load' ? 'missing' : event.type);
				var realSrc = event && event.target && event.target.src;
				error.message =
					'Loading hot update chunk ' +
					chunkId +
					' failed.\n(' +
					errorType +
					': ' +
					realSrc +
					')';
				error.name = 'ChunkLoadError';
				error.type = errorType;
				error.request = realSrc;
				reject(error);
			}
		};
		__webpack_require__.l(url, loadingEnded);
	});
}

self["webpackHotUpdatebugFrug"] = (chunkId, moreModules, runtime) => {
	for (var moduleId in moreModules) {
		if (__webpack_require__.o(moreModules, moduleId)) {
			currentUpdate[moduleId] = moreModules[moduleId];
			if (currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
		}
	}
	if (runtime) currentUpdateRuntime.push(runtime);
	if (waitingUpdateResolves[chunkId]) {
		waitingUpdateResolves[chunkId]();
		waitingUpdateResolves[chunkId] = undefined;
	}
};
var currentUpdateChunks;
var currentUpdate;
var currentUpdateRemovedChunks;
var currentUpdateRuntime;
function applyHandler(options) {
	if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
	currentUpdateChunks = undefined;
	function getAffectedModuleEffects(updateModuleId) {
		var outdatedModules = [updateModuleId];
		var outdatedDependencies = {};
		var queue = outdatedModules.map(function (id) {
			return {
				chain: [id],
				id: id
			};
		});
		while (queue.length > 0) {
			var queueItem = queue.pop();
			var moduleId = queueItem.id;
			var chain = queueItem.chain;
			var module = __webpack_require__.c[moduleId];
			if (
				!module ||
				(module.hot._selfAccepted && !module.hot._selfInvalidated)
			) {
				continue;
			}

			if (module.hot._selfDeclined) {
				return {
					type: "self-declined",
					chain: chain,
					moduleId: moduleId
				};
			}

			if (module.hot._main) {
				return {
					type: "unaccepted",
					chain: chain,
					moduleId: moduleId
				};
			}

			for (var i = 0; i < module.parents.length; i++) {
				var parentId = module.parents[i];
				var parent = __webpack_require__.c[parentId];
				if (!parent) {
					continue;
				}
				if (parent.hot._declinedDependencies[moduleId]) {
					return {
						type: "declined",
						chain: chain.concat([parentId]),
						moduleId: moduleId,
						parentId: parentId
					};
				}
				if (outdatedModules.indexOf(parentId) !== -1) {
					continue;
				}
				if (parent.hot._acceptedDependencies[moduleId]) {
					if (!outdatedDependencies[parentId]) {
						outdatedDependencies[parentId] = [];
					}
					addAllToSet(outdatedDependencies[parentId], [moduleId]);
					continue;
				}
				delete outdatedDependencies[parentId];
				outdatedModules.push(parentId);
				queue.push({
					chain: chain.concat([parentId]),
					id: parentId
				});
			}
		}

		return {
			type: "accepted",
			moduleId: updateModuleId,
			outdatedModules: outdatedModules,
			outdatedDependencies: outdatedDependencies
		};
	}

	function addAllToSet(a, b) {
		for (var i = 0; i < b.length; i++) {
			var item = b[i];
			if (a.indexOf(item) === -1) a.push(item);
		}
	}

	var outdatedDependencies = {};
	var outdatedModules = [];
	var appliedUpdate = {};

	var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
		console.warn(
			"[HMR] unexpected require(" + module.id + ") to disposed module"
		);
	};

	for (var moduleId in currentUpdate) {
		if (__webpack_require__.o(currentUpdate, moduleId)) {
			var newModuleFactory = currentUpdate[moduleId];
			var result = newModuleFactory ? getAffectedModuleEffects(moduleId) : {
				type: "disposed",
				moduleId: moduleId
			};
			var abortError = false;
			var doApply = false;
			var doDispose = false;
			var chainInfo = "";
			if (result.chain) {
				chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
			}
			switch (result.type) {
				case "self-declined":
					if (options.onDeclined) options.onDeclined(result);
					if (!options.ignoreDeclined)
						abortError = new Error(
							"Aborted because of self decline: " + result.moduleId + chainInfo
						);
					break;
				case "declined":
					if (options.onDeclined) options.onDeclined(result);
					if (!options.ignoreDeclined)
						abortError = new Error(
							"Aborted because of declined dependency: " +
							result.moduleId +
							" in " +
							result.parentId +
							chainInfo
						);
					break;
				case "unaccepted":
					if (options.onUnaccepted) options.onUnaccepted(result);
					if (!options.ignoreUnaccepted)
						abortError = new Error(
							"Aborted because " + moduleId + " is not accepted" + chainInfo
						);
					break;
				case "accepted":
					if (options.onAccepted) options.onAccepted(result);
					doApply = true;
					break;
				case "disposed":
					if (options.onDisposed) options.onDisposed(result);
					doDispose = true;
					break;
				default:
					throw new Error("Unexception type " + result.type);
			}
			if (abortError) {
				return {
					error: abortError
				};
			}
			if (doApply) {
				appliedUpdate[moduleId] = newModuleFactory;
				addAllToSet(outdatedModules, result.outdatedModules);
				for (moduleId in result.outdatedDependencies) {
					if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
						if (!outdatedDependencies[moduleId])
							outdatedDependencies[moduleId] = [];
						addAllToSet(
							outdatedDependencies[moduleId],
							result.outdatedDependencies[moduleId]
						);
					}
				}
			}
			if (doDispose) {
				addAllToSet(outdatedModules, [result.moduleId]);
				appliedUpdate[moduleId] = warnUnexpectedRequire;
			}
		}
	}
	currentUpdate = undefined;

	var outdatedSelfAcceptedModules = [];
	for (var j = 0; j < outdatedModules.length; j++) {
		var outdatedModuleId = outdatedModules[j];
		var module = __webpack_require__.c[outdatedModuleId];
		if (
			module &&
			(module.hot._selfAccepted || module.hot._main) &&
			// removed self-accepted modules should not be required
			appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
			// when called invalidate self-accepting is not possible
			!module.hot._selfInvalidated
		) {
			outdatedSelfAcceptedModules.push({
				module: outdatedModuleId,
				require: module.hot._requireSelf,
				errorHandler: module.hot._selfAccepted
			});
		}
	} 

	var moduleOutdatedDependencies;
	return {
		dispose: function () {
			currentUpdateRemovedChunks.forEach(function (chunkId) {
				delete installedChunks[chunkId];
			});
			currentUpdateRemovedChunks = undefined;

			var idx;
			var queue = outdatedModules.slice();
			while (queue.length > 0) {
				var moduleId = queue.pop();
				var module = __webpack_require__.c[moduleId];
				if (!module) continue;

				var data = {};

				// Call dispose handlers
				var disposeHandlers = module.hot._disposeHandlers; 
				for (j = 0; j < disposeHandlers.length; j++) {
					disposeHandlers[j].call(null, data);
				}
				__webpack_require__.hmrD[moduleId] = data;

				module.hot.active = false;

				delete __webpack_require__.c[moduleId];

				delete outdatedDependencies[moduleId];

				for (j = 0; j < module.children.length; j++) {
					var child = __webpack_require__.c[module.children[j]];
					if (!child) continue;
					idx = child.parents.indexOf(moduleId);
					if (idx >= 0) {
						child.parents.splice(idx, 1);
					}
				}
			}

			var dependency;
			for (var outdatedModuleId in outdatedDependencies) {
				if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
					module = __webpack_require__.c[outdatedModuleId];
					if (module) {
						moduleOutdatedDependencies = outdatedDependencies[outdatedModuleId];
						for (j = 0; j < moduleOutdatedDependencies.length; j++) {
							dependency = moduleOutdatedDependencies[j];
							idx = module.children.indexOf(dependency);
							if (idx >= 0) module.children.splice(idx, 1);
						}
					}
				}
			}
		},
		apply: function (reportError) {
			// insert new code
			for (var updateModuleId in appliedUpdate) {
				if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
					__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId]; 
				}
			}

			// run new runtime modules
			for (var i = 0; i < currentUpdateRuntime.length; i++) {
				currentUpdateRuntime[i](__webpack_require__);
			}

			// call accept handlers
			for (var outdatedModuleId in outdatedDependencies) {
				if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
					var module = __webpack_require__.c[outdatedModuleId];
					if (module) {
						moduleOutdatedDependencies = outdatedDependencies[outdatedModuleId];
						var callbacks = [];
						var errorHandlers = [];
						var dependenciesForCallbacks = [];
						for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
							var dependency = moduleOutdatedDependencies[j];
							var acceptCallback = module.hot._acceptedDependencies[dependency];
							var errorHandler = module.hot._acceptedErrorHandlers[dependency];
							if (acceptCallback) {
								if (callbacks.indexOf(acceptCallback) !== -1) continue;
								callbacks.push(acceptCallback);
								errorHandlers.push(errorHandler); 
								dependenciesForCallbacks.push(dependency);
							}
						}
						for (var k = 0; k < callbacks.length; k++) {
							try {
								callbacks[k].call(null, moduleOutdatedDependencies);
							} catch (err) {
								if (typeof errorHandlers[k] === "function") {
									try {
										errorHandlers[k](err, {
											moduleId: outdatedModuleId,
											dependencyId: dependenciesForCallbacks[k]
										});
									} catch (err2) {
										if (options.onErrored) {
											options.onErrored({
												type: "accept-error-handler-errored",
												moduleId: outdatedModuleId,
												dependencyId: dependenciesForCallbacks[k],
												error: err2,
												originalError: err
											});
										}
										if (!options.ignoreErrored) {
											reportError(err2);
											reportError(err);
										}
									}
								} else {
									if (options.onErrored) {
										options.onErrored({
											type: "accept-errored",
											moduleId: outdatedModuleId,
											dependencyId: dependenciesForCallbacks[k],
											error: err
										});
									}
									if (!options.ignoreErrored) {
										reportError(err);
									}
								}
							}
						}
					}
				}
			}

			// Load self accepted modules
			for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
				var item = outdatedSelfAcceptedModules[o];
				var moduleId = item.module;
				try {
					item.require(moduleId);
				} catch (err) {
					if (typeof item.errorHandler === "function") {
						try {
							item.errorHandler(err, {
								moduleId: moduleId,
								module: __webpack_require__.c[moduleId]
							});
						} catch (err1) {
							if (options.onErrored) {
								options.onErrored({
									type: "self-accept-error-handler-errored",
									moduleId: moduleId,
									error: err1,
									originalError: err
								});
							}
							if (!options.ignoreErrored) {
								reportError(err1);
								reportError(err);
							}
						}
					} else {
						if (options.onErrored) {
							options.onErrored({
								type: "self-accept-errored",
								moduleId: moduleId,
								error: err
							});
						}
						if (!options.ignoreErrored) {
							reportError(err);
						}
					}
				}
			}

			return outdatedModules;
		}
	};
}

__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
	if (!currentUpdate) {
		currentUpdate = {};
		currentUpdateRuntime = [];
		currentUpdateRemovedChunks = [];
		applyHandlers.push(applyHandler);
	}
	if (!__webpack_require__.o(currentUpdate, moduleId)) {
		currentUpdate[moduleId] = __webpack_require__.m[moduleId];
	}
};

__webpack_require__.hmrC.jsonp = function (
	chunkIds,
	removedChunks,
	removedModules,
	promises,
	applyHandlers,
	updatedModulesList
) {
	applyHandlers.push(applyHandler);
	currentUpdateChunks = {};
	currentUpdateRemovedChunks = removedChunks;
	currentUpdate = removedModules.reduce(function (obj, key) {
		obj[key] = false;
		return obj;
	}, {});
	currentUpdateRuntime = [];
	chunkIds.forEach(function (chunkId) {
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId] !== undefined
		) {
			promises.push(loadUpdateChunk(chunkId, updatedModulesList));
			currentUpdateChunks[chunkId] = true;
		} else {
			currentUpdateChunks[chunkId] = false;
		}
	});
	if (__webpack_require__.f) {
		__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
			if (
				currentUpdateChunks &&
				__webpack_require__.o(currentUpdateChunks, chunkId) &&
				!currentUpdateChunks[chunkId]
			) {
				promises.push(loadUpdateChunk(chunkId));
				currentUpdateChunks[chunkId] = true;
			}
		};
	}
};
__webpack_require__.hmrM = () => {
	if (typeof fetch === "undefined")
		throw new Error("No browser support: need fetch API");
	return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(
		(response) => {
			if (response.status === 404) return; // no update available
			if (!response.ok)
				throw new Error(
					"Failed to fetch update manifest " + response.statusText
				);
			return response.json();
		}
	);
};
__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
// install a JSONP callback for chunk loading
var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
	var [chunkIds, moreModules, runtime] = data;
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId, chunkId, i = 0;
	if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
		for (moduleId in moreModules) {
			if (__webpack_require__.o(moreModules, moduleId)) {
				__webpack_require__.m[moduleId] = moreModules[moduleId];
			}
		}
		if (runtime) var result = runtime(__webpack_require__);
	}
	if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
	for (; i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId]
		) {
			installedChunks[chunkId][0]();
		}
		installedChunks[chunkId] = 0;
	}
	return __webpack_require__.O(result);
};

var chunkLoadingGlobal = self["webpackChunkbugFrug"] = self["webpackChunkbugFrug"] || [];
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));

})();
/************************************************************************/
// module cache are used so entry inlining is disabled
// startup
// Load entry module and return exports
var __webpack_exports__ = __webpack_require__.O(undefined, ["babylon", "vendors-node_modules_rspack_core_dist_cssExtractHmr_js-node_modules_bowser_es5_js-node_module-927db1"], function() { return __webpack_require__("./src/index.ts") });
__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})()
;
//# sourceMappingURL=index.js.map