// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VestingRegistry is Initializable, AccessControlUpgradeable, ReentrancyGuardUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct VestingSchedule {
        uint256 start;
        uint256 duration;
        uint256 totalAmount;
        uint256 claimed;
        address token;
        address beneficiary;
    }

    mapping(bytes32 => VestingSchedule) public schedules;

    event ScheduleCreated(bytes32 id);
    event Claimed(bytes32 id, uint256 amount);

    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __ReentrancyGuard_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
    }

    function createSchedule(
        bytes32 id,
        address token,
        address beneficiary,
        uint256 start,
        uint256 duration,
        uint256 totalAmount
    ) external onlyRole(ADMIN_ROLE) {
        require(schedules[id].beneficiary == address(0), "Schedule exists");
        schedules[id] = VestingSchedule(start, duration, totalAmount, 0, token, beneficiary);
        emit ScheduleCreated(id);
    }

    function claim(bytes32 id) external nonReentrant {
        VestingSchedule storage s = schedules[id];
        require(s.beneficiary == msg.sender, "Not beneficiary");
        uint256 vested = _vestedAmount(s);
        uint256 claimable = vested - s.claimed;
        require(claimable > 0, "Nothing to claim");
        s.claimed += claimable;
        IERC20Upgradeable(s.token).safeTransfer(s.beneficiary, claimable);
        emit Claimed(id, claimable);
    }

    function _vestedAmount(VestingSchedule memory s) internal view returns (uint256) {
        if (block.timestamp < s.start) {
            return 0;
        }
        if (block.timestamp >= s.start + s.duration) {
            return s.totalAmount;
        }
        return (s.totalAmount * (block.timestamp - s.start)) / s.duration;
    }
}
