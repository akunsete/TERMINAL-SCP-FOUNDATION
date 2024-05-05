const terminalScreen = document.getElementById('terminal-screen');
const userInput = document.getElementById('user-input');

// List of available commands
const commands = {
    help: "Available commands: <br> explore - Begin exploration of SCP facility <br> scp [number] - Access information about a specific SCP <br> personnel - Access personnel database <br> talkto05 - Initiate communication with O5 Council <br> hack05 - Attempt to hack O5 defense system <br> clear - Clear the screen <br> download - Download Some Dangerous FILE!!! <br> bios - Open Bios To change server A TO B",
    clear: clearScreen,
    explore: exploreFacility,
    scp: accessSCP,
    personnel: accessPersonnel,
    talkto05: talkToO5,
    hack05: hackO5,
    scpdata: accessSCPData,
    securitydata: accessSecurityData,
    shop: showShopInventory,
    bios: function() {
        terminalScreen.innerHTML += "Entering BIOS...<br>";
        setTimeout(() => {
            terminalScreen.innerHTML += "BIOS loaded successfully.<br>";
            // Simulate transferring to another server
            terminalScreen.innerHTML += "Transferring from Server A to Server B...<br>";
            animateResetProgress(0, 100);
        }, 2000);
    },
    selectsystem: function(system) {
        terminalScreen.innerHTML += `Selected system: ${system}<br>`;
        clearScreen();
        gameIntroduction();
    },
    download: function(input) {
        if (!input) {
            // Mengunduh file dari URL yang ditentukan jika tidak ada argumen tambahan
            const url = "https://www.mediafire.com/file/sizr2jhsh5btab3/Gui1.lua/file";
            downloadFromURL(url);
        } else {
            if (isValidURL(input)) {
                downloadFromURL(input);
            } else {
                terminalScreen.innerHTML += `Downloading file "${input}"...<br>`;
                // Add logic to handle file download here
            }
        }
    }
    
};

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function downloadFromURL(url) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    terminalScreen.innerHTML += `Download complete.<br>`;
}

// Function to animate reset progress from 0 to 100%
function animateResetProgress(start, end) {
    let current = start;
    const increment = 5; // Increment step
    const duration = 200; // Animation duration in milliseconds
    const timer = setInterval(() => {
        if (current >= end) {
            clearInterval(timer);
            terminalScreen.innerHTML += `Transfer complete. System reset.<br>`;
            // Prompt user to select a new system
            terminalScreen.innerHTML += "Please select a new system: <br>";
            // For demonstration, let's assume two options: System A and System B
            terminalScreen.innerHTML += "1. System A <br>";
            terminalScreen.innerHTML += "2. System B <br>";
            // Listen for user input to select a new system
            userInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    const inputText = userInput.value.trim().toLowerCase();
                    const system = inputText === '1' ? 'System A' : (inputText === '2' ? 'System B' : null);
                    if (system !== null) {
                        // Execute the selectsystem command with the selected system
                        commands.selectsystem(system);
                    } else {
                        terminalScreen.innerHTML += "Invalid selection. Please enter 1 or 2.<br>";
                    }
                    userInput.value = '';
                    terminalScreen.scrollTop = terminalScreen.scrollHeight;
                }
            });
        } else {
            current += increment;
            terminalScreen.innerHTML += `Transfer progress: ${current}%<br>`;
        }
    }, duration);
}


// Display initial message

// Event listener for user input
// Event listener for user input
userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const inputText = userInput.value.trim().toLowerCase();
        terminalScreen.innerHTML += `> ${inputText}<br>`;
        // Check if the input is a number
        if (!isNaN(inputText)) {
            // Check if the input is either '1' or '2'
            if (inputText === '1' || inputText === '2') {
                // Execute the selectsystem command with the selected system
                commands.selectsystem(inputText === '1' ? 'System A' : 'System B');
                userInput.value = '';
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
                return;
            }
        }
        if (inputText in commands) {
            executeCommand(inputText);
        } else {
            terminalScreen.innerHTML += `Command '${inputText}' not found. Type 'help' for available commands.<br>`;
        }
        userInput.value = '';
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
});


// Function for game introduction
function gameIntroduction() {
    terminalScreen.innerHTML += "SCP Roleplay Terminal<br>";
    terminalScreen.innerHTML += "Welcome to the SCP Foundation Terminal!<br>";
    terminalScreen.innerHTML += "You are an agent of the SCP Foundation, tasked with managing and containing anomalous entities and objects.<br>";
    terminalScreen.innerHTML += "Your mission is to maintain the secrecy and security of the SCP Foundation while containing and researching anomalous phenomena.<br>";
    terminalScreen.innerHTML += "Use commands to explore SCP facilities, access SCP data, communicate with personnel, and more.<br>";
    terminalScreen.innerHTML += "Type 'help' to see available commands.<br><br>";
}

// Call game introduction function when the page loads
gameIntroduction();

// Function to execute commands
// Function to execute commands
function executeCommand(command) {
    if (typeof commands[command] === 'function') {
        commands[command]();
    } else {
        terminalScreen.innerHTML += `${commands[command]}<br>`;
    }
    
    // Simulate random system attack
    const systemAttack = Math.random() < 0.2; // 20% chance of system attack
    if (systemAttack) {
        terminalScreen.innerHTML += "Warning: System under attack!<br>";
        defendSystem();
    }
}

// Function to defend system against attack
function defendSystem() {
    // Replace the code below with actual defense mechanism logic
    terminalScreen.innerHTML += "Initiating system defense protocols...<br>";
    setTimeout(() => {
        const success = Math.random() < 0.5; // 50% chance of success in defending
        if (success) {
            terminalScreen.innerHTML += "System defended against attack.<br>";
        } else {
            terminalScreen.innerHTML += "Defense failed. System compromised!<br>";
            fightBack();
        }
    }, 3000);
}

// Function to fight back against system attack
function fightBack() {
    // Replace the code below with actual counterattack logic
    terminalScreen.innerHTML += "Initiating counterattack...<br>";
    setTimeout(() => {
        const victory = Math.random() < 0.5; // 50% chance of victory in counterattack
        if (victory) {
            terminalScreen.innerHTML += "Counterattack successful. System secured.<br>";
        } else {
            terminalScreen.innerHTML += "Counterattack failed. System compromised!<br>";
        }
    }, 3000);
}


// Function to clear the screen
function clearScreen() {
    terminalScreen.innerHTML = '';
}

function exploreFacility() {
    const locations = ["Sector-██", "Containment Wing-█", "Research Lab-██", "Anomalous Object Storage-███", "SCP-███ Containment Chamber"];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    terminalScreen.innerHTML += `You are currently exploring ${randomLocation}.<br>`;
}

// Function to access information about a specific SCP
function accessSCP(scpNumber) {
    if (!scpNumber) {
        terminalScreen.innerHTML += "Please provide an SCP number.<br>";
        return;
    }
    // Replace the code below with actual SCP database access or information retrieval
    terminalScreen.innerHTML += `Accessing SCP-${scpNumber} information...<br>`;
}

// Function to access personnel database
function accessPersonnel() {
    // Replace the code below with actual personnel database access or information retrieval
    terminalScreen.innerHTML += "Accessing personnel database...<br>";
    terminalScreen.innerHTML += "Level 4 clearance required for full access.<br>";
}

function hackSystem() {
    const success = Math.random() < 0.5; // 50% chance of success
    if (success) {
        terminalScreen.innerHTML += "Hacking successful. Access granted.<br>";
        const threat = Math.random() < 0.3; // 30% chance of threat
        if (threat) {
            terminalScreen.innerHTML += "Warning: Security breach detected! Initiating countermeasures...<br>";
            initiateCountermeasures();
        } else {
            terminalScreen.innerHTML += "No security threats detected.<br>";
        }
    } else {
        terminalScreen.innerHTML += "Hacking failed. Access denied.<br>";
    }
}

// Function to initiate countermeasures against security breach
function initiateCountermeasures() {
    // Replace the code below with actual countermeasures logic
    terminalScreen.innerHTML += "Engaging automated defense systems...<br>";
    setTimeout(() => {
        terminalScreen.innerHTML += "Countermeasures successful. System secure.<br>";
    }, 3000);
}

function accessAllData() {
    terminalScreen.innerHTML += "Attempting to access all data...<br>";
    const encounter = Math.random() < 0.5; // 50% chance of encountering MTF
    if (encounter) {
        terminalScreen.innerHTML += "WARNING: Mobile Task Force encountered!<br>";
        fightMTF();
    } else {
        const success = Math.random() < 0.5; // 50% chance of success
        if (success) {
            terminalScreen.innerHTML += "Access successful. All data retrieved.<br>";
        } else {
            terminalScreen.innerHTML += "Access failed. Data retrieval incomplete.<br>";
        }
    }
}

function fightMTF() {
    // Replace the code below with actual fight logic
    const successRate = Math.floor(Math.random() * 100) + 1; // Random success rate between 1 and 100
    terminalScreen.innerHTML += `Engaging Mobile Task Force...<br>`;
    animateSuccessRate(0, successRate);
}

// Function to animate success rate increase
function animateSuccessRate(start, end) {
    let current = start;
    const increment = 1; // Increment step
    const duration = 30; // Animation duration in milliseconds
    const timer = setInterval(() => {
        if (current >= end) {
            clearInterval(timer);
            terminalScreen.innerHTML += `Fight complete. Success rate: ${end}%<br>`;
        } else {
            current += increment;
            terminalScreen.innerHTML = `Engaging Mobile Task Force...<br>Fight in progress: ${current}%`;
        }
    }, duration);
}

// Function to talk to O5 Council
function talkToO5() {
    terminalScreen.innerHTML += "Initiating communication with O5 Council...<br>";
    setTimeout(() => {
        terminalScreen.innerHTML += "O5: This is O5. Identify yourself.<br>";
        // Simulate player response
        setTimeout(() => {
            terminalScreen.innerHTML += "You: [Your message to O5]<br>";
            // Simulate O5 response
            setTimeout(() => {
                const topic = getTopic(); // Get a random topic to discuss
                terminalScreen.innerHTML += `O5: Regarding ${topic}, proceed.<br>`;
                // Simulate player response
                setTimeout(() => {
                    terminalScreen.innerHTML += `You: [Your discussion about ${topic}]<br>`;
                    // Simulate O5 response
                    setTimeout(() => {
                        terminalScreen.innerHTML += "O5: Understood. End of communication.<br>";
                        // After conversation, O5 attempts to hack our system
                        setTimeout(() => {
                            hackOurSystemByO5();
                        }, 3000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
    }, 3000);
}

// Function to hack our system by O5
function hackOurSystemByO5() {
    terminalScreen.innerHTML += "O5: Initiating hack on your system...<br>";
    const success = Math.random() < 0.96; // 96% chance of success
    setTimeout(() => {
        if (success) {
            terminalScreen.innerHTML += "O5: Hack successful. Your system has been compromised.<br>";
            // After O5 successfully hacks our system, O5 gains full control over the terminal
            setTimeout(() => {
                terminalScreen.innerHTML = "O5: Welcome, Agent. You are now under my control.<br>";
                terminalScreen.innerHTML += "O5: I have access to all your data and can perform any action.<br>";
                terminalScreen.innerHTML += "O5: Prepare for termination.<br>";
                // Show timer before server shutdown
                showTimer();
            }, 3000);
        } else {
            terminalScreen.innerHTML += "O5: Hack failed. Your system is secure.<br>";
        }
    }, 3000);
}

// Function to show timer before server shutdown
function showTimer() {
    terminalScreen.innerHTML += "O5: You have 60 seconds to take action before server shutdown.<br>";
    let timeLeft = 60;
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            terminalScreen.innerHTML += "O5: Server shutdown initiated.<br>";
            // Show BIOS prompt
            showBIOSPrompt();
        }
    }, 1000);
}

// Function to show BIOS prompt
function showBIOSPrompt() {
    terminalScreen.innerHTML += "To fight back, you need to access BIOS and shut down the infected server.<br>";
    terminalScreen.innerHTML += "Enter 'bios' to access BIOS.<br>";
}

// Function to get a random topic for discussion
function getTopic() {
    const topics = ["SCP containment procedures", "recent anomalous activity", "personnel assignments", "site security measures"];
    return topics[Math.floor(Math.random() * topics.length)];
}


// Function to attempt hacking O5 defense system
function hackO5() {
    terminalScreen.innerHTML += "Attempting to hack O5 defense system...<br>";
    const success = Math.random() < 0.05; // 5% chance of success
    setTimeout(() => {
        if (success) {
            terminalScreen.innerHTML += "Hacking successful. O5 defense system compromised.<br>";
        } else {
            terminalScreen.innerHTML += "Hacking failed. O5 defense system intact.<br>";
        }
    }, 3000);
}

// Function to execute commands
function executeCommand(command) {
    if (typeof commands[command] === 'function') {
        commands[command]();
    } else {
        terminalScreen.innerHTML += `${commands[command]}<br>`;
    }
    
    // Play typing sound
    playTypingSound();
    
    // Simulate random system attack
    const systemAttack = Math.random() < 0.2; // 20% chance of system attack
    if (systemAttack) {
        terminalScreen.innerHTML += "Warning: System under attack!<br>";
        defendSystem();
    }
}

// Function to play typing sound
function playTypingSound() {
    const typingSound = document.getElementById('typing-sound');
    typingSound.currentTime = 0;
    typingSound.play();
}

// SCP data
const scpData = [
    {
        number: "SCP-173",
        name: "The Sculpture",
        description: "SCP-173, also known as 'The Sculpture', is a Euclid-class object...",
        // Add more SCP data as needed
    },
    {
        number: "SCP-682",
        name: "The Hard-to-Destroy Reptile",
        description: "SCP-682, also known as 'The Hard-to-Destroy Reptile', is a Keter-class object...",
        // Add more SCP data as needed
    },
    // Add more SCP objects as needed
];

// Security data
const securityData = [
    {
        level: "Level 1",
        description: "Level 1 security personnel are responsible for basic site operations...",
    },
    {
        level: "Level 2",
        description: "Level 2 security personnel are responsible for patrolling and monitoring...",
    },
    // Add more security levels as needed
];

// Function to access SCP data
function accessSCPData() {
    terminalScreen.innerHTML += "Accessing SCP data...<br>";
    scpData.forEach(scp => {
        terminalScreen.innerHTML += `SCP-${scp.number}: ${scp.name}<br>Description: ${scp.description}<br><br>`;
    });
}

// Function to access security data
function accessSecurityData() {
    terminalScreen.innerHTML += "Accessing security data...<br>";
    securityData.forEach(security => {
        terminalScreen.innerHTML += `Security Level: ${security.level}<br>Description: ${security.description}<br><br>`;
    });
}

const shopInventory = [
    { name: "SCP-500", price: 100, description: "A pill that can cure any disease." },
    { name: "SCP-914", price: 200, description: "A machine that can refine items to improve their quality." },
    // Tambahkan item lain jika diperlukan
];

// Saldo pengguna
let userBalance = 500;

// Fungsi untuk menampilkan inventaris toko
function showShopInventory() {
    terminalScreen.innerHTML += "Welcome to the Foundation's Shop!<br>";
    terminalScreen.innerHTML += "Available items:<br>";
    shopInventory.forEach((item, index) => {
        terminalScreen.innerHTML += `${index + 1}. ${item.name} - Price: ${item.price} credits - ${item.description}<br>`;
    });
}

// Fungsi untuk membeli item dari toko
function buyFromShop(itemIndex) {
    const selectedItem = shopInventory[itemIndex - 1];
    if (selectedItem) {
        if (userBalance >= selectedItem.price) {
            userBalance -= selectedItem.price;
            terminalScreen.innerHTML += `You bought ${selectedItem.name}. Your balance: ${userBalance} credits.<br>`;
        } else {
            terminalScreen.innerHTML += "You don't have enough credits to buy this item.<br>";
        }
    } else {
        terminalScreen.innerHTML += "Invalid item index.<br>";
    }
}

const command = {
    // Other commands...
    shop: function() {
        showShopInventory();
        terminalScreen.innerHTML += "Enter the number of the item you want to buy: ";
        // Listen for user input to buy an item
        userInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                const itemIndex = parseInt(userInput.value);
                buyFromShop(itemIndex);
                userInput.removeEventListener("keypress", this);
                userInput.value = ""; // Clear input field
            }
        });
    }
};