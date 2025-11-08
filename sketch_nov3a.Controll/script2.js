document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const langSwitcher = document.getElementById('language-switcher');
    const connectBluetoothBtn = document.getElementById('connect-bluetooth-btn');
    const disconnectBluetoothBtn = document.getElementById('disconnect-bluetooth-btn');
    const connectionState = document.getElementById('connection-state');

    // --- 1. Language Data Structure ---
    const translations = {
        en: {
            title: "Robot Arm Control Hub",
            nav_video: "Video Tool",
            nav_control: "Control Tool",
            nav_connect: "Connect",
            hero_title: "Precision Robotics Control",
            hero_subtitle: "Real-time Command and Visualization in 3D",
            sec_connect_title: "Connection Manager 📡",
            sec_connect_desc: "Establish a secure connection to the robot arm via Web Bluetooth for direct mobile control.",
            btn_connect_bluetooth: "Connect via Bluetooth (Mobile Controller)",
            btn_disconnect_bluetooth: "Disconnect",
            bluetooth_note: "*Requires HTTPS and a browser supporting the Web Bluetooth API (e.g., Chrome, Edge).",
            status_disconnected: "Status: Disconnected",
            status_connected: "Status: Connected",
            sec_video_title: "Video Tool 🎥 (Live Feed)",
            sec_video_desc: "Low-latency live stream from the robot's onboard camera. The video connection typically runs over Wi-Fi/WebRTC, separate from the Bluetooth control channel.",
            sec_control_title: "Control Tool 🎮 (Excavator Command Hub)",
            control_left_title: "Arm & Grapple (Left Controller)",
            control_right_title: "Base Movement (Right Controller)",
            control_grapple: "Grapple Control:",
            control_joint: "Joint Commands:",
            cmd_grab: "GRAB",
            cmd_release: "RELEASE",
            cmd_raise: "Raise",
            cmd_pull_in_1: "Pull In (1st)",
            cmd_pull_out_1: "Pull Out (1st)",
            cmd_pull_in_2: "Pull In (2nd)",
            cmd_pull_out_2: "Pull Out (2nd)",
            cmd_forward: "FORWARD",
            cmd_backward: "BACKWARD",
            cmd_rotate_left: "Rotate Left",
            cmd_rotate_right: "Rotate Right",
            cmd_360: "360° Base Rotation",
            control_emergency: "🔴 EMERGENCY STOP 🔴",
        },
        kh: {
            title: "មជ្ឈមណ្ឌលត្រួតពិនិត្យដៃរ៉ូបូត", 
            nav_video: "ឧបករណ៍វីដេអូ", 
            nav_control: "ឧបករណ៍បញ្ជា", 
            nav_connect: "ភ្ជាប់",
            hero_title: "ការត្រួតពិនិត្យមនុស្សយន្តច្បាស់លាស់", 
            hero_subtitle: "បញ្ជា និងមើលឃើញទិន្នន័យតាមពេលវេលាជាក់ស្តែងក្នុង 3D", 
            sec_connect_title: "កម្មវិធីគ្រប់គ្រងការតភ្ជាប់ 📡",
            sec_connect_desc: "បង្កើតការតភ្ជាប់ដែលមានសុវត្ថិភាពទៅកាន់ដៃរ៉ូបូតតាមរយៈ Web Bluetooth សម្រាប់ការគ្រប់គ្រងដោយផ្ទាល់។",
            btn_connect_bluetooth: "ភ្ជាប់តាមរយៈប៊្លូធូស (ឧបករណ៍បញ្ជាចល័ត)",
            btn_disconnect_bluetooth: "ផ្តាច់",
            bluetooth_note: "*ទាមទារ HTTPS និងកម្មវិធីរុករកដែលគាំទ្រ Web Bluetooth API (ដូចជា Chrome, Edge)។",
            status_disconnected: "ស្ថានភាព: ផ្តាច់",
            status_connected: "ស្ថានភាព: ភ្ជាប់",
            sec_video_title: "ឧបករណ៍វីដេអូ 🎥 (ផ្ទាល់)",
            sec_video_desc: "ស្ទ្រីមផ្ទាល់ដែលមានភាពយឺតយ៉ាវទាបពីកាមេរ៉ារ៉ូបូត។",
            sec_control_title: "ឧបករណ៍បញ្ជា 🎮 (មជ្ឈមណ្ឌលបញ្ជាអេស្កាវ៉ាទ័រ)",
            control_left_title: "ដៃ & ច្រវ៉ាក់ (ឧបករណ៍បញ្ជាឆ្វេង)",
            control_right_title: "ចលនាមូលដ្ឋាន (ឧបករណ៍បញ្ជាស្តាំ)",
            control_grapple: "ការគ្រប់គ្រងច្រវ៉ាក់:",
            control_joint: "ពាក្យបញ្ជាសន្លាក់:",
            cmd_grab: "ចាប់",cmd_release: "លែង",
            cmd_raise: "លើកឡើង",
            cmd_pull_in_1: "ទាញចូល (ទី១)",
            cmd_pull_out_1: "ទាញចេញ (ទី១)",
            cmd_pull_in_2: "ទាញចូល (ទី២)",
            cmd_pull_out_2: "ទាញចេញ (ទី២)",
            cmd_forward: "ទៅមុខ",
            cmd_backward: "ថយក្រោយ",
            cmd_rotate_left: "បង្វិលឆ្វេង",
            cmd_rotate_right: "បង្វិលស្តាំ",
            cmd_360: "បង្វិលមូលដ្ឋាន 360°",
            control_emergency: "🔴 បញ្ឈប់បន្ទាន់ 🔴",
        },
        zh: {
            title: "机械臂控制中心", 
            nav_video: "视频工具", 
            nav_control: "控制工具", 
            nav_connect: "连接",
            hero_title: "精密机器人控制", 
            hero_subtitle: "实时命令与 3D 可视化", 
            sec_connect_title: "连接管理器 📡",
            sec_connect_desc: "通过 Web Bluetooth 与机械臂建立安全连接，实现移动端直接控制。",
            btn_connect_bluetooth: "通过蓝牙连接 (移动控制器)",
            btn_disconnect_bluetooth: "断开连接",
            bluetooth_note: "*需要 HTTPS 和支持 Web Bluetooth API 的浏览器 (例如 Chrome, Edge)。",
            status_disconnected: "状态: 已断开",
            status_connected: "状态: 已连接",
            sec_video_title: "视频工具 🎥 (实时)",
            sec_video_desc: "来自机器人摄像头的低延迟实时流。视频连接通常独立于蓝牙控制通道。",
            sec_control_title: "控制工具 🎮 (挖掘机指令中心)",
            control_left_title: "机械臂和抓斗 (左控制器)",
            control_right_title: "底座移动 (右控制器)",
            control_grapple: "抓斗控制:",
            control_joint: "关节命令:",
            cmd_grab: "抓取",
            cmd_release: "释放",
            cmd_raise: "举升",
            cmd_pull_in_1: "收回 (第一节)",
            cmd_pull_out_1: "伸出 (第一节)",
            cmd_pull_in_2: "收回 (第二节)",
            cmd_pull_out_2: "伸出 (第二节)",
            cmd_forward: "前进",
            cmd_backward: "后退",
            cmd_rotate_left: "左旋转",
            cmd_rotate_right: "右旋转",
            cmd_360: "360° 底座旋转",
            control_emergency: "🔴 紧急停止 🔴",
        }
    };

    // --- 2. Dark/Light Mode Toggle ---
    const currentMode = localStorage.getItem('mode') || 'dark';
    body.className = currentMode + '-mode';
    modeToggle.textContent = currentMode === 'dark' ? '☀️' : '🌙';

    modeToggle.addEventListener('click', () => {
        const newMode = body.classList.contains('light-mode') ? 'dark' : 'light';
        body.className = newMode + '-mode';
        modeToggle.textContent = newMode === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('mode', newMode);
    });

    // --- 3. Localization Functionality ---
    const setLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-i18n]');
        const texts = translations[lang];
        if (!texts) return;

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) {
                if (key === 'title') {
                    document.title = texts[key];
                } 
                else if (el.tagName !== 'SELECT' && el.id !== 'connection-state') { 
                    el.textContent = texts[key];
                }
                else if (el.id === 'connection-state') {
                     // Update the status text based on current connection state
                     const isConnected = el.classList.contains('connected');
                     el.textContent = isConnected ? texts['status_connected'] : texts['status_disconnected'];
                }
            }
        });
        localStorage.setItem('lang', lang);
    };

    langSwitcher.value = localStorage.getItem('lang') || 'en';
    setLanguage(langSwitcher.value);

    langSwitcher.addEventListener('change', (event) => {
        setLanguage(event.target.value);
    });

    // --- 4. Web Bluetooth Connection Logic ---
    let bluetoothDevice = null;
    let controlCharacteristic = null; // GATT characteristic for sending commands// sendCommand(commandKey); // Uncomment in a functional setup
        });
        // You would typically need a 'mouseup' or 'touchend' event to send a 'STOP' command for continuous actions
        button.addEventListener('mouseup', () => {
            // sendCommand('CMD_STOP'); 
        });
        button.addEventListener('mouseleave', () => {
            // sendCommand('CMD_STOP');
        });
