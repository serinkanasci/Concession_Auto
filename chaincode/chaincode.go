import (
	"bytes"
	"encoding/json"
	"fmt"
	"time"
	"strconv"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	sc "github.com/hyperledger/fabric/protos/peer"
  )
  
  // Represents our smartcontract.
  type SmartContract struct {
  }
  
  type Person struct {
	Id string `json:"id"`
	Class string `json:"class"`
	Name string `json:"name"`
	Email string `json:"email"`
  }
  
  type Art struct {
	Id string `json:"id"`
	Class string `json:"class"`
	Name string `json:"name"`
	Description string `json:"description"`
	Artist string `json:"artist"`
	Owner string `json:"owner"`
	CreatedAt time.Time `json:"created_at"`
  }