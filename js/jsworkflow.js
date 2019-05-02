(function(zyb) {
    var flow = {};
    flow.config = {
        editable: true, //流程幕布是否可编辑，默认为true。false时不可删除，不可拖动，但是可以点击查看属性
        lineHeight: 15,
        basePath: "", //流程图文件夹相对路径前缀，这个路径对幕布上的节点图片有效，工具集路径为写死在flow.html文件夹
        width: 1.5, //幕布宽度为页面宽度的几倍。不设置属性时默认为1，5
        height: 1.5, //幕布高度为页面高度的几倍。不设置属性时默认为1，5
        restore: '', //初始化流程json串
        restoretype: 'json', //前台初始化类型，json、url
        node: { //全局节点属性设置
            attr: {
                x: 10,
                y: 10,
                width: 100,
                height: 50,
                r: 10, //边框四角弧度
                fill: '#F6F7FF', //节点背景色
                stroke: '#03689A', //边框颜色
                "stroke-width": 2 //边框宽度
            },
            showType: "text",
            // showType: "image&text",
            name: { "font-style": "italic" },
            text: { "font-size": 13 },
            margin: 5,
            props: [],
            img: {}
        },
        path: { //连接线属性设置
            attr: {
                path: { path: "M10 10L100 100", stroke: "#808080", fill: "none", "stroke-width": 2 },
                arrow: {
                    path: "M10 10L10 10",
                    stroke: "#000000",
                    fill: "#000000",
                    // "stroke-width": 2,
                    radius: 5 //箭头大小
                },
                fromDot: { width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 2 },
                toDot: { width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 2 },
                bigDot: { width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 2 },
                smallDot: { width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 2 }
            },
            text: { text: "连接", cursor: "move", "font-size": 13, background: "#ffffff" },
            textPos: { x: 0, y: -10 },
            props: {
                /*text: {
                    name: "text", label: "显示", value: "a", editor: function () {
                        return new flow.editors.textEditor()
                    }
                },*/
                type: {
                    name: 'linetype',
                    label: '类型',
                    value: 'joint',
                    editor: function() {
                        return new $.jsworkflow.editors.selectEditor([
                            { 'name': '连接', 'value': 'joint' },
                            { 'name': '是', 'value': 'yes' },
                            { 'name': '否', 'value': 'no' }
                        ]);
                    }
                }
            }
        },
        tools: {
            attr: { left: 10, top: 10 },
            pointer: {},
            path: {},
            nodes: {
                //配置节点属性
                'start': {
                    type: 'start',
                    node: { //节点属性设置
                        attr: {
                            x: 10,
                            y: 10,
                            width: 50,
                            height: 50,
                            r: 30, //边框四角弧度
                            // fill: '#F6F7FF', //节点背景色
                            fill: '#00FF00', //节点背景色
                            stroke: '#00FF00', //边框颜色
                            stroke: '#000000', //边框颜色
                            "stroke-width": 2 //边框宽度
                        },
                        // showType: "image&text",
                        showType: "text",
                        name: { "font-style": "italic" },
                        text: { "font-size": 13 },
                        margin: 5,
                        props: [],
                        img: {}
                    },
                    name: { text: '<<start>>' },
                    text: { text: '开始' },
                    img: { src: 'image/start_event_empty.png', width: 55, height: 55 },
                    props: {
                        text: {
                            name: 'text',
                            label: '节点名称',
                            value: '开始',
                            editor: function() {
                                return new $.jsworkflow.editors.textEditor();
                            }
                        }
                    }
                },
                'end': {
                    type: 'end',
                    node: { //节点属性设置
                        attr: {
                            x: 10,
                            y: 10,
                            width: 50,
                            height: 50,
                            r: 30, //边框四角弧度
                            fill: '#FF0000', //节点背景色
                            stroke: '#FF0000', //边框颜色
                            stroke: '#000000', //边框颜色
                            "stroke-width": 2 //边框宽度
                        },
                        // showType: "image&text",
                        showType: "text",
                        name: { "font-style": "italic" },
                        text: { "font-size": 13 },
                        margin: 5,
                        props: [],
                        img: {}
                    },
                    name: { text: '<<end>>' },
                    text: { text: '结束' },
                    img: { src: 'image/end_event_terminate.png', width: 55, height: 55 },
                    props: {
                        text: {
                            name: 'text',
                            label: '节点名称',
                            value: '结束',
                            editor: function() {
                                return new $.jsworkflow.editors.textEditor();
                            }
                        }
                    }
                },
                'judge': {
                    type: 'judge',
                    node: { //节点属性设置
                        attr: {
                            x: 10,
                            y: 10,
                            width: 55,
                            height: 55,
                            r: 0, //边框四角弧度
                            fill: '#FFFF99', //节点背景色
                            // fill: '#F6F7FF', //节点背景色
                            stroke: '#FFFF99', //边框颜色
                            stroke: '#000000', //边框颜色
                            "stroke-width": 2 //边框宽度
                        },
                        // showType: "image&text",
                        showType: "text",
                        name: { "font-style": "italic" },
                        text: { "font-size": 13 },
                        margin: 5,
                        props: [],
                        img: {}
                    },
                    name: { text: '<<judge>>' },
                    text: { text: '判断' },
                    img: { src: 'image/gateway_parallel.png', width: 55, height: 55 },
                    props: {
                        text: {
                            name: 'text',
                            label: '节点名称',
                            value: '判断',
                            editor: function() {
                                return new $.jsworkflow.editors.textEditor();
                            }
                        },
                        type: {
                            name: 'judgetype',
                            label: '节点类型',
                            value: 'nojoint',
                            editor: function() {
                                return new $.jsworkflow.editors.selectEditor([
                                    { 'name': '非联合审批', 'value': 'nojoint' },
                                    { 'name': '联合审批', 'value': 'joint' }
                                ]);
                            }
                        }
                    }
                },
                'task': {
                    type: 'task',
                    node: { //节点属性设置
                        attr: {
                            x: 10,
                            y: 10,
                            width: 80,
                            height: 50,
                            r: 0, //边框四角弧度
                            fill: '#00FFFF', //节点背景色
                            stroke: '#00FFFF', //边框颜色
                            stroke: '#000000', //边框颜色
                            "stroke-width": 2 //边框宽度
                        },
                        // showType: "image&text",
                        showType: "text",
                        name: { "font-style": "italic" },
                        text: { "font-size": 13 },
                        margin: 5,
                        props: [],
                        img: {}
                    },
                    name: { text: '<<task>>' },
                    text: { text: '任务' },
                    img: { src: 'image/task_empty.png', width: 85, height: 55 },
                    props: {
                        text: {
                            name: 'text',
                            label: '节点名称',
                            value: '任务',
                            editor: function() {
                                return new $.jsworkflow.editors.textEditor();
                            }
                        }
                    }
                }
            }
        },
        props: {
            attr: { top: 10, right: 10 },
            props: {
                name: {
                    name: 'name',
                    label: '名称',
                    value: '新建流程',
                    editor: function() {
                        return new $.jsworkflow.editors.inputEditor();
                    }
                },
                desc: {
                    name: 'desc',
                    label: '描述',
                    value: '',
                    editor: function() {
                        return new $.jsworkflow.editors.textareaEditor();
                    }
                }
            }
        }
    };
    flow.util = {
        isLine: function(g, f, e) {
            var d, c;
            if ((g.x - e.x) == 0) {
                d = 1
            } else {
                d = (g.y - e.y) / (g.x - e.x)
            }
            c = (f.x - e.x) * d + e.y;
            if ((f.y - c) < 10 && (f.y - c) > -10) {
                f.y = c;
                return true
            }
            return false
        },
        center: function(d, c) {
            return { x: (d.x - c.x) / 2 + c.x, y: (d.y - c.y) / 2 + c.y }
        },
        nextId: (function() {
            var c = 0;
            return function() {
                return ++c
            }
        })(),
        connPoint: function(j, d) {
            var c = d,
                e = { x: j.x + j.width / 2, y: j.y + j.height / 2 };
            var l = (e.y - c.y) / (e.x - c.x);
            l = isNaN(l) ? 0 : l;
            var k = j.height / j.width;
            var h = c.y < e.y ? -1 : 1,
                f = c.x < e.x ? -1 : 1,
                g, i;
            if (Math.abs(l) > k && h == -1) {
                g = e.y - j.height / 2;
                i = e.x + h * j.height / 2 / l
            } else {
                if (Math.abs(l) > k && h == 1) {
                    g = e.y + j.height / 2;
                    i = e.x + h * j.height / 2 / l
                } else {
                    if (Math.abs(l) < k && f == -1) {
                        g = e.y + f * j.width / 2 * l;
                        i = e.x - j.width / 2
                    } else {
                        if (Math.abs(l) < k && f == 1) {
                            g = e.y + j.width / 2 * l;
                            i = e.x + j.width / 2
                        }
                    }
                }
            }
            return { x: parseInt(i), y: parseInt(g) }
        },
        arrow: function(l, k, d) {
            var g = Math.atan2(l.y - k.y, k.x - l.x) * (180 / Math.PI);
            var h = k.x - d * Math.cos(g * (Math.PI / 180));
            var f = k.y + d * Math.sin(g * (Math.PI / 180));
            var e = h + d * Math.cos((g + 120) * (Math.PI / 180));
            var j = f - d * Math.sin((g + 120) * (Math.PI / 180));
            var c = h + d * Math.cos((g + 240) * (Math.PI / 180));
            var i = f - d * Math.sin((g + 240) * (Math.PI / 180));
            return [k, { x: e, y: j }, { x: c, y: i }]
        }
    };
    flow.node = function(p, m) {
        var u = this,
            g = "node" + flow.util.nextId(),
            E = zyb.extend(true, {}, flow.config.node, p),
            C = m,
            t, e, n, f, x, v;
        //如果各个节点有node配置，则使用节点配置，否则使用全局配置
        if (typeof(p.node) != "undefined") {
            E = zyb.extend(true, {}, p.node, p);
        }
        var s, i = {},
            h = 5,
            q = {
                x: E.attr.x - E.margin,
                y: E.attr.y - E.margin,
                width: E.attr.width + E.margin * 2,
                height: E.attr.height + E.margin * 2
            };
        s = C.path("M0 0L1 1").hide();
        //开始和结束节点使用圆形
        if (p.type == 'start' || p.type == 'end') {
            t = C.circle(E.attr.x + E.attr.r - 5, E.attr.y + E.attr.r - 5, E.attr.r).hide().attr(E.attr);
        } else if (p.type == 'judge') {
            E.attr.transform = 'R45';
            t = C.rect(E.attr.x, E.attr.y, E.attr.width, E.attr.height, E.attr.r).hide().attr(E.attr);
        } else {
            t = C.rect(E.attr.x, E.attr.y, E.attr.width, E.attr.height, E.attr.r).hide().attr(E.attr);
        }
        if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
            e = C.image(flow.config.basePath + E.img.src, E.attr.x + E.img.width / 2, E.attr.y + (E.attr.height - E.img.height) / 2, E.img.width, E.img.height).hide();
        } else {
            E.img.width = 0;
            E.img.height = 0;
        }
        n = C.text(E.attr.x + E.img.width + (E.attr.width - E.img.width) / 2, E.attr.y + flow.config.lineHeight / 2, E.name.text).hide().attr(E.name);
        f = C.text(E.attr.x + E.img.width + (E.attr.width - E.img.width) / 2, E.attr.y + (E.attr.height - flow.config.lineHeight) / 2 + flow.config.lineHeight, E.text.text).hide().attr(E.text);
        t.drag(function(dx, dy, cx, cy) {
            E.attr.cx = cx;
            E.attr.cy = cy;
            A(dx, dy);
        }, function() {
            z()
        }, function() {
            l()
        });
        if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
            e.drag(function(dx, dy, cx, cy) {
                E.attr.cx = cx;
                E.attr.cy = cy;
                A(dx, dy);
            }, function() {
                z()
            }, function() {
                l()
            });
        }
        n.drag(function(dx, dy, cx, cy) {
            E.attr.cx = cx;
            E.attr.cy = cy;
            A(dx, dy);
        }, function() {
            z()
        }, function() {
            l()
        });
        f.drag(function(dx, dy, cx, cy) {
            E.attr.cx = cx;
            E.attr.cy = cy;
            A(dx, dy);
        }, function() {
            z()
        }, function() {
            l()
        });
        //拖动位置计算
        var A = function(F, r) {
            if (!flow.config.editable) {
                return
            }
            // console.log(x + '--' + v);
            // console.log(F + '--' + r);
            var o = (x + F);
            var G = (v + r);
            q.x = o - E.margin;
            q.y = G - E.margin;
            B()
        };
        //拖动时特效
        var z = function() {
            x = t.attr("x");
            v = t.attr("y");
            t.attr({ opacity: 0.5 });
            if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
                e.attr({ opacity: 0.5 });
            }
            f.attr({ opacity: 0.5 })
        };
        //拖动后特效恢复
        var l = function() {
            t.attr({ opacity: 1 });
            if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
                e.attr({ opacity: 1 });
            }
            f.attr({ opacity: 1 });
        };


        //节点的连接点

        /*   //上中
           i.t = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "s-resize"}).hide();
           //左中
           i.l = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "w-resize"}).hide();
           //下中
           i.b = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "s-resize"}).hide();
           //右中
           i.r = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "w-resize"}).hide();
   */
        //上中
        i.t = C.rect(0, 0, h, h).attr({ fill: "#000", stroke: "#fff", cursor: "s-resize" }).hide().drag(function(r, o) {
            D(r, o, "t")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "t")
        }, function() {});
        //左上
        i.lt = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "nw-resize"
        }).hide().drag(function(r, o) {
            D(r, o, "lt")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "lt")
        }, function() {});
        //左中
        i.l = C.rect(0, 0, h, h).attr({ fill: "#000", stroke: "#fff", cursor: "w-resize" }).hide().drag(function(r, o) {
            D(r, o, "l")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "l")
        }, function() {});
        //左下
        i.lb = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "sw-resize"
        }).hide().drag(function(r, o) {
            D(r, o, "lb")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "lb")
        }, function() {});
        //下中
        i.b = C.rect(0, 0, h, h).attr({ fill: "#000", stroke: "#fff", cursor: "s-resize" }).hide().drag(function(r, o) {
            D(r, o, "b")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "b")
        }, function() {});
        //下右
        i.rb = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "se-resize"
        }).hide().drag(function(r, o) {
            D(r, o, "rb")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "rb")
        }, function() {});
        //右中
        i.r = C.rect(0, 0, h, h).attr({ fill: "#000", stroke: "#fff", cursor: "w-resize" }).hide().drag(function(r, o) {
            D(r, o, "r")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "r")
        }, function() {});
        //右上
        i.rt = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "ne-resize"
        }).hide().drag(function(r, o) {
            D(r, o, "rt")
        }, function() {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "rt")
        }, function() {});
        var D = function(F, r, G) {
            var o = _bx + F,
                H = _by + r;
            switch (G) {
                case "t":
                    q.height += q.y - H;
                    q.y = H;
                    break;
                case "lt":
                    q.width += q.x - o;
                    q.height += q.y - H;
                    q.x = o;
                    q.y = H;
                    break;
                case "l":
                    q.width += q.x - o;
                    q.x = o;
                    break;
                case "lb":
                    q.height = H - q.y;
                    q.width += q.x - o;
                    q.x = o;
                    break;
                case "b":
                    q.height = H - q.y;
                    break;
                case "rb":
                    q.height = H - q.y;
                    q.width = o - q.x;
                    break;
                case "r":
                    q.width = o - q.x;
                    break;
                case "rt":
                    q.width = o - q.x;
                    q.height += q.y - H;
                    q.y = H;
                    break
            }
            B()
        };
        var k = function(r, o, F) {
            _bx = r;
            _by = o
        };
        // zyb([t.node, f.node, e.node]).bind("click", function () {
        var nodes = {};
        if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
            nodes = [t.node, f.node, n.node, e.node];
        } else {
            nodes = [t.node, f.node, n.node];
        }
        zyb(nodes).bind("click", function() {
            //节点点击监控
            /*if (!flow.config.editable) {
                return
            }*/
            w();
            var o = zyb(C).data("mod");
            switch (o) {
                case "pointer":
                    break;
                case "path":
                    var r = zyb(C).data("currNode");
                    if (r && r.getId() != g && r.getId().substring(0, 4) == "node") {
                        zyb(C).trigger("addpath", [r, u])
                    }
                    break;
            }
            zyb(C).trigger("click", u);
            zyb(C).data("currNode", u);
            return false
        });
        //点击节点显示属性
        var j = function(o, r) {
            //节点点击监控
            if (r.getId() == g) {
                zyb(C).trigger("showprops", [E.props, r])
            } else {
                d()
            }
        };
        zyb(C).bind("click", j);
        var c = function(o, F, r) {
            if (r.getId() == g) {
                f.attr({ text: F })
            }
        };
        zyb(C).bind("textchange", c);

        //节点外框pathstring
        function y() {
            return "M" + q.x + " " + q.y + "L" + q.x + " " + (q.y + q.height) + "L" + (q.x + q.width) + " " + (q.y + q.height) + "L" + (q.x + q.width) + " " + q.y + "L" + q.x + " " + q.y
        }

        //节点边框线和连接点显示
        function w() {
            s.show();
            for (var o in i) {
                i[o].show()
            }
        }

        //节点边框线和连接点隐藏
        function d() {
            s.hide();
            for (var o in i) {
                i[o].hide()
            }
        }

        function B() {
            // console.log(E)
            if (typeof(E.attr.cx) != 'undefined' && (p.type == 'start' || p.type == 'end')) {
                q.x = E.attr.cx - E.attr.r;
                q.y = E.attr.cy - E.attr.r;
            }
            var F = q.x + E.margin,
                r = q.y + E.margin,
                G = q.width - E.margin * 2,
                o = q.height - E.margin * 2;
            //给圆形节点添加cx、cy属性
            if (typeof(E.attr.cx) != 'undefined') {
                //给棱形节点添加transform = 'R45'属性
                if (p.type == 'judge') {
                    t.attr({ x: F, y: r, cx: E.attr.cx, cy: E.attr.cy, width: G, height: o, transform: 'R45' });
                    //节点图形外部边框
                    // s.attr({path: y(), transform: 'R45'});
                } else {
                    t.attr({ x: F, y: r, cx: E.attr.cx, cy: E.attr.cy, width: G, height: o });
                    // s.attr({path: y()});
                }
            } else {
                if (p.type == 'judge') {
                    t.attr({ x: F, y: r, width: G, height: o, transform: 'R45' });
                    // s.attr({path: y(), transform: 'R45'});
                } else {
                    t.attr({ x: F, y: r, width: G, height: o });
                    // s.attr({path: y()});
                }
            }

            switch (E.showType) {
                case "image":
                    if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
                        e.attr({ x: F, y: r }).show();
                        // e.attr({x: F + (G - E.img.width) / 2, y: r + (o - E.img.height) / 2}).show();
                    }
                    break;
                case "text":
                    t.show();
                    f.attr({ x: F + G / 2, y: r + o / 2 }).show();
                    break;
                case "image&text":
                    t.show();
                    n.attr({ x: F + E.img.width / 2, y: r + flow.config.lineHeight / 2 }).show();
                    f.attr({
                        x: F + E.img.width / 2,
                        y: r + (o - flow.config.lineHeight) / 2 + flow.config.lineHeight
                    }).show();
                    if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
                        e.attr({ x: F, y: r }).show();
                        // e.attr({x: F + E.img.width / 2, y: r + (o - E.img.height) / 2}).show();
                    }
                    break;
            }
            // 图形外框节点
            /*  i.t.attr({x: q.x + q.width / 2 - h / 2, y: q.y - h / 2});
              i.lt.attr({x: q.x - h / 2, y: q.y - h / 2});
              i.l.attr({x: q.x - h / 2, y: q.y - h / 2 + q.height / 2});
              i.lb.attr({x: q.x - h / 2, y: q.y - h / 2 + q.height});
              i.b.attr({x: q.x - h / 2 + q.width / 2, y: q.y - h / 2 + q.height});
              i.rb.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2 + q.height});
              i.r.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2 + q.height / 2});
              i.rt.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2});
  */
            if (p.type == 'judge') {
                i.t.attr({ x: q.x + q.width / 2 - h / 2, y: q.y - h / 2 - h });
                // i.lt.attr({x: q.x - h / 2, y: q.y - h / 2});
                i.l.attr({ x: q.x - h / 2 - h, y: q.y - h / 2 + q.height / 2 });
                // i.lb.attr({x: q.x - h / 2, y: q.y - h / 2 + q.height});
                i.b.attr({ x: q.x - h / 2 + q.width / 2, y: q.y - h / 2 + q.height + h });
                // i.rb.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2 + q.height});
                i.r.attr({ x: q.x - h / 2 + q.width + h, y: q.y - h / 2 + q.height / 2 });
                // i.rt.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2});
            } else {
                i.t.attr({ x: q.x + q.width / 2 - h / 2, y: q.y - h / 2 });
                // i.lt.attr({x: q.x - h / 2, y: q.y - h / 2});
                i.l.attr({ x: q.x - h / 2, y: q.y - h / 2 + q.height / 2 });
                // i.lb.attr({x: q.x - h / 2, y: q.y - h / 2 + q.height});
                i.b.attr({ x: q.x - h / 2 + q.width / 2, y: q.y - h / 2 + q.height });
                // i.rb.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2 + q.height});
                i.r.attr({ x: q.x - h / 2 + q.width, y: q.y - h / 2 + q.height / 2 });
                // i.rt.attr({x: q.x - h / 2 + q.width, y: q.y - h / 2});
            }
            zyb(C).trigger("noderesize", u)
        }

        //nodes节点部分拼写
        this.toJson = function() {
            var r = '{"type":"' + E.type + '","text":{"text":"' + f.attr("text") + '"},"attr":{"x":' + Math.round(t.attr("x")) + ',"y":' + Math.round(t.attr("y")) + ',"width":' + Math.round(t.attr("width")) + ',"height":' + Math.round(t.attr("height")) + ',"r":' + Math.round(t.attr("r")) + '},"props":{';
            for (var o in E.props) {
                r += '"' + o + '":{"value":"' + E.props[o].value + '"},';
            }
            if (r.substring(r.length - 1, r.length) == ",") {
                r = r.substring(0, r.length - 1)
            }
            r += "}}";
            return r
        };
        this.restore = function(o) {
            var r = o;
            E = zyb.extend(true, E, o);
            f.attr({ text: r.text.text });
            B()

        };
        this.getBBox = function() {
            return q
        };
        this.getId = function() {
            return g
        };
        this.remove = function() {
            t.remove();
            f.remove();
            n.remove();
            if (typeof(p.img) != "undefined" && typeof(p.img.src) != "undefined") {
                e.remove();
            }
            s.remove();
            for (var o in i) {
                i[o].remove()
            }
        };
        this.text = function() {
            return f.attr("text")
        };
        this.attr = function(o) {
            if (o) {
                t.attr(o)
            }
        };
        B()
    };
    flow.path = function(q, n, u, e) {
        var v = this,
            z = n,
            B = zyb.extend(true, {}, flow.config.path),
            i, t, f, h = B.textPos,
            y, w, k = u,
            s = e,
            g = "path" + flow.util.nextId(),
            x;
        var st_node = eval('(' + k.toJson() + ')');
        var ed_node = eval('(' + s.toJson() + ')');

        function p(G, H, D, L) {
            var F = this,
                M = G,
                r, o = D,
                O = L,
                K, I, N = H;
            switch (M) {
                case "from":
                    r = z.rect(H.x - B.attr.fromDot.width / 2, H.y - B.attr.fromDot.height / 2, B.attr.fromDot.width, B.attr.fromDot.height).attr(B.attr.fromDot);
                    break;
                case "big":
                    r = z.rect(H.x - B.attr.bigDot.width / 2, H.y - B.attr.bigDot.height / 2, B.attr.bigDot.width, B.attr.bigDot.height).attr(B.attr.bigDot);
                    break;
                case "small":
                    r = z.rect(H.x - B.attr.smallDot.width / 2, H.y - B.attr.smallDot.height / 2, B.attr.smallDot.width, B.attr.smallDot.height).attr(B.attr.smallDot);
                    break;
                case "to":
                    r = z.rect(H.x - B.attr.toDot.width / 2, H.y - B.attr.toDot.height / 2, B.attr.toDot.width, B.attr.toDot.height).attr(B.attr.toDot);
                    break
            }
            if (r && (M == "big" || M == "small")) {
                r.drag(function(Q, P) {
                    C(Q, P)
                }, function() {
                    J()
                }, function() {
                    E()
                });
                var C = function(R, Q) {
                    var P = (K + R),
                        S = (I + Q);
                    F.moveTo(P, S)
                };
                var J = function() {
                    if (M == "big") {
                        K = r.attr("x") + B.attr.bigDot.width / 2;
                        I = r.attr("y") + B.attr.bigDot.height / 2
                    }
                    if (M == "small") {
                        K = r.attr("x") + B.attr.smallDot.width / 2;
                        I = r.attr("y") + B.attr.smallDot.height / 2
                    }
                };
                var E = function() {}
            }
            this.type = function(P) {
                if (P) {
                    M = P
                } else {
                    return M
                }
            };
            this.node = function(P) {
                if (P) {
                    r = P
                } else {
                    return r
                }
            };
            this.left = function(P) {
                if (P) {
                    o = P
                } else {
                    return o
                }
            };
            this.right = function(P) {
                if (P) {
                    O = P
                } else {
                    return O
                }
            };
            this.remove = function() {
                o = null;
                O = null;
                r.remove()
            };
            this.pos = function(P) {
                if (P) {
                    N = P;
                    if (!isNaN(N.x)) {
                        r.attr({ x: N.x - r.attr("width") / 2, y: N.y - r.attr("height") / 2 });
                    }
                    return this
                } else {
                    return N
                }
            };
            this.moveTo = function(Q, T) {
                this.pos({ x: Q, y: T });
                switch (M) {
                    case "from":
                        if (O && O.right() && O.right().type() == "to") {
                            if (ed_node.type != 'judge' && ed_node.type != 'start' && ed_node.type != 'end') {
                                O.right().pos(flow.util.connPoint(s.getBBox(), N))
                            }
                        }
                        if (O && O.right()) {
                            O.pos(flow.util.center(N, O.right().pos()))
                        }
                        break;
                    case "big":
                        if (O && O.right() && O.right().type() == "to") {
                            var stpos = flow.util.connPoint(s.getBBox(), N);
                            if (ed_node.type == 'start') {
                                stpos.y = stpos.y - 5;
                            }
                            O.right().pos(stpos)
                        }
                        if (o && o.left() && o.left().type() == "from") {
                            var stpos = flow.util.connPoint(k.getBBox(), N);
                            if (st_node.type == 'judge') {
                                stpos.y = stpos.y - 10;
                            }
                            o.left().pos(stpos)
                        }
                        if (O && O.right()) {
                            O.pos(flow.util.center(N, O.right().pos()))
                        }
                        if (o && o.left()) {
                            o.pos(flow.util.center(N, o.left().pos()))
                        }
                        var S = { x: N.x, y: N.y };
                        if (flow.util.isLine(o.left().pos(), S, O.right().pos())) {
                            M = "small";
                            r.attr(B.attr.smallDot);
                            this.pos(S);
                            var P = o;
                            o.left().right(o.right());
                            o = o.left();
                            P.remove();
                            var R = O;
                            O.right().left(O.left());
                            O = O.right();
                            R.remove()
                        }
                        break;
                    case "small":
                        if (o && O && !flow.util.isLine(o.pos(), { x: N.x, y: N.y }, O.pos())) {
                            M = "big";
                            r.attr(B.attr.bigDot);
                            var P = new p("small", flow.util.center(o.pos(), N), o, o.right());
                            o.right(P);
                            o = P;
                            var R = new p("small", flow.util.center(O.pos(), N), O.left(), O);
                            O.left(R);
                            O = R
                        }
                        break;
                    case "to":
                        if (o && o.left() && o.left().type() == "from") {
                            if (st_node.type != 'judge' && st_node.type != 'start') {
                                o.left().pos(flow.util.connPoint(k.getBBox(), N))
                            }
                        }
                        if (o && o.left()) {
                            o.pos(flow.util.center(N, o.left().pos()))
                        }
                        break
                }
                m()
            }
        }

        function j() {
            var D, C, E = k.getBBox(),
                F = s.getBBox(),
                r, o;
            r = flow.util.connPoint(E, { x: F.x + F.width / 2, y: F.y + F.height / 2 });
            o = flow.util.connPoint(F, r);
            var st_r = { x: r.x, y: r.y };
            var st_o = { x: o.x, y: o.y };
            if (st_node.type == 'judge') { //发出节点为判断节点
                st_r.x = r.x + 10;
            }
            if (ed_node.type == 'judge') {
                st_o.x = o.x - 10;
            }
            if (st_node.type == 'start') {
                st_r.x = r.x + 5;
            }
            if (ed_node.type == 'start') {
                st_o.x = o.x - 5;
            }
            if (ed_node.type == 'end') {
                st_o.x = o.x - 5;
            }
            D = new p("from", st_r, null, new p("small", { x: (st_r.x + st_o.x) / 2, y: (st_r.y + st_o.y) / 2 }));
            D.right().left(D);
            C = new p("to", st_o, D.right(), null);
            D.right().right(C);
            this.toPathString = function() {
                if (!D) {
                    return ""
                }
                var J = D,
                    I = "M" + J.pos().x + " " + J.pos().y,
                    H = "";
                while (J.right()) {
                    J = J.right();
                    I += "L" + J.pos().x + " " + J.pos().y
                }
                var G = flow.util.arrow(J.left().pos(), J.pos(), B.attr.arrow.radius);
                H = "M" + G[0].x + " " + G[0].y + "L" + G[1].x + " " + G[1].y + "L" + G[2].x + " " + G[2].y + "z";

                return [I, H]
            };
            //dots数组内x、y坐标拼写
            this.toJson = function() {
                var G = "[",
                    H = D;
                while (H) {
                    if (H.type() == "big") {
                        G += "{x:" + Math.round(H.pos().x) + ",y:" + Math.round(H.pos().y) + "},"
                    }
                    H = H.right()
                }
                if (G.substring(G.length - 1, G.length) == ",") {
                    G = G.substring(0, G.length - 1)
                }
                G += "]";
                return G
            };
            this.restore = function(H) {
                var I = eval(H),
                    J = D.right();
                //在此遍历dots
                for (var G = 0; G < I.length; G++) {
                    J.moveTo(I[G].x, I[G].y);
                    J.moveTo(I[G].x, I[G].y);
                    J = J.right()
                }
                this.hide()
            };
            this.fromDot = function() {
                return D
            };
            this.toDot = function() {
                return C
            };
            this.midDot = function() {
                var H = D.right(),
                    G = D.right().right();
                while (G.right() && G.right().right()) {
                    G = G.right().right();
                    H = H.right()
                }
                return H
            };
            this.show = function() {
                var G = D;
                while (G) {
                    G.node().show();
                    G = G.right()
                }
            };
            this.hide = function() {
                var G = D;
                while (G) {
                    G.node().hide();
                    G = G.right()
                }
            };
            this.remove = function() {
                var G = D;
                while (G) {
                    if (G.right()) {
                        G = G.right();
                        G.left().remove()
                    } else {
                        G.remove();
                        G = null
                    }
                }
            }
        }

        B = zyb.extend(true, B, q);
        i = z.path(B.attr.path.path).attr(B.attr.path);
        t = z.path(B.attr.arrow.path).attr(B.attr.arrow);
        x = new j();
        x.hide();
        f = z.text(0, 0, B.text.text).attr(B.text).attr({ text: B.text.text.replace("{from}", k.text()).replace("{to}", s.text()) });
        //禁用连接线文字拖动
        /*f.drag(function (r, o) {
            /!* if (!flow.config.editable) {
                 return
             }*!/
            f.attr({x: y + r, y: w + o})
        }, function () {
            y = f.attr("x");
            w = f.attr("y")
        }, function () {
            var o = x.midDot().pos();
            h = {x: f.attr("x") - o.x, y: f.attr("y") - o.y}
        });*/

        m();
        //线点击事件
        zyb([i.node, t.node]).bind("click", function() {
            zyb(z).trigger("click", v);
            zyb(z).data("currNode", v);
            return false
        });
        var l = function(r, C) {
            //线点击监控
            if (C && C.getId() == g) {
                x.show();
                zyb(z).trigger("showprops", [B.props, v])
            } else {
                x.hide()
            }
            var o = zyb(z).data("mod");
            switch (o) {
                case "pointer":
                    break;
                case "path":
                    break
            }
        };
        zyb(z).bind("click", l);
        var A = function(o, r) {
            if (r && (r.getId() == k.getId() || r.getId() == s.getId())) {
                zyb(z).trigger("removepath", v)
            }
        };
        zyb(z).bind("removenode", A);
        var d = function(C, D) {
            if (k && k.getId() == D.getId()) {
                var o, st_st;
                if (x.fromDot().right().right().type() == "to") {
                    st_st = 1;
                    o = { x: s.getBBox().x + s.getBBox().width / 2, y: s.getBBox().y + s.getBBox().height / 2 }
                } else {
                    st_st = 2;
                    o = x.fromDot().right().right().pos()
                }
                var r = flow.util.connPoint(k.getBBox(), o);
                if (st_node.type == 'start') {
                    x.fromDot().moveTo(r.x + 5, r.y);
                } else if (st_node.type == 'judge') {
                    if (st_st == 1) {
                        x.fromDot().moveTo(r.x + 10, r.y);
                    } else {
                        x.fromDot().moveTo(r.x, r.y - 10);
                    }
                } else {
                    x.fromDot().moveTo(r.x, r.y);
                }
                m()
            }
            if (s && s.getId() == D.getId()) {
                var o;
                if (x.toDot().left().left().type() == "from") {
                    o = { x: k.getBBox().x + k.getBBox().width / 2, y: k.getBBox().y + k.getBBox().height / 2 }
                } else {
                    o = x.toDot().left().left().pos()
                }
                var r = flow.util.connPoint(s.getBBox(), o);
                if (ed_node.type == 'start') {
                    x.toDot().moveTo(r.x, r.y - 5);
                } else if (ed_node.type == 'end') {
                    x.toDot().moveTo(r.x - 5, r.y);
                } else if (ed_node.type == 'judge') {
                    x.toDot().moveTo(r.x - 10, r.y);
                } else {
                    x.toDot().moveTo(r.x, r.y);
                }
                m()
            }
        };
        zyb(z).bind("noderesize", d);
        var c = function(r, o, C) {
            if (C.getId() == g) {
                f.attr({ text: o })
            }
        };
        zyb(z).bind("textchange", c);
        this.from = function() {
            return k
        };
        this.to = function() {
            return s
        };
        //paths连接线部分拼写
        this.toJson = function() {
            var r = '{"from":"' + k.getId() + '","to":"' + s.getId() + '","dots":"' + x.toJson() + '","text":{"text":"' + f.attr("text") + '"},"textPos":{"x":' + Math.round(h.x) + ',"y":' + Math.round(h.y) + '},"props":{';
            for (var o in B.props) {
                r += '"' + o + '":{"value":"' + B.props[o].value + '"},'
            }
            if (r.substring(r.length - 1, r.length) == ",") {
                r = r.substring(0, r.length - 1)
            }
            r += "}}";
            return r
        };
        this.restore = function(o) {
            var r = o;
            B = zyb.extend(true, B, o);
            x.restore(r.dots)
        };
        this.remove = function() {
            x.remove();
            i.remove();
            t.remove();
            f.remove();
            try {
                zyb(z).unbind("click", l)
            } catch (o) {}
            try {
                zyb(z).unbind("removenode", A)
            } catch (o) {}
            try {
                zyb(z).unbind("noderesize", d)
            } catch (o) {}
            try {
                zyb(z).unbind("textchange", c)
            } catch (o) {}
        };

        function m() {
            var r = x.toPathString(),
                o = x.midDot().pos();
            if (r[0].indexOf("NaN") == -1 || r[1].indexOf("NaN") == -1) {
                i.attr({ path: r[0] });
                t.attr({ path: r[1] });
                f.attr({ x: o.x + h.x, y: o.y + h.y });
            }
        }

        this.getId = function() {
            return g
        };
        this.text = function() {
            return f.attr("text")
        };
        this.attr = function(o) {
            if (o && o.path) {
                i.attr(o.path)
            }
            if (o && o.arrow) {
                t.attr(o.arrow)
            }
        };
        //连接线连接完毕后，定为到选择按钮，避免乱点节点，多次连接
        $("#pointer").click();
    };
    flow.props = function(h, f) {
        var j = this,
            // c = zyb("#jsworkflow_props").draggable({handle: "#jsworkflow_props_handle"}).resizable().css(flow.config.props.attr).bind("click", function () {
            //去掉默认加载属性框隐藏
            c = zyb("#jsworkflow_props").hide().draggable({ handle: "#jsworkflow_props_handle" }).resizable().css(flow.config.props.attr).bind("click", function() {
                return false
            }),
            e = c.find("table"),
            g = f,
            i;
        var d = function(n, m, o) {
            if (i && i.getId() == o.getId()) {
                return
            }
            i = o;
            zyb(e).find(".editor").each(function() {
                var k = zyb(this).data("editor");
                if (k) {
                    k.destroy()
                }
            });
            e.empty();
            c.show();
            for (var l in m) {
                e.append("<tr><th>" + m[l].label + '</th><td><div id="p' + l + '" class="editor"></div></td></tr>');
                if (m[l].editor) {
                    m[l].editor().init(m, l, "p" + l, o, g)
                }
            }
        };
        zyb(g).bind("showprops", d)
    };
    flow.editors = {
        textEditor: function() {
            var d, e, c, g, f;
            this.init = function(i, h, m, l, j) {
                d = i;
                e = h;
                c = m;
                g = l;
                f = j;
                zyb('<input  style="width:100%;"/>').val(g.text()).change(function() {
                    i[e].value = zyb(this).val();
                    zyb(f).trigger("textchange", [zyb(this).val(), g])
                }).appendTo("#" + c);
                zyb("#" + c).data("editor", this)
            };
            this.destroy = function() {
                zyb("#" + c + " input").each(function() {
                    d[e].value = zyb(this).val();
                    zyb(f).trigger("textchange", [zyb(this).val(), g])
                })
            }
        },
        inputEditor: function() {
            var _props, _k, _div, _src, _r;
            this.init = function(props, k, div, src, r) {
                _props = props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;

                $('<input style="width:100%;"/>').val(props[_k].value).change(function() {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _div);

                $('#' + _div).data('editor', this);
            }
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            }
        },
        selectEditor: function(arg) {
            //下拉框
            var _props, _k, _div, _src, _r;
            this.init = function(props, k, div, src, r) {
                _props = props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                var sle = $('<select  style="width:100%;"/>').val(props[_k].value).change(function() {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _div);
                if (typeof arg === 'string') {
                    $.ajax({
                        type: "GET",
                        url: arg,
                        success: function(data) {
                            var opts = eval(data);
                            if (opts && opts.length) {
                                for (var idx = 0; idx < opts.length; idx++) {
                                    sle.append('<option value="' + opts[idx].value + '">' + opts[idx].name + '</option>');
                                }
                                sle.val(_props[_k].value);
                            }
                        }
                    });
                } else {
                    for (var idx = 0; idx < arg.length; idx++) {
                        sle.append('<option value="' + arg[idx].value + '">' + arg[idx].name + '</option>');
                    }
                    sle.val(_props[_k].value);
                }
                $('#' + _div).data('editor', this);
            };
            this.destroy = function() {
                $('#' + _div + ' select').each(function() {
                    _props[_k].value = $(this).val();
                    //连接线文字赋值显示
                    if (_props[_k].name == 'linetype') {
                        var val = $(this).val();
                        if (val == 'joint') {
                            val = '连接';
                        } else if (val == 'no') {
                            val = '否';
                        } else if (val == 'yes') {
                            val = '是';
                        } else {
                            val = '';
                        }
                        zyb(_r).trigger("textchange", [val, _src])
                    }
                });
            };
        },
        textareaEditor: function() {
            var _props, _k, _div, _src, _r;
            this.init = function(props, k, div, src, r) {
                _props = props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                $('<textarea rows="4" style="width:98%;"/>').val(props[_k].value).change(function() {
                    props[_k].value = $(this).val();
                }).appendTo('#' + _div);

                $('#' + _div).data('editor', this);
            }
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            }
        }
    };
    flow.init = function(x, r) {
        zyb.extend(true, flow.config, r);
        var v = zyb(window).width(),
            e = zyb(window).height(),
            //用 Raphael 方法创建一块画布
            y = Raphael(x, v * flow.config.width, e * flow.config.height),
            q = {},
            g = {};
        //工具集拖动
        zyb("#jsworkflow_tools").draggable({ handle: "#jsworkflow_tools_handle" }).css(flow.config.tools.attr);
        zyb("#jsworkflow_tools .node").hover(function() {
            zyb(this).addClass("mover");
        }, function() {
            zyb(this).removeClass("mover");
        });
        zyb("#jsworkflow_tools .selectable").click(function() {
            zyb(".selected").removeClass("selected");
            zyb(this).addClass("selected");
            zyb(y).data("mod", this.id);
        });
        zyb("#jsworkflow_tools .state").each(function() {
            zyb(this).draggable({ helper: "clone" })
        });
        //节点拖动
        zyb(x).droppable({
            accept: ".state",
            drop: function(c, i) {
                zyb(y).trigger("addnode", [i.helper.attr("type"), {
                    attr: {
                        x: i.helper.offset().left,
                        y: i.helper.offset().top
                    }
                }])
            }
        });
        zyb(document).keydown(function(i) {
            if (!flow.config.editable) {
                return
            }
            //删除键盘监控事件 backspace/8 delete/46
            if (i.keyCode == 46) {
                var j = zyb(y).data("currNode");
                if (j) {
                    if (j.getId().substring(0, 4) == "node") {
                        zyb(y).trigger("removenode", j)
                    } else {
                        if (j.getId().substring(0, 4) == "path") {
                            zyb(y).trigger("removepath", j)
                        }
                    }
                    zyb(y).removeData("currNode")
                }
            }
        });
        zyb(document).click(function() {
            zyb(y).data("currNode", null);
            zyb(y).trigger("click", {
                getId: function() {
                    return "00000000"
                }
            });
            zyb(y).trigger("showprops", [flow.config.props.props, {
                getId: function() {
                    return "00000000"
                }
            }])
        });
        var w = function(c, i) {
            /* if (!flow.config.editable) {
                 return
             }*/
            if (i.getId().substring(0, 4) == "node") {
                q[i.getId()] = null;
                i.remove()
            } else {
                if (i.getId().substring(0, 4) == "path") {
                    g[i.getId()] = null;
                    i.remove()
                }
            }
        };
        zyb(y).bind("removepath", w);
        zyb(y).bind("removenode", w);
        zyb(y).bind("addnode", function(j, c, k) {
            var i = new flow.node(zyb.extend(true, {}, flow.config.tools.nodes[c], k), y);
            q[i.getId()] = i;
        });
        var f = function(i, k, j) {
            var pathbool = true;
            var gg = {};
            var kjson = eval('(' + k.toJson() + ')');
            var jjson = eval('(' + j.toJson() + ')');
            if (kjson.type == 'end') {
                alert("结束节点不能发出连接");
                pathbool = false;
            }
            if ((kjson.type == 'start' && jjson.type == 'end')) {
                alert("开始节点不能直接连接到结束节点");
                pathbool = false;
            }
            var c = new flow.path({}, y, k, j);

            var cc = eval('(' + c.toJson() + ')');
            //判断2个节点之间不能相互连接
            for (var obj in g) {
                if (g[obj] != null) {
                    var gs = eval('(' + g[obj].toJson() + ')');
                    gg[obj] = g[obj];
                    // console.log(gs)
                    if ((gs['from'] == cc['to'] && gs['to'] == cc['from']) || (gs['from'] == cc['from'] && gs['to'] == cc['to'])) {
                        alert("2个节点之间不能相互或重复连接");
                        pathbool = false;
                        continue;
                    }
                }
            }
            if (pathbool) {
                g[c.getId()] = c;
                gg[c.getId()] = c;
                var kjson = eval('(' + k.toJson() + ')');
                var jjson = eval('(' + j.toJson() + ')');
                //长距离节点折线，节点之间距离超过350则使用折线
                if (kjson.attr.x - jjson.attr.x > 350 || kjson.attr.x - jjson.attr.x < -350) {
                    var zhe = eval('(' + c.toJson() + ')');
                    //设置折线随机高度
                    var Range = kjson.attr.y / 2 - 30;
                    var Rand = Math.random();
                    var num = 30 + Math.round(Rand * Range);
                    zhe.dots = "[{x:" + (kjson.attr.x + kjson.attr.width / 2) + ",y:" + num + "},{x:" + (jjson.attr.x + jjson.attr.width / 2) + ",y:" + num + "}]";
                    c.restore(zhe);
                }
            } else {
                zyb(y).trigger("removepath", c);
            }
            g = gg;
        };
        zyb(y).bind("addpath", f);
        zyb(y).data("mod", "point");
        //保存及结果验证
        zyb("#jsworkflow_save").click(function() {
            if (!flow.config.editable) {
                return
            }
            var i = '{"nodes":{';
            var start = false;
            var istart = 0;
            var startID, endID, taskID;
            var end = false;
            var iend = 0;
            var judge = false;
            var task = false;
            var jiedian = {};
            var jiedianstart = {};
            var jiedianend = {};
            var jiediantask = {};
            var jiedianjudge = {};
            for (var c in q) {
                if (q[c] != null) {
                    var jd = q[c].toJson();
                    jd = eval('(' + q[c].toJson() + ')');
                    //判断是否包含下列节点
                    if (jd['type'] == "start") {
                        start = true;
                        istart++;
                        startID = q[c].getId();
                        // jiedianstart[q[c].getId()] = jd['props']['text']['value'];
                        jiedianstart[q[c].getId()] = jd['props']['text']['value'];
                    }
                    if (jd['type'] == "end") {
                        end = true;
                        iend++;
                        endID = q[c].getId();
                        jiedianend[q[c].getId()] = jd['props']['text']['value'];
                    }
                    if (jd['type'] == "judge") {
                        judge = true;
                        jiedianjudge[q[c].getId()] = jd['props']['text']['value'];
                    }
                    if (jd['type'] == "task") {
                        task = true;
                        taskID = q[c].getId();
                        jiediantask[q[c].getId()] = jd['props']['text']['value'];
                    }
                    i += '"' + q[c].getId() + '":' + q[c].toJson() + ',';
                }
            }
            if (!start) {
                alert("流程必须要有开始节点");
                return;
            }
            if (istart > 1) {
                alert("流程只能有一个开始节点");
                return;
            }
            if (!end) {
                alert("流程必须要有结束节点");
                return;
            }
            if (iend > 1) {
                alert("流程只能有一个结束节点");
                return;
            }
            if (!task) {
                alert("流程必须要有任务节点");
                return;
            }
            // console.log(jiediantask[obj]);
            var jiediantask2 = jiediantask;
            for (var obj in jiediantask) {
                for (var obj2 in jiediantask2) {
                    if (obj != obj2 && jiediantask[obj] == jiediantask2[obj2]) {
                        alert("多个任务节点名称重复，请修改。");
                        return;
                    }
                }
            }
            var jiedianjudge2 = jiedianjudge;
            for (var obj in jiedianjudge) {
                for (var obj2 in jiedianjudge2) {
                    if (obj != obj2 && jiedianjudge[obj] == jiedianjudge2[obj2]) {
                        alert("多个判断节点名称重复，请修改。");
                        return;
                    }
                }
            }
            jiedian['start'] = jiedianstart;
            jiedian['end'] = jiedianend;
            jiedian['task'] = jiediantask;
            jiedian['judge'] = jiedianjudge;
            if (i.substring(i.length - 1, i.length) == ",") {
                i = i.substring(0, i.length - 1)
            }
            i += '},"paths":{';
            var startpath = 0;
            var endpath = 0;
            var judgepath = 0;
            // console.log(jiedian);
            var judgepath2 = {};
            for (var c in g) {
                if (g[c] != null) {
                    var jdx = g[c].toJson();
                    jdx = eval('(' + jdx + ')');
                    // console.log(jdx);
                    //必须有【是】或【否】属性连接线指向结束节点
                    if (typeof(jiedian['end'][jdx['to']]) != "undefined" && (jdx['props']['type']['value'] == "yes" || jdx['props']['type']['value'] == "no")) {
                        endpath++;
                    }
                    //开始节点发出的连接
                    if (typeof(jiedian['start'][jdx['from']]) != "undefined") {
                        startpath++;
                        if (jdx['props']['type']['value'] != "joint") {
                            alert("开始节点发出的连接线必须是【连接】类型");
                            return;
                        }
                    }
                    //任务节点发出的连接
                    if (typeof(jiedian['task'][jdx['from']]) != "undefined") {
                        startpath++;
                        if (jdx['props']['type']['value'] != "joint") {
                            alert("任务节点发出的连接线必须是【连接】类型");
                            return;
                        }
                    }
                    //必须有连接线指向判断节点
                    if (typeof(jiedian['judge'][jdx['to']]) != "undefined") {
                        judgepath++;
                    }
                    //判断节点发出连接验证
                    if (typeof(jiedian['judge'][jdx['from']]) != "undefined") {
                        if (jdx['props']['type']['value'] == "joint") {
                            alert("判断节点发出的连接线必须是【是】或【否】");
                            return;
                        }
                        //判断节点发出连接不能相同
                        if (jdx['props']['type']['value'] == "yes") {
                            if (typeof(judgepath2[jdx['from']]) == "undefined") {
                                judgepath2[jdx['from']] = 'yes';
                            } else {
                                judgepath2[jdx['from']] = judgepath2[jdx['from']] + 'yes';
                            }
                        }
                        //判断节点发出连接不能相同
                        if (jdx['props']['type']['value'] == "no") {
                            if (typeof(judgepath2[jdx['from']]) == "undefined") {
                                judgepath2[jdx['from']] = 'no';
                            } else {
                                judgepath2[jdx['from']] = judgepath2[jdx['from']] + 'no';
                            }
                        }
                    }
                    i += '"' + g[c].getId() + '":' + g[c].toJson() + ',';
                }
            }
            if (startpath == 0) {
                alert("必须有从开始节点发出的连接");
                return;
            }
            if (judgepath == 0) {
                alert("必须有连接接线指向判断节点");
                return;
            }
            if (endpath == 0) {
                alert("必须有【是】或【否】属性连接线指向结束节点");
                return;
            }
            for (var obj1 in jiedian['judge']) {
                var jiedianpathstr1 = true,
                    jiedianpathstr2 = true;
                if (judgepath2[obj1] == 'yesyes' || judgepath2[obj1] == 'nono') {
                    alert("同一个判断节点发出的连接线不能相同");
                    return;
                }
                var judgepath3 = 0;
                //判断节点是否有发出或进入连接线
                for (var c in g) {
                    if (g[c] != null) {
                        var jdx = g[c].toJson();
                        jdx = eval('(' + jdx + ')');
                        if (jdx['from'] == obj1) {
                            jiedianpathstr1 = false;
                            judgepath3++;
                        }
                        if (jdx['to'] == obj1) {
                            jiedianpathstr2 = false;
                        }
                    }
                }
                if (judgepath3 > 2) {
                    alert("判断节点【" + jiedian['judge'][obj1] + "】最多能发出2条连接线");
                    return;
                }
                if (jiedianpathstr1) {
                    alert("节点【" + jiedian['judge'][obj1] + "】没有连接发出节点");
                    return;
                }
                if (jiedianpathstr2) {
                    alert("节点【" + jiedian['judge'][obj1] + "】没有连接进入节点");
                    return;
                }
            }
            //任务节点是否有发出或进入连接线
            for (var obj1 in jiedian['task']) {
                var jiedianpathstr1 = true,
                    jiedianpathstr2 = true;
                for (var c in g) {
                    if (g[c] != null) {
                        var jdx = g[c].toJson();
                        jdx = eval('(' + jdx + ')');
                        if (jdx['from'] == obj1) {
                            jiedianpathstr1 = false;
                        }
                        if (jdx['to'] == obj1) {
                            jiedianpathstr2 = false;
                        }
                    }
                }
                if (jiedianpathstr1 || jiedianpathstr2) {
                    alert("节点【" + jiedian['task'][obj1] + "】没有连接发出或进入节点");
                    return;
                }
            }
            //结束节点只能有进入的连接线
            for (var obj1 in jiedian['end']) {
                var jiedianpathstr1 = false;
                for (var c in g) {
                    if (g[c] != null) {
                        var jdx = g[c].toJson();
                        jdx = eval('(' + jdx + ')');
                        if (jdx['from'] == obj1) {
                            jiedianpathstr1 = true;
                        }
                    }
                }
                if (jiedianpathstr1) {
                    alert("结束节点只能有进入连接线");
                    return;
                }
            }

            if (i.substring(i.length - 1, i.length) == ",") {
                i = i.substring(0, i.length - 1)
            }
            i += '},"props":{"props":{';
            for (var c in flow.config.props.props) {
                if (c == 'name') {
                    if (flow.config.props.props[c].value.length <= 0) {
                        alert("流程名称不能为空");
                        return;
                    }
                }
                if (flow.config.props.props[c].value.indexOf("\"") != -1) {
                    alert("流程名称或描述不能包含双引号");
                    return;
                }
                i += '"' + c + '":{"value":"' + flow.config.props.props[c].value + '"},';
            }
            if (i.substring(i.length - 1, i.length) == ",") {
                i = i.substring(0, i.length - 1)
            }
            i += "}}}";
            flow.config.tools.save.onclick(i)
        });
        new flow.props({}, y);
        // 流程加载处理
        if (r.restore) {
            var z = {};
            var flow_json = eval('(' + r.restore + ')');
            //流程名称描述
            if (flow_json.props) {
                flow.config.props.props.name.value = flow_json.props['props'].name.value;
                flow.config.props.props.desc.value = flow_json.props['props'].desc.value;
            }
            reload(flow_json)
        }

        /**
         * 根据json数据加载流程
         * @param B 流程json数据
         */
        function reload(B) {
            //节点处理
            if (B.nodes) {
                for (var s in B.nodes) {
                    var d = new flow.node(zyb.extend(true, {}, flow.config.tools.nodes[B.nodes[s].type], B.nodes[s]), y);
                    d.restore(B.nodes[s]);
                    z[s] = d;
                    q[d.getId()] = d
                }
            }
            //连接线处理
            if (B.paths) {
                for (var s in B.paths) {
                    var n = new flow.path(zyb.extend(true, {}, flow.config.tools.path, B.paths[s]), y, z[B.paths[s].from], z[B.paths[s].to]);
                    n.restore(B.paths[s]);
                    g[n.getId()] = n
                }
            }
        }
    };
    zyb.jsworkflow = flow;
    zyb.fn.jsworkflow = function(c) {
        return this.each(function() {
            flow.init(this, c);
            // this.click();//默认点击，获取流程标题、描述等
            $("#pointer").click(); //定为按钮到"选择"
            fixDiv('jsworkflow_tools', 10);
            fixDiv('jsworkflow_props', 10);
            document.body.scrollTop = 1;
        });
    };

    /*
    滚动条滑动，位置不变的DIV层
    div_id：DIV的ID属性值，必填参数
    offsetTop：滚动条滑动时DIV层距顶部的高度，可选参数
    */
    function fixDiv(div_id, offsetTop) {
        var Obj = $('#' + div_id);
        if (Obj.length != 1) {
            return false;
        }
        offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top;
        // var isIE = /msie/.test(navigator.userAgent.toLowerCase()) && !$.support.leadingWhitespace;
        var isIE = $.browser.msie && $.browser.version == '6.0';
        if (isIE) {
            $(window).scroll(function() {
                if ($(window).scrollTop() <= ObjTop) {
                    Obj.css({
                        'position': 'relative',
                        'top': 0
                    });
                } else {
                    Obj.css({
                        'position': 'absolute',
                        'top': $(window).scrollTop() + offsetTop + 'px',
                        'z-index': 1
                    });
                }
            });
        } else {
            $(window).scroll(function() {
                if (div_id == 'jsworkflow_tools') {
                    Obj.css({
                        'position': 'fixed',
                        'top': 0 + offsetTop + 'px',
                        'left': '10px',
                        'z-index': 1
                    });
                } else if (div_id == 'jsworkflow_props') {
                    Obj.css({
                        'position': 'fixed',
                        'top': 0 + offsetTop + 'px',
                        'left': ($(window).width() - 270) + 'px',
                        'z-index': 1
                    });
                } else {
                    Obj.css({
                        'position': 'fixed',
                        'top': 0 + offsetTop + 'px',
                        'z-index': 1
                    });
                }
            });
        }
    }
})(jQuery);